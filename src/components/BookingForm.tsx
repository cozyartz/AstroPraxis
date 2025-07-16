import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format, addDays, isWeekend, startOfDay } from 'date-fns';
import Calendar from 'react-calendar';
import SquarePayment from './SquarePayment';
import 'react-calendar/dist/Calendar.css';

const bookingSchema = z.object({
  serviceType: z.string().min(1, 'Please select a service type'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  company: z.string().optional(),
  message: z.string().min(10, 'Please provide more details about your needs'),
  date: z.date(),
  time: z.string().min(1, 'Please select a time'),
  duration: z.string().min(1, 'Please select a duration'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const serviceTypes = [
  { value: 'strategy', label: 'Strategy Consultation', price: 200 },
  { value: 'equity', label: 'Equity & Access Review', price: 250 },
  { value: 'tech', label: 'Technology Planning', price: 300 },
  { value: 'ai', label: 'AI Implementation', price: 350 },
  { value: 'drone', label: 'Drone Services Planning', price: 150 },
  { value: 'general', label: 'General Consultation', price: 175 },
];

const timeSlots = [
  '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'
];

const durations = [
  { value: '30', label: '30 minutes', multiplier: 1 },
  { value: '60', label: '1 hour', multiplier: 2 },
  { value: '90', label: '1.5 hours', multiplier: 3 },
  { value: '120', label: '2 hours', multiplier: 4 },
];

interface BookingState {
  step: number;
  formData: BookingFormData | null;
  paymentResult: any | null;
  bookingId: string | null;
  isProcessing: boolean;
  error: string | null;
}

export default function BookingForm() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [booking, setBooking] = useState<BookingState>({
    step: 1,
    formData: null,
    paymentResult: null,
    bookingId: null,
    isProcessing: false,
    error: null
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: selectedDate,
    },
  });

  const watchedServiceType = watch('serviceType');
  const watchedDuration = watch('duration');

  const getPrice = () => {
    const service = serviceTypes.find(s => s.value === watchedServiceType);
    const duration = durations.find(d => d.value === watchedDuration);
    if (service && duration) {
      return service.price * duration.multiplier;
    }
    return 0;
  };

  const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const today = startOfDay(new Date());
      const maxDate = addDays(today, 60);
      return date < today || date > maxDate || isWeekend(date);
    }
    return false;
  };

  const handleFormSubmit = (data: BookingFormData) => {
    setBooking(prev => ({ ...prev, formData: data, step: 4 }));
  };

  const handlePaymentSuccess = async (paymentResult: any) => {
    setBooking(prev => ({ ...prev, isProcessing: true, error: null }));

    try {
      // Send booking confirmation
      const bookingData = {
        ...booking.formData!,
        amount: getPrice(),
        paymentId: paymentResult.paymentId,
        date: format(booking.formData!.date, 'yyyy-MM-dd'),
      };

      const confirmationResponse = await fetch('/api/send-booking-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (confirmationResponse.ok) {
        const confirmation = await confirmationResponse.json();
        setBooking(prev => ({
          ...prev,
          paymentResult,
          bookingId: confirmation.bookingId,
          step: 5,
          isProcessing: false
        }));
      } else {
        throw new Error('Failed to send booking confirmation');
      }
    } catch (error) {
      console.error('Booking confirmation error:', error);
      setBooking(prev => ({
        ...prev,
        error: 'Payment successful, but confirmation failed. We will contact you shortly.',
        step: 5,
        isProcessing: false
      }));
    }
  };

  const handlePaymentFailure = (error: any) => {
    setBooking(prev => ({
      ...prev,
      error: error.message || 'Payment failed. Please try again.',
      isProcessing: false
    }));
  };

  const nextStep = () => {
    if (booking.step < 3) {
      setBooking(prev => ({ ...prev, step: prev.step + 1 }));
    }
  };

  const prevStep = () => {
    if (booking.step > 1) {
      setBooking(prev => ({ ...prev, step: prev.step - 1 }));
    }
  };

  const resetForm = () => {
    setBooking({
      step: 1,
      formData: null,
      paymentResult: null,
      bookingId: null,
      isProcessing: false,
      error: null
    });
    setSelectedDate(new Date());
  };

  if (booking.step === 5) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="card-modern p-12">
          {booking.error ? (
            <>
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-yellow-800 mb-4">Payment Processed</h2>
              <p className="text-yellow-700 mb-6">{booking.error}</p>
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold gradient-text mb-4">Booking Confirmed! 🎉</h2>
              <p className="text-neutral-600 mb-6">
                Thank you for booking with AstroPraxis Consulting. Your consultation has been confirmed and payment has been processed successfully.
              </p>
              
              {booking.bookingId && (
                <div className="glass-light rounded-xl p-4 mb-6">
                  <p className="text-sm text-neutral-600">
                    <strong>Booking ID:</strong> {booking.bookingId}
                  </p>
                </div>
              )}

              <div className="text-neutral-600 mb-8">
                <p className="mb-2">📧 A confirmation email has been sent to your inbox</p>
                <p className="mb-2">📅 We'll send you a calendar invitation shortly</p>
                <p>💬 Feel free to prepare any materials or questions for our session</p>
              </div>
            </>
          )}

          <button
            onClick={resetForm}
            className="btn-primary"
          >
            Book Another Consultation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-semibold text-neutral-700">
            Step {booking.step} of 4
          </div>
          <div className="text-sm text-neutral-500 font-medium">
            {booking.step === 1 && 'Service & Schedule'}
            {booking.step === 2 && 'Your Information'}
            {booking.step === 3 && 'Review Details'}
            {booking.step === 4 && 'Secure Payment'}
          </div>
        </div>
        <div className="booking-progress-bar">
          <div 
            className="booking-progress-fill"
            style={{ width: `${(booking.step / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {booking.error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-800">{booking.error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
        {/* Step 1: Service & Schedule */}
        {booking.step === 1 && (
          <div className="card-modern p-8 space-y-8">
            <h2 className="text-2xl font-bold gradient-text mb-6">Choose Your Service</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-base font-semibold text-neutral-700 mb-3">
                  Service Type
                </label>
                <select
                  {...register('serviceType')}
                  className="w-full px-4 py-4 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                >
                  <option value="">Select a service...</option>
                  {serviceTypes.map((service) => (
                    <option key={service.value} value={service.value}>
                      {service.label} - ${service.price}
                    </option>
                  ))}
                </select>
                {errors.serviceType && (
                  <p className="mt-2 text-sm text-red-600">{errors.serviceType.message}</p>
                )}
              </div>

              <div>
                <label className="block text-base font-semibold text-neutral-700 mb-3">
                  Duration
                </label>
                <select
                  {...register('duration')}
                  className="w-full px-4 py-4 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                >
                  <option value="">Select duration...</option>
                  {durations.map((duration) => (
                    <option key={duration.value} value={duration.value}>
                      {duration.label}
                    </option>
                  ))}
                </select>
                {errors.duration && (
                  <p className="mt-2 text-sm text-red-600">{errors.duration.message}</p>
                )}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <label className="block text-base font-semibold text-neutral-700 mb-3">
                  Select Date
                </label>
                <Calendar
                  onChange={(value) => {
                    const date = value as Date;
                    setSelectedDate(date);
                    setValue('date', date);
                  }}
                  value={selectedDate}
                  tileDisabled={tileDisabled}
                  className="w-full border-2 border-neutral-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-base font-semibold text-neutral-700 mb-3">
                  Select Time
                </label>
                <div className="time-slot-grid">
                  {timeSlots.map((time) => (
                    <label key={time} className="cursor-pointer">
                      <input
                        type="radio"
                        value={time}
                        {...register('time')}
                        className="sr-only peer"
                      />
                      <div className="time-slot-option peer-checked:selected">
                        {time}
                      </div>
                    </label>
                  ))}
                </div>
                {errors.time && (
                  <p className="mt-2 text-sm text-red-600">{errors.time.message}</p>
                )}
              </div>
            </div>

            {watchedServiceType && watchedDuration && (
              <div className="glass-light rounded-2xl p-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-neutral-700">Total Cost:</span>
                  <span className="text-3xl font-bold gradient-text">${getPrice()}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Contact Information */}
        {booking.step === 2 && (
          <div className="card-modern p-8 space-y-8">
            <h2 className="text-2xl font-bold gradient-text mb-6">Your Information</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-base font-semibold text-neutral-700 mb-3">
                  Full Name *
                </label>
                <input
                  type="text"
                  {...register('name')}
                  className="w-full px-4 py-4 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-base font-semibold text-neutral-700 mb-3">
                  Email Address *
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full px-4 py-4 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-base font-semibold text-neutral-700 mb-3">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  {...register('phone')}
                  className="w-full px-4 py-4 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="(555) 123-4567"
                />
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-base font-semibold text-neutral-700 mb-3">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  {...register('company')}
                  className="w-full px-4 py-4 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Your company name"
                />
              </div>
            </div>

            <div>
              <label className="block text-base font-semibold text-neutral-700 mb-3">
                Tell us about your needs *
              </label>
              <textarea
                {...register('message')}
                rows={4}
                className="w-full px-4 py-4 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                placeholder="Describe your project, challenges, or goals..."
              />
              {errors.message && (
                <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Review & Summary */}
        {booking.step === 3 && (
          <div className="card-modern p-8">
            <h2 className="text-2xl font-bold gradient-text mb-6">Review Your Booking</h2>
            
            <div className="booking-summary">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Booking Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Service:</span>
                  <span className="font-semibold">
                    {serviceTypes.find(s => s.value === watchedServiceType)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Duration:</span>
                  <span className="font-semibold">
                    {durations.find(d => d.value === watchedDuration)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Date:</span>
                  <span className="font-semibold">{format(selectedDate, 'PPP')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Time:</span>
                  <span className="font-semibold">{watch('time')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Name:</span>
                  <span className="font-semibold">{watch('name')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Email:</span>
                  <span className="font-semibold">{watch('email')}</span>
                </div>
                <div className="border-t-2 border-primary-200 pt-4 flex justify-between">
                  <span className="booking-total">Total:</span>
                  <span className="booking-total">${getPrice()}</span>
                </div>
              </div>
            </div>

            <div className="glass-light rounded-xl p-4 mt-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-neutral-700">
                  Click "Proceed to Payment" to complete your booking. Payment will be processed securely through Square.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Payment */}
        {booking.step === 4 && booking.formData && (
          <div>
            <h2 className="text-2xl font-bold gradient-text mb-6 text-center">Secure Payment</h2>
            <SquarePayment
              amount={getPrice()}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentFailure={handlePaymentFailure}
            />
          </div>
        )}

        {/* Navigation Buttons */}
        {booking.step < 4 && (
          <div className="flex justify-between pt-8">
            <button
              type="button"
              onClick={prevStep}
              disabled={booking.step === 1}
              className={`btn-ghost ${
                booking.step === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            {booking.step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary"
              >
                Next Step
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button
                type="submit"
                disabled={booking.isProcessing}
                className={`btn-accent ${
                  booking.isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {booking.isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Proceed to Payment
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {booking.step === 4 && (
          <div className="text-center pt-8">
            <button
              type="button"
              onClick={() => setBooking(prev => ({ ...prev, step: 3 }))}
              className="btn-ghost"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Review
            </button>
          </div>
        )}
      </form>
    </div>
  );
}