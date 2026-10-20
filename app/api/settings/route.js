import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Setting } from '@/models';
import { getLocalSettings, saveLocalSettings } from '@/lib/settingsStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let settings = getLocalSettings();

    try {
      await dbConnect();
      const dbRecord = await Setting.findOne({ key: 'site_settings' });
      if (dbRecord && dbRecord.value) {
        settings = {
          ...settings,
          ...dbRecord.value,
        };
        saveLocalSettings(settings);
      }
    } catch (dbErr) {
      console.warn('DB connect error while fetching site settings, using disk fallback:', dbErr.message);
    }

    return NextResponse.json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return NextResponse.json({
      success: true,
      settings: getLocalSettings(),
    });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const current = getLocalSettings();

    const updated = {
      ...current,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    // Save to disk JSON store
    saveLocalSettings(updated);

    // Also persist to DB if available
    try {
      await dbConnect();
      await Setting.findOneAndUpdate(
        { key: 'site_settings' },
        {
          $set: {
            key: 'site_settings',
            value: updated,
            type: 'json',
            description: 'Global site settings and configurations',
          },
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      // Also sync whatsapp_settings key for compatibility
      await Setting.findOneAndUpdate(
        { key: 'whatsapp_settings' },
        {
          $set: {
            key: 'whatsapp_settings',
            value: {
              whatsappNumber: updated.whatsappNumber,
              whatsappMessage: updated.whatsappMessage,
              isEnabled: updated.isEnabled,
              tooltipText: updated.tooltipText,
              position: updated.position,
              contactPhone: updated.contactPhone,
              contactEmail: updated.contactEmail,
              contactAddress: updated.contactAddress,
              workingHours: updated.workingHours,
            },
            type: 'json',
            description: 'Public WhatsApp and contact configuration',
          },
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    } catch (dbErr) {
      console.warn('DB error while updating site settings (persisted to disk store):', dbErr.message);
    }

    return NextResponse.json({
      success: true,
      message: 'সেটিংস সফলভাবে সংরক্ষিত হয়েছে (Settings saved successfully)',
      settings: updated,
    });
  } catch (error) {
    console.error('Error saving site settings:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'সেটিংস সংরক্ষণে সমস্যা হয়েছে: ' + error.message,
      },
      { status: 500 }
    );
  }
}
