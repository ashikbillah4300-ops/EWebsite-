import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Hardcoded admin credentials
const ADMIN_CREDENTIALS = {
  username: 'yeasin',
  password: 'yeasin@2008'
};

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    
    const cleanUsername = (username || '').trim();
    const cleanPassword = (password || '').trim();
    
    // Check credentials (accepts 'yeasin', 'admin@stellarmartbd.com')
    const isUsernameMatch = 
      cleanUsername.toLowerCase() === ADMIN_CREDENTIALS.username.toLowerCase() ||
      cleanUsername.toLowerCase() === 'admin@stellarmartbd.com';
      
    const isPasswordMatch = cleanPassword === ADMIN_CREDENTIALS.password;
    
    if (isUsernameMatch && isPasswordMatch) {
      // Generate JWT token
      const token = jwt.sign(
        { id: 'admin', username: cleanUsername, role: 'admin' },
        process.env.JWT_SECRET || 'stellarmartbd_secret_key_2024',
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
      );
      
      const response = NextResponse.json(
        { 
          message: 'Admin login successful', 
          user: {
            id: 'admin',
            username: username,
            role: 'admin',
          },
          token 
        },
        { status: 200 }
      );
      
      // Set cookie with proper settings for production
      const isProduction = process.env.NODE_ENV === 'production';
      response.cookies.set('adminToken', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
        sameSite: 'lax',
        secure: isProduction,
      });
      
      return response;
    }
    
    return NextResponse.json(
      { error: 'Invalid username or password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Admin login failed' },
      { status: 500 }
    );
  }
}
