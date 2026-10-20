import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Setting } from '@/models';
import { DEFAULT_WHATSAPP_SETTINGS } from '@/lib/whatsapp';
import { getLocalSettings, saveLocalSettings } from '@/lib/settingsStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const local = getLocalSettings();
    let settings = {
      whatsappNumber: local.whatsappNumber || DEFAULT_WHATSAPP_SETTINGS.whatsappNumber,
      whatsappMessage: local.whatsappMessage || DEFAULT_WHATSAPP_SETTINGS.whatsappMessage,
      isEnabled: local.isEnabled !== undefined ? local.isEnabled : true,
      tooltipText: local.tooltipText || DEFAULT_WHATSAPP_SETTINGS.tooltipText,
      position: local.position || 'bottom-right',
      contactPhone: local.contactPhone || '+880 1700 000000',
      contactEmail: local.contactEmail || 'support@awbin.com',
      contactAddress: local.contactAddress || 'ঢাকা, বাংলাদেশ',
      workingHours: local.workingHours || '10:00 AM - 8:00 PM',
    };

    try {
      await dbConnect();
      const dbRecord = await Setting.findOne({ key: 'whatsapp_settings' });
      if (dbRecord && dbRecord.value) {
        settings = {
          ...settings,
          ...dbRecord.value,
        };
        // Keep disk store in sync with DB
        saveLocalSettings(settings);
      }
    } catch (dbErr) {
      console.warn('DB connect error while fetching whatsapp settings, using disk fallback:', dbErr.message);
    }

    return NextResponse.json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error('Error fetching WhatsApp settings:', error);
    const local = getLocalSettings();
    return NextResponse.json(
      {
        success: true,
        settings: {
          whatsappNumber: local.whatsappNumber || DEFAULT_WHATSAPP_SETTINGS.whatsappNumber,
          whatsappMessage: local.whatsappMessage || DEFAULT_WHATSAPP_SETTINGS.whatsappMessage,
          isEnabled: local.isEnabled !== undefined ? local.isEnabled : true,
          tooltipText: local.tooltipText || DEFAULT_WHATSAPP_SETTINGS.tooltipText,
          position: local.position || 'bottom-right',
          contactPhone: local.contactPhone || '+880 1700 000000',
          contactEmail: local.contactEmail || 'support@awbin.com',
          contactAddress: local.contactAddress || 'ঢাকা, বাংলাদেশ',
          workingHours: local.workingHours || '10:00 AM - 8:00 PM',
        },
      },
      { status: 200 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const currentLocal = getLocalSettings();

    const newSettings = {
      ...currentLocal,
      whatsappNumber: body.whatsappNumber !== undefined ? String(body.whatsappNumber).trim() : currentLocal.whatsappNumber,
      whatsappMessage: body.whatsappMessage !== undefined ? String(body.whatsappMessage).trim() : currentLocal.whatsappMessage,
      isEnabled: body.isEnabled !== undefined ? Boolean(body.isEnabled) : (currentLocal.isEnabled !== undefined ? currentLocal.isEnabled : true),
      tooltipText: body.tooltipText !== undefined ? String(body.tooltipText).trim() : (currentLocal.tooltipText || 'WhatsApp এ চ্যাট করুন'),
      position: body.position || currentLocal.position || 'bottom-right',
      contactPhone: body.contactPhone !== undefined ? String(body.contactPhone).trim() : currentLocal.contactPhone,
      contactEmail: body.contactEmail !== undefined ? String(body.contactEmail).trim() : currentLocal.contactEmail,
      contactAddress: body.contactAddress !== undefined ? String(body.contactAddress).trim() : currentLocal.contactAddress,
      workingHours: body.workingHours !== undefined ? String(body.workingHours).trim() : currentLocal.workingHours,
      updatedAt: new Date().toISOString(),
    };

    // Always persist to local disk JSON file so it NEVER resets on server reload
    saveLocalSettings(newSettings);

    // Also attempt persisting to MongoDB if connected
    try {
      await dbConnect();
      await Setting.findOneAndUpdate(
        { key: 'whatsapp_settings' },
        {
          $set: {
            key: 'whatsapp_settings',
            value: {
              whatsappNumber: newSettings.whatsappNumber,
              whatsappMessage: newSettings.whatsappMessage,
              isEnabled: newSettings.isEnabled,
              tooltipText: newSettings.tooltipText,
              position: newSettings.position,
              contactPhone: newSettings.contactPhone,
              contactEmail: newSettings.contactEmail,
              contactAddress: newSettings.contactAddress,
              workingHours: newSettings.workingHours,
              updatedAt: newSettings.updatedAt,
            },
            type: 'json',
            description: 'Public WhatsApp and contact configuration',
          },
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    } catch (dbErr) {
      console.warn('DB error while updating whatsapp settings (persisted to disk store):', dbErr.message);
    }

    return NextResponse.json({
      success: true,
      message: 'হোয়াটসঅ্যাপ ও কন্টাক্ট সেটিংস সফলভাবে সংরক্ষিত হয়েছে (Settings saved successfully)',
      settings: newSettings,
    });
  } catch (error) {
    console.error('Error saving WhatsApp settings:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'সেটিংস সংরক্ষণে সমস্যা হয়েছে: ' + error.message,
      },
      { status: 500 }
    );
  }
}
