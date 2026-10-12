import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { User } from '@/models/index.js';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await dbConnect();
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@stellarmartbd.com' });
    const hashedPassword = await bcrypt.hash('yeasin@2008', 10);
    
    if (existingAdmin) {
      existingAdmin.password = hashedPassword;
      existingAdmin.name = 'yeasin';
      await existingAdmin.save();
      return NextResponse.json(
        { 
          message: '✅ Admin credentials updated! Login: yeasin or admin@stellarmartbd.com / pass: yeasin@2008', 
          email: existingAdmin.email 
        },
        { status: 200 }
      );
    }
    
    // Create admin user
    const adminUser = await User.create({
      name: 'yeasin',
      email: 'admin@stellarmartbd.com',
      password: hashedPassword,
      phone: '+8801234567890',
      role: 'admin',
      status: 'active',
      emailVerified: true,
    });
    
    return NextResponse.json(
      { 
        message: '✅ Admin created! Login: yeasin or admin@stellarmartbd.com / pass: yeasin@2008',
        email: adminUser.email
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Seeding failed: ' + error.message },
      { status: 500 }
    );
  }
}
