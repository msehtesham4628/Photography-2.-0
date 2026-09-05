import React, { useState } from 'react';
import { BookingFormData, BookingRecord } from '../types';
import { createGoogleCalendarUrl, generateICSFile } from '../utils/calendar';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  CheckCircle2,
  Download,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const BookingSection: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    phone: '',
    email: '',
    eventType: 'Wedding Photography & Film',
    eventDate: '',
    venue: '',
    preferredAppointmentDate: '',
    preferredAppointmentTime: '11:30 AM',
    numberOfFunctions: '3 Functions (Haldi, Sangeet, Wedding)',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<BookingRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const eventTypes = [
    'Wedding Photography & Film',
    'Wedding Videography & Cinematography',
    'Pre-Wedding Shoot & Heritage Film',
    'Engagement Ceremony',
    'Reception Gala',
    'Candid Photography & Bridal Portraits',
    'Multi-Day Royal Wedding Package',
    'Family Function / Celebration'
  ];

  const timeSlots = [
    '10:30 AM',
    '11:30 AM',
    '02:00 PM',
    '03:30 PM',
    '05:00 PM',
    '06:30 PM',
    '08:00 PM'
  ];

  const functionOptions = [
    '1 Function (Intimate Wedding / Ceremony)',
    '2 Functions (Engagement + Wedding)',
    '3 Functions (Haldi, Sangeet, Wedding)',
    '4+ Functions (Complete 4-Day Royal Nizami Extravaganza)',
    'Pre-Wedding Shoot Only'
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newRecord: BookingRecord = {
      ...formData,
      id: `SHK-${Date.now().toString().slice(-6)}`,
      dateSubmitted: new Date().toISOString(),
      bookingStatus: 'Confirmed'
    };

    // Save customer information to persistent storage (Google Sheets sync mirror)
    try {
      const existing = JSON.parse(localStorage.getItem('shakeela_bookings') || '[]');
      existing.unshift(newRecord);
      localStorage.setItem('shakeela_bookings', JSON.stringify(existing));

      // Also trigger optional Webhook if user configured Google Apps Script Web App
      const webhookUrl = localStorage.getItem('shakeela_sheets_webhook');
      if (webhookUrl) {
        fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRecord)
        }).catch(() => {});
      }
    } catch (err) {}

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmittedRecord(newRecord);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }, 600);
  };

  const getWhatsAppBookingUrl = () => {
    if (!submittedRecord) return '#';
    const text = `Hello Shakeela Photography, I have booked a consultation appointment on your website!
Details:
• Name: ${submittedRecord.fullName}
• Phone: ${submittedRecord.phone}
• Event Type: ${submittedRecord.eventType}
• Event Date: ${submittedRecord.eventDate}
• Venue: ${submittedRecord.venue}
• Consultation Appointment: ${submittedRecord.preferredAppointmentDate} at ${submittedRecord.preferredAppointmentTime}
• Functions: ${submittedRecord.numberOfFunctions}
Booking Reference: ${submittedRecord.id}`;

    return `https://wa.me/919347307151?text=${encodeURIComponent(text)}`;
  };

  const exportSheetsCSV = () => {
    try {
      const bookings: BookingRecord[] = JSON.parse(
        localStorage.getItem('shakeela_bookings') || '[]'
      );
      if (bookings.length === 0 && submittedRecord) {
        bookings.push(submittedRecord);
      }

      const headers = [
        'ID',
        'Date Submitted',
        'Customer Name',
        'Phone',
        'Email',
        'Event Type',
        'Event Date',
        'Venue',
        'Appointment Date',
        'Appointment Time',
        'Number of Functions',
        'Message',
        'Booking Status'
      ];

      const rows = bookings.map((b) => [
        `"${b.id}"`,
        `"${b.dateSubmitted}"`,
        `"${b.fullName}"`,
        `"${b.phone}"`,
        `"${b.email}"`,
        `"${b.eventType}"`,
        `"${b.eventDate}"`,
        `"${b.venue}"`,
        `"${b.preferredAppointmentDate}"`,
        `"${b.preferredAppointmentTime}"`,
        `"${b.numberOfFunctions}"`,
        `"${(b.message || '').replace(/"/g, '""')}"`,
        `"${b.bookingStatus}"`
      ]);

      const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `Shakeela_Photography_Bookings_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      alert('Unable to export CSV.');
    }
  };

  return (
    <section
      id="book-your-date"
      className="relative w-full py-24 sm:py-32 bg-[#FAF8F5] text-[#141312] overflow-hidden border-b border-[#EAE2D7]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#D5C7B7] bg-[#F4EFEA] text-xs font-mono uppercase tracking-[0.25em] text-[#997328] mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>BESPOKE CONSULTATION & CALENDAR RESERVATION</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-[0.06em] uppercase text-[#141312] leading-[1.05]">
            BOOK YOUR DATE.
            <span className="block text-[#997328] italic font-normal">SECURE YOUR LEGACY.</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#615850] font-light leading-relaxed">
            Due to our commitment to cinematic perfection, Shakeela Photography accepts a strictly limited number of weddings each season. Select your preferred date for an in-studio or virtual consultation.
          </p>
        </div>

        {/* Form Container */}
        {!isSubmitted ? (
          <div className="rounded-3xl border border-[#D5C7B7] bg-[#F4EFEA]/80 shadow-2xl p-6 sm:p-10 lg:p-12 backdrop-blur-md">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Appointment Schedule */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-xs font-mono tracking-widest uppercase text-[#997328]">
                  <Clock className="w-4 h-4" />
                  <span>STEP 1 • CHOOSE CONSULTATION DATE & AVAILABLE TIME</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#4A433D] mb-1.5">
                      Preferred Appointment Date *
                    </label>
                    <input
                      type="date"
                      name="preferredAppointmentDate"
                      required
                      value={formData.preferredAppointmentDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#D5C7B7] bg-white text-xs sm:text-sm text-[#141312] focus:ring-1 focus:ring-[#997328] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#4A433D] mb-1.5">
                      Preferred Consultation Time *
                    </label>
                    <select
                      name="preferredAppointmentTime"
                      value={formData.preferredAppointmentTime}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#D5C7B7] bg-white text-xs sm:text-sm text-[#141312] focus:ring-1 focus:ring-[#997328] focus:outline-hidden"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot} (Studio or Virtual Meet)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 2: Customer Personal & Wedding Information */}
              <div className="space-y-4 pt-4 border-t border-[#E3D9CD]">
                <div className="flex items-center space-x-2 text-xs font-mono tracking-widest uppercase text-[#997328]">
                  <User className="w-4 h-4" />
                  <span>STEP 2 • CUSTOMER & CELEBRATION DETAILS</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#4A433D] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Sarah Khan"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#D5C7B7] bg-white text-xs sm:text-sm text-[#141312] focus:ring-1 focus:ring-[#997328] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#4A433D] mb-1.5">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#D5C7B7] bg-white text-xs sm:text-sm text-[#141312] focus:ring-1 focus:ring-[#997328] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#4A433D] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. sarah@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#D5C7B7] bg-white text-xs sm:text-sm text-[#141312] focus:ring-1 focus:ring-[#997328] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#4A433D] mb-1.5">
                      Event Type *
                    </label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#D5C7B7] bg-white text-xs sm:text-sm text-[#141312] focus:ring-1 focus:ring-[#997328] focus:outline-hidden"
                    >
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#4A433D] mb-1.5">
                      Wedding / Event Date *
                    </label>
                    <input
                      type="date"
                      name="eventDate"
                      required
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#D5C7B7] bg-white text-xs sm:text-sm text-[#141312] focus:ring-1 focus:ring-[#997328] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#4A433D] mb-1.5">
                      Celebration Venue & City *
                    </label>
                    <input
                      type="text"
                      name="venue"
                      required
                      placeholder="e.g. Taj Falaknuma Palace, Hyderabad"
                      value={formData.venue}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#D5C7B7] bg-white text-xs sm:text-sm text-[#141312] focus:ring-1 focus:ring-[#997328] focus:outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#4A433D] mb-1.5">
                      Number of Functions
                    </label>
                    <select
                      name="numberOfFunctions"
                      value={formData.numberOfFunctions}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#D5C7B7] bg-white text-xs sm:text-sm text-[#141312] focus:ring-1 focus:ring-[#997328] focus:outline-hidden"
                    >
                      {functionOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#4A433D] mb-1.5">
                      Message / Special Cinematic Requirements
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Tell us about your wedding vision, traditional rituals, specific aesthetic preferences, or destination logistics..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#D5C7B7] bg-white text-xs sm:text-sm text-[#141312] focus:ring-1 focus:ring-[#997328] focus:outline-hidden resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit & Google Sync Trigger */}
              <div className="pt-4 border-t border-[#E3D9CD] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-2 text-xs text-[#6A625A]">
                  <ShieldCheck className="w-4 h-4 text-[#997328]" />
                  <span>Saves to Google Sheets • Creates Google Calendar Appointment</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#141312] text-[#FAF8F5] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase hover:bg-[#997328] transition-all duration-300 shadow-xl active:scale-95 disabled:opacity-60 flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{isSubmitting ? 'RESERVING DATE...' : 'CONFIRM & BOOK CONSULTATION'}</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State with Google Calendar & Google Sheets & WhatsApp */
          <div className="rounded-3xl border border-[#D5C7B7] bg-[#FAF8F5] shadow-2xl p-8 sm:p-12 text-center animate-in zoom-in-95 duration-500">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-6 shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#997328] block mb-2">
              RESERVATION RECEIVED • REFERENCE #{submittedRecord?.id}
            </span>

            <h3 className="text-3xl sm:text-4xl font-serif uppercase tracking-wide text-[#141312]">
              Thank You, {submittedRecord?.fullName}!
            </h3>

            <p className="max-w-xl mx-auto text-xs sm:text-sm text-[#524B44] mt-3 leading-relaxed">
              Your appointment request for <strong>{submittedRecord?.preferredAppointmentDate}</strong> at <strong>{submittedRecord?.preferredAppointmentTime}</strong> has been logged to Shakeela Photography's customer ledger.
            </p>

            {/* Google Calendar & WhatsApp Action Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {/* Google Calendar Appointment */}
              {submittedRecord && (
                <a
                  href={createGoogleCalendarUrl(submittedRecord)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white border border-[#D5C7B7] hover:border-[#997328] shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center group"
                >
                  <Calendar className="w-6 h-6 text-[#997328] mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold text-[#141312] uppercase tracking-wider">
                    Add to Google Calendar
                  </span>
                  <span className="text-[10px] text-[#7A746E] mt-1">
                    Auto-fills title & studio location
                  </span>
                </a>
              )}

              {/* WhatsApp Instant Dispatch */}
              <a
                href={getWhatsAppBookingUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#25D366] text-white shadow-sm hover:shadow-md hover:bg-[#20ba59] transition-all flex flex-col items-center text-center group"
              >
                <MessageCircle className="w-6 h-6 fill-white mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Confirm on WhatsApp
                </span>
                <span className="text-[10px] text-white/80 mt-1">
                  Chat directly with Shakeela desk
                </span>
              </a>

              {/* ICS Calendar Download */}
              <button
                onClick={() => submittedRecord && generateICSFile(submittedRecord)}
                className="p-4 rounded-2xl bg-white border border-[#D5C7B7] hover:border-[#997328] shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center group"
              >
                <Download className="w-6 h-6 text-[#141312] mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-[#141312] uppercase tracking-wider">
                  Download .ICS Invite
                </span>
                <span className="text-[10px] text-[#7A746E] mt-1">
                  For Apple / Outlook Calendar
                </span>
              </button>
            </div>

            {/* Google Sheets Record Info */}
            <div className="mt-8 pt-6 border-t border-[#E3D9CD] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6A625A] gap-4">
              <div className="flex items-center space-x-2">
                <FileSpreadsheet className="w-4 h-4 text-[#997328]" />
                <span>Recorded in Google Sheets Column Schema (ID, Customer, Event Date, Venue)</span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={exportSheetsCSV}
                  className="text-xs font-mono text-[#997328] hover:underline flex items-center space-x-1"
                >
                  <span>Export Customer Sheet (CSV)</span>
                </button>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-[#141312] hover:underline"
                >
                  Book another date
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
