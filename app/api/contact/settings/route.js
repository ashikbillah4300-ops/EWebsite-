import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Setting } from '@/models';
import { DEFAULT_WHATSAPP_SETTINGS } from '@/lib/whatsapp';

export const dynamic = 'force-dynamic';

// Server-side memory fallback in case DB is temporarily unreachable
let fallbackMemorySettings = { ...DEFAULT_WHATSAPP_SETTINGS };

export async function GET() {
  try {
    let settings = { ...DEFAULT_WHATSAPP_SETTINGS, ...fallbackMemorySettings };

    try {
      await dbConnect();
      const dbRecord = await Setting.findOne({ key: 'whatsapp_settings' });
      if (dbRecord && dbRecord.value) {
        settings = {
          ...DEFAULT_WHATSAPP_SETTINGS,
          ...dbRecord.value,
        };
        fallbackMemorySettings = { ...settings };
      }
    } catch (dbErr) {
      console.warn('DB connect error while fetching whatsapp settings, using fallback:', dbErr.message);
    }

    return NextResponse.json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error('Error fetching WhatsApp settings:', error);
    return NextResponse.json(
      {
        success: true,
        settings: fallbackMemorySettings,
      },
      { status: 200 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const newSettings = {
      whatsappNumber: body.whatsappNumber !== undefined ? String(body.whatsappNumber).trim() : fallbackMemorySettings.whatsappNumber,
      whatsappMessage: body.whatsappMessage !== undefined ? String(body.whatsappMessage).trim() : fallbackMemorySettings.whatsappMessage,
      isEnabled: body.isEnabled !== undefined ? Boolean(body.isEnabled) : true,
      tooltipText: body.tooltipText !== undefined ? String(body.tooltipText).trim() : 'WhatsApp এ চ্যাট করুন',
      position: body.position || 'bottom-right',
      updatedAt: new Date().toISOString(),
    };

    // Update memory fallback
    fallbackMemorySettings = { ...newSettings };

    // Try persisting to MongoDB
    try {
      await dbConnect();
      await Setting.findOneAndUpdate(
        { key: 'whatsapp_settings' },
        {
          $set: {
            key: 'whatsapp_settings',
            value: newSettings,
            type: 'json',
            description: 'Public WhatsApp floating button configuration',
          },
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    } catch (dbErr) {
      console.warn('DB error while updating whatsapp settings (saved to memory):', dbErr.message);
    }

    return NextResponse.json({
      success: true,
      message: 'হোয়াটসঅ্যাপ সেটিংস সফলভাবে সংরক্ষিত হয়েছে (WhatsApp settings saved successfully)',
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
