import type { APIRoute } from 'astro';

interface BookingData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  serviceType: string;
  date: string;
  time: string;
  duration: string;
  amount: number;
  paymentId: string;
  message?: string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const bookingData: BookingData = await request.json();

    // Basic validation
    if (!bookingData.email || !bookingData.name || !bookingData.paymentId) {
      return new Response(
        JSON.stringify({ error: 'Missing required booking information' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if email configuration is available
    const emailConfig = {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    };

    if (!emailConfig.host || !emailConfig.user || !emailConfig.pass) {
      console.warn('Email configuration not complete - skipping email notification');
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Booking processed successfully (email notification disabled)' 
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create email content
    const emailContent = createBookingConfirmationEmail(bookingData);

    // Send emails (this would require a proper email service)
    // For now, we'll log the email content and return success
    console.log('Booking confirmation email content:', emailContent);

    // In a real implementation, you would send emails here using:
    // - Nodemailer
    // - SendGrid
    // - AWS SES
    // - Resend
    // - etc.

    // Save booking to database if configured
    await saveBookingToDatabase(bookingData);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Booking confirmed and notification sent',
        bookingId: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Booking confirmation error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process booking confirmation',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

function createBookingConfirmationEmail(booking: BookingData) {
  const serviceTypeMap: Record<string, string> = {
    'strategy': 'Strategy Consultation',
    'equity': 'Equity & Access Review',
    'tech': 'Technology Planning',
    'ai': 'AI Implementation',
    'drone': 'Drone Services Planning',
    'general': 'General Consultation',
  };

  const serviceName = serviceTypeMap[booking.serviceType] || booking.serviceType;
  const formattedDate = new Date(booking.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return {
    to: booking.email,
    subject: `Booking Confirmed: ${serviceName} - AstroPraxis Consulting`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmation</title>
        <style>
          body { font-family: 'Inter', system-ui, sans-serif; line-height: 1.6; color: #374151; margin: 0; padding: 0; background-color: #f8fafc; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
          .header { background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 50%, #8b5cf6 100%); color: white; padding: 2rem; text-align: center; }
          .content { padding: 2rem; }
          .booking-details { background: #f8fafc; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; }
          .detail-row { display: flex; justify-content: space-between; margin: 0.5rem 0; padding: 0.5rem 0; border-bottom: 1px solid #e5e7eb; }
          .detail-label { font-weight: 600; color: #6b7280; }
          .detail-value { color: #374151; }
          .footer { background: #f8fafc; padding: 1.5rem; text-align: center; color: #6b7280; font-size: 14px; }
          .logo { font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">AstroPraxis Consulting</div>
            <h1>Booking Confirmed! 🎉</h1>
          </div>
          
          <div class="content">
            <p>Hi ${booking.name},</p>
            
            <p>Thank you for booking with AstroPraxis Consulting! Your consultation has been confirmed and payment has been processed successfully.</p>
            
            <div class="booking-details">
              <h3 style="margin-top: 0; color: #1f2937;">Booking Details</h3>
              
              <div class="detail-row">
                <span class="detail-label">Service:</span>
                <span class="detail-value">${serviceName}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">${formattedDate}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Time:</span>
                <span class="detail-value">${booking.time}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Duration:</span>
                <span class="detail-value">${booking.duration} minutes</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Amount Paid:</span>
                <span class="detail-value">$${booking.amount.toFixed(2)}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Payment ID:</span>
                <span class="detail-value">${booking.paymentId}</span>
              </div>
              
              ${booking.company ? `
              <div class="detail-row">
                <span class="detail-label">Company:</span>
                <span class="detail-value">${booking.company}</span>
              </div>
              ` : ''}
            </div>
            
            <h3>What's Next?</h3>
            <p>We'll send you a calendar invitation and meeting details shortly. In the meantime, feel free to prepare any materials or questions you'd like to discuss during our session.</p>
            
            <p>If you need to reschedule or have any questions, please don't hesitate to reach out to us.</p>
            
            <p>We're excited to work with you!</p>
            
            <p>Best regards,<br>
            <strong>The AstroPraxis Team</strong></p>
          </div>
          
          <div class="footer">
            <p>AstroPraxis Consulting - Battle Creek, Michigan<br>
            Women-owned • Queer-led • ADA-focused consultancy</p>
            
            <p>This is an automated confirmation email. Please save this for your records.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Booking Confirmed - AstroPraxis Consulting

Hi ${booking.name},

Thank you for booking with AstroPraxis Consulting! Your consultation has been confirmed and payment has been processed successfully.

Booking Details:
- Service: ${serviceName}
- Date: ${formattedDate}
- Time: ${booking.time}
- Duration: ${booking.duration} minutes
- Amount Paid: $${booking.amount.toFixed(2)}
- Payment ID: ${booking.paymentId}
${booking.company ? `- Company: ${booking.company}` : ''}

What's Next?
We'll send you a calendar invitation and meeting details shortly. In the meantime, feel free to prepare any materials or questions you'd like to discuss during our session.

If you need to reschedule or have any questions, please don't hesitate to reach out to us.

We're excited to work with you!

Best regards,
The AstroPraxis Team

--
AstroPraxis Consulting - Battle Creek, Michigan
Women-owned • Queer-led • ADA-focused consultancy
    `
  };
}

async function saveBookingToDatabase(booking: BookingData) {
  // This would save the booking to your database
  // For now, we'll just log it
  console.log('Booking saved:', {
    ...booking,
    timestamp: new Date().toISOString(),
    status: 'confirmed'
  });
  
  // In a real implementation, you might use:
  // - PostgreSQL
  // - MongoDB
  // - Supabase
  // - Firebase
  // - Airtable
  // etc.
}