export const welcomeEmailHTML = (name) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Welcome to Thawbin!</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #2B1B16 0%, #3A251E 100%); color: #F7F1E8; padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0; }
    .content { background: #FAF6F0; padding: 40px 20px; border-radius: 0 0 12px 12px; }
    .button { background: #B89558; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
    h1 { margin: 0 0 10px 0; font-size: 28px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Welcome, ${name}!</h1>
    <p>Thanks for joining Thawbin</p>
  </div>
  <div class="content">
    <h2>Let's get started!</h2>
    <p>We're excited to have you on board. Your account is ready to use.</p>
    <ul style="padding-left: 20px;">
      <li>Browse authentic Islamic products</li>
      <li>Add items to your cart</li>
      <li>Checkout securely</li>
      <li>Track your orders</li>
    </ul>
    <div style="text-align: center; margin: 30px 0;">
      <a href="/" class="button">Shop Now</a>
    </div>
    <p>If you need help, our support team is here to assist you.</p>
  </div>
  <div class="footer">
    <p>Thawbin - Bangladesh's Islamic Lifestyle Store</p>
    <p><a href="/contact">Contact Us</a> | <a href="/privacy">Privacy</a></p>
  </div>
</body>
</html>
`;

export const otpEmailHTML = (name, otp) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your OTP Code - Thawbin</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #2B1B16 0%, #3A251E 100%); color: #F7F1E8; padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0; }
    .content { background: #FAF6F0; padding: 40px 20px; border-radius: 0 0 12px 12px; text-align: center; }
    .otp-box { background: white; border: 2px solid #B89558; border-radius: 12px; font-size: 36px; font-weight: bold; color: #2B1B16; letter-spacing: 10px; margin: 30px auto; padding: 20px 40px; width: 300px; font-family: monospace; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
    h1 { margin: 0 0 10px 0; font-size: 28px; }
    .expires { color: #ef4444; font-weight: 600; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Password Reset Request</h1>
    <p>Thawbin Account Security</p>
  </div>
  <div class="content">
    <p>Hello ${name},</p>
    <p>Use the OTP below to reset your password:</p>
    <div class="otp-box">${otp}</div>
    <p class="expires">⚠️ Valid for 10 minutes only</p>
    <p>If you didn't request this, please ignore this email.</p>
  </div>
  <div class="footer">
    <p>Thawbin Team</p>
  </div>
</body>
</html>
`;

export const resetSuccessHTML = (name) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Password Reset Successful - Thawbin</title>
</head>
<body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #2B1B16; color: #F7F1E8; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
    <h2>Password Updated!</h2>
  </div>
  <div style="background: #FAF6F0; padding: 30px; border-radius: 0 0 12px 12px;">
    <p>Hello ${name},</p>
    <p>Your password for Thawbin has been reset successfully.</p>
    <p style="margin-top: 25px;"><a href="/login" style="background: #B89558; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Log In Now</a></p>
  </div>
</body>
</html>
`;
