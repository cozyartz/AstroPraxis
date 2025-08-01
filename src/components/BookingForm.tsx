import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format, addDays, isWeekend, startOfDay } from 'date-fns';
import Calendar from 'react-calendar';
import { CheckCircle, Calendar as CalendarIcon, Clock, User, Mail, Building, MessageSquare } from 'lucide-react';
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
  { value: 'strategy', label: 'Systems Strategy', description: 'Organizational systems design and optimization' },
  { value: 'equity', label: 'Equity Consulting', description: 'Inclusive practices and accessibility audits' },
  { value: 'tech', label: 'AI Development', description: 'Custom AI solutions and implementation' },
  { value: 'design', label: 'Instructional Design', description: 'Learning systems and curriculum development' },
  { value: 'drone', label: 'Aerial Intelligence', description: 'Drone services and spatial analysis' },
  { value: 'general', label: 'General Consultation', description: 'Exploratory conversation about your needs' },
];

const timeSlots = [
  '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'
];

const durations = [
  { value: '30', label: '30 minutes' },
  { value: '60', label: '1 hour' },
  { value: '90', label: '1.5 hours' },
  { value: '120', label: '2 hours' },
];

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema)
  });

  const watchedValues = watch();

  const isDateAvailable = (date: Date) => {
    const today = startOfDay(new Date());
    const checkDate = startOfDay(date);
    return checkDate >= today && !isWeekend(date);
  };

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      // Send booking request to your backend/email service
      const response = await fetch('/api/send-booking-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          date: format(data.date, 'yyyy-MM-dd'),
          submittedAt: new Date().toISOString()
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Failed to submit booking');
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      alert('There was an error submitting your booking. Please try again or contact us directly.');
    }
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto text-center p-8"
      >
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Submitted!</h2>
          <p className="text-lg text-gray-600 mb-6">
            Thank you for your consultation request. We'll be in touch within 24 hours to confirm your appointment.
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
            <ul className="text-left text-gray-600 space-y-2">
              <li>• We'll review your request and send you a confirmation email</li>
              <li>• You'll receive a calendar invite with meeting details</li>
              <li>• We'll prepare a customized agenda based on your needs</li>
            </ul>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNum}
              </div>
              {stepNum < 3 && (
                <div className={`w-16 h-1 mx-2 ${step > stepNum ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <span className="text-sm text-gray-600">
            Step {step} of 3: {step === 1 ? 'Service Details' : step === 2 ? 'Schedule' : 'Contact Info'}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">What can we help you with?</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {serviceTypes.map((service) => (
                    <label
                      key={service.value}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-blue-300 ${
                        watchedValues.serviceType === service.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        value={service.value}
                        {...register('serviceType')}
                        className="sr-only"
                      />
                      <div className="font-semibold text-gray-900">{service.label}</div>
                      <div className="text-sm text-gray-600 mt-1">{service.description}</div>
                    </label>
                  ))}
                </div>
                {errors.serviceType && (
                  <p className="text-red-600 text-sm mt-2">{errors.serviceType.message}</p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!watchedValues.serviceType}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Next: Schedule
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">When would you like to meet?</h3>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <CalendarIcon className="w-4 h-4 inline mr-2" />
                    Select Date
                  </label>
                  <Calendar
                    onChange={(date) => {
                      setSelectedDate(date as Date);
                      setValue('date', date as Date);
                    }}
                    value={selectedDate}
                    tileDisabled={({ date }) => !isDateAvailable(date)}
                    className="w-full"
                  />
                  {errors.date && (
                    <p className="text-red-600 text-sm mt-2">{errors.date.message}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Preferred Time
                    </label>
                    <select
                      {...register('time')}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select a time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                    {errors.time && (
                      <p className="text-red-600 text-sm mt-1">{errors.time.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <select
                      {...register('duration')}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select duration</option>
                      {durations.map((duration) => (
                        <option key={duration.value} value={duration.value}>
                          {duration.label}
                        </option>
                      ))}
                    </select>
                    {errors.duration && (
                      <p className="text-red-600 text-sm mt-1">{errors.duration.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!watchedValues.date || !watchedValues.time || !watchedValues.duration}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Next: Contact Info
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Tell us about yourself</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building className="w-4 h-4 inline mr-2" />
                    Organization (Optional)
                  </label>
                  <input
                    type="text"
                    {...register('company')}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your organization"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  Tell us more about your needs *
                </label>
                <textarea
                  {...register('message')}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="What challenges are you facing? What outcomes are you hoping for?"
                />
                {errors.message && (
                  <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Consultation Request'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}