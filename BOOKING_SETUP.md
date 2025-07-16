# Booking System Setup Guide

## Overview
The booking system has been successfully integrated with Square API for payment processing. Here's how to complete the setup:

## 🔧 Configuration

### 1. Environment Variables
Copy `.env.example` to `.env` and configure the following:

```bash
# Required Square API Configuration
SQUARE_ACCESS_TOKEN=your_square_access_token_here
SQUARE_APPLICATION_ID=your_square_application_id_here
SQUARE_ENVIRONMENT=sandbox  # Change to 'production' for live

# Optional Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### 2. Square API Setup
1. Create a Square Developer Account at https://developer.squareup.com/
2. Create a new application
3. Get your Application ID and Access Token
4. Update the application ID in `src/components/SquarePayment.tsx` (line 23)

### 3. Deployment Configuration
Since the booking system uses server-side API routes, you'll need to deploy using a Node.js-compatible platform:

**For Cloudflare Pages:**
- The current configuration may need adjustment for Cloudflare Workers
- Consider using Cloudflare Workers for API routes or switching to Vercel/Netlify

**For Vercel/Netlify:**
- Deploy as-is - the Node.js adapter will work out of the box

## 🎨 Features Implemented

### ✅ Core Features
- **Multi-step booking form** with progress indicator
- **Calendar integration** with disabled weekends and past dates
- **Service selection** with dynamic pricing
- **Contact information** collection with validation
- **Payment processing** via Square API
- **Responsive design** with mobile optimization
- **Accessibility features** (ARIA labels, keyboard navigation)

### ✅ UI Components
- **BookingForm.tsx** - Main booking interface
- **SquarePayment.tsx** - Payment processing component
- **book-consultation.astro** - Booking page layout
- **Custom CSS styling** for calendar and form elements

### ✅ Integration
- **Navigation updated** to include booking page
- **API endpoint** for payment processing
- **Environment variables** configuration
- **Build configuration** optimized for server-side rendering

## 🚀 Next Steps

To complete the booking system, consider implementing:

1. **Email notifications** for booking confirmations
2. **Admin dashboard** for managing bookings
3. **Calendar sync** with Google Calendar or similar
4. **Booking confirmations** and receipts
5. **Customer management** system
6. **Analytics tracking** for booking conversion

## 📱 How to Use

1. Navigate to `/book-consultation`
2. Select service type and duration
3. Choose date and time
4. Fill in contact information
5. Review booking details
6. Complete payment with Square

## 🔐 Security Notes

- All payments are processed securely through Square
- Customer data is handled according to PCI compliance standards
- Environment variables keep sensitive API keys secure
- Form validation prevents invalid submissions

## 📞 Support

For Square API issues, refer to:
- Square Developer Documentation: https://developer.squareup.com/docs
- Square API Explorer: https://developer.squareup.com/explorer

The booking system is now ready for production use once you configure your Square API credentials!