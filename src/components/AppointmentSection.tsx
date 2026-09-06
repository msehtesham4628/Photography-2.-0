import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  MessageCircle,
  ShieldCheck,
  Heart,
  Send
} from 'lucide-react';
import {
  OFFICIAL_PHONE,
  OFFICIAL_PHONE_RAW,
  OFFICIAL_ADDRESS
} from '../data/instagramData';

const appointmentVideoH264 = '/assets/appointment-reel-h264.mp4';
const appointmentVideoOriginal = '/assets/appointment-reel.mp4';
const appointmentPoster = '/assets/appointment-reel-poster.jpg';

export interface AppointmentRecord {
  id: string;
  clientName: string;
  phone: string;
  email: string;
  eventDate: string;
  eventTime: string;
  eventType: string;
  venue: string;
  notes: string;
  createdAt: string;
  status: 'Confirmed' | 'Pending Review';
}

const STORAGE_KEY = 'shakeela_photography_appointments_v1';

export const AppointmentSection: React.FC = () => {
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('11:00');
  const [eventType, setEventType] = useState('Royal Nizami Nikah');
  const [venue, setVenue] = useState('Hyderabad, Telangana');
  const [notes, setNotes] = useState('');

  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [submittedBooking, setSubmittedBooking] = useState<AppointmentRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play background video with IntersectionObserver
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const playVideo = () => {
      video.play().catch(() => {});
    };

    playVideo();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playVideo();
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // Load existing appointments from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setAppointments(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const saveAppointments = (newRecords: AppointmentRecord[]) => {
    setAppointments(newRecords);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecords));
    } catch {
      // ignore
    }
  };

  const constructWhatsAppUrl = (record: AppointmentRecord) => {
    const rawNumber = OFFICIAL_PHONE_RAW || '9347307151';
    const cleanNumber = rawNumber.replace(/\D/g, '');
    const fullIntlNumber = cleanNumber.startsWith('91') ? cleanNumber : `91${cleanNumber}`;

    const message = `✨ *Wedding Consultation Request* ✨
-------------------------------------
👑 *Studio:* Syeda Shakila Qazi Photography
🏷️ *Booking ID:* ${record.id}
👤 *Client Name:* ${record.clientName}
📱 *Client Phone:* ${record.phone}
${record.email && record.email !== 'Not Provided' ? `📧 *Email:* ${record.email}\n` : ''}💍 *Ceremony Type:* ${record.eventType}
📅 *Event Date:* ${record.eventDate}
⏰ *Preferred Slot:* ${record.eventTime}
📍 *City / Venue:* ${record.venue}
${record.notes ? `📝 *Special Notes:* ${record.notes}\n` : ''}-------------------------------------
Assalamu Alaikum Syeda Shakila Qazi, I would love to confirm our consultation slot and discuss coverage packages for our wedding celebration!`;

    return `https://wa.me/${fullIntlNumber}?text=${encodeURIComponent(message)}`;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !phone.trim() || !eventDate) return;

    setIsSubmitting(true);

    const newRecord: AppointmentRecord = {
      id: `SQ-${Date.now().toString().slice(-6)}`,
      clientName: clientName.trim(),
      phone: phone.trim(),
      email: email.trim() || 'Not Provided',
      eventDate,
      eventTime,
      eventType,
      venue: venue.trim() || 'Hyderabad',
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
      status: 'Confirmed'
    };

    const updated = [newRecord, ...appointments];
    saveAppointments(updated);
    setSubmittedBooking(newRecord);
    setIsSubmitting(false);

    // Direct WhatsApp redirect with populated inquiry details
    const wpUrl = constructWhatsAppUrl(newRecord);
    window.open(wpUrl, '_blank');
  };

  return (
    <section
      id="appointment"
      className="relative w-full min-h-screen bg-[#070605] text-white flex flex-col justify-center overflow-hidden border-t border-white/10"
    >
      {/* 1. VISIBLE FULL-BLEED BACKGROUND VIDEO */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={appointmentPoster}
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.88] saturate-[1.05]"
        >
          <source src={appointmentVideoH264} type="video/mp4" />
          <source src={appointmentVideoOriginal} type="video/mp4" />
        </video>

        {/* Translucent cinematic overlay - Keeps background video motion vivid and clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070605] via-[#070605]/35 to-[#070605]/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/60" />
      </div>

      {/* 2. FOREGROUND CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-10 lg:px-16 py-24 sm:py-32 flex flex-col justify-center min-h-screen">
        {/* Top Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-[#C5A059]/40 text-[#E6B85C] text-xs font-mono uppercase tracking-[0.2em] backdrop-blur-md shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>BOOK APPOINTMENT · NIZAMI WEDDING CONSULTATION</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-[#25D366]/40 text-white text-xs font-mono backdrop-blur-md shadow-sm">
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span className="text-[#25D366] font-semibold">Instant WhatsApp Reservation</span>
          </div>
        </div>

        {/* Main Grid: Left Narrative + Right Booking Form Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Heading & Value Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#C5A059] block">
              SYEDA SHAKILA QAZI · HYDERABAD
            </span>

            <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[0.95] uppercase tracking-[-0.03em] text-white">
              Reserve Your <br />
              <i className="font-normal italic text-[#C5A059]">Wedding Date.</i>
            </h2>

            <p className="text-base sm:text-lg text-white/85 font-sans leading-relaxed">
              Book a bespoke consultation with Syeda Shakila Qazi for your royal Nikah, grand reception, or candid destination wedding. Submitting this form redirects immediately to WhatsApp to confirm your date with the studio.
            </p>

            {/* Direct WhatsApp Quick-Connect Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-black/60 backdrop-blur-md border border-[#25D366]/30 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 border border-[#25D366]/50 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-white tracking-wide uppercase">
                    DIRECT STUDIO WHATSAPP
                  </h4>
                  <p className="text-xs text-white/70 font-mono pt-0.5">
                    +{OFFICIAL_PHONE_RAW ? `91 ${OFFICIAL_PHONE_RAW}` : '91 9347307151'}
                  </p>
                </div>
              </div>

              <p className="text-xs text-white/75 font-sans leading-relaxed">
                Fill your wedding details and click submit — your consultation inquiry will automatically open in WhatsApp ready to send with full booking details.
              </p>
            </div>

            {/* Bespoke Photography Assurances */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 space-y-1.5">
                <div className="flex items-center gap-2 text-[#E6B85C] text-xs font-mono font-semibold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                  <span>EXCLUSIVE DATES</span>
                </div>
                <p className="text-xs text-white/70 font-sans">
                  We accept a strictly limited number of weddings per season for undivided artisan focus.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 space-y-1.5">
                <div className="flex items-center gap-2 text-[#E6B85C] text-xs font-mono font-semibold uppercase tracking-wider">
                  <Heart className="w-4 h-4 text-[#C5A059]" />
                  <span>BESPOKE DIRECTION</span>
                </div>
                <p className="text-xs text-white/70 font-sans">
                  Pre-wedding styling consultations, Nizami heritage lighting, and royal heirloom albums.
                </p>
              </div>
            </div>

            {/* Quick Phone Consultation Note */}
            <div className="pt-2 flex items-center gap-3 text-xs font-mono text-white/70">
              <Phone className="w-4 h-4 text-[#C5A059]" />
              <span>
                Direct Studio Booking: <strong className="text-white">{OFFICIAL_PHONE}</strong>
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-black/65 backdrop-blur-xl border border-white/20 p-6 sm:p-8 lg:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
              {submittedBooking ? (
                /* Post-Submission Confirmation with Direct WhatsApp Re-link */
                <div className="space-y-6 text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-[#25D366]/20 border border-[#25D366]/50 flex items-center justify-center mx-auto text-[#25D366]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#C5A059]">
                      INQUIRY READY · {submittedBooking.id}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium">
                      Thank You, {submittedBooking.clientName}!
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 font-sans max-w-md mx-auto">
                      Your consultation details for <strong>{submittedBooking.eventType}</strong> on{' '}
                      <strong>
                        {submittedBooking.eventDate} at {submittedBooking.eventTime}
                      </strong>{' '}
                      are ready. If WhatsApp didn't open automatically, click the button below:
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="text-left p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-white/80 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/50">Booking ID:</span>
                      <span className="text-[#C5A059] font-bold">{submittedBooking.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Ceremony:</span>
                      <span>{submittedBooking.eventType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Date &amp; Time:</span>
                      <span>
                        {submittedBooking.eventDate} ({submittedBooking.eventTime})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Venue:</span>
                      <span className="truncate max-w-[180px]">{submittedBooking.venue}</span>
                    </div>
                  </div>

                  {/* Direct Contact Buttons */}
                  <div className="space-y-3 pt-2">
                    <a
                      href={constructWhatsAppUrl(submittedBooking)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0A2614] font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-lg hover:scale-[1.01]"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>OPEN IN WHATSAPP NOW</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={`tel:${OFFICIAL_PHONE.replace(/\s+/g, '')}`}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs uppercase tracking-wider font-medium transition-all"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>CALL STUDIO ({OFFICIAL_PHONE})</span>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSubmittedBooking(null)}
                    className="text-xs font-mono text-white/50 hover:text-white transition-colors underline pt-2 cursor-pointer"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                /* The Booking Form */
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">
                        Schedule Consultation
                      </h3>
                      <p className="text-xs text-white/60 font-sans pt-0.5">
                        Direct booking via WhatsApp message redirect
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-[10px] font-mono">
                      <MessageCircle className="w-3 h-3" />
                      <span>WP Direct</span>
                    </span>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-white/70 flex items-center gap-1.5">
                        <User className="w-3 h-3 text-[#C5A059]" />
                        <span>Your Name *</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mirza & Fatima"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#C5A059] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-white/70 flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-[#C5A059]" />
                        <span>WhatsApp / Phone *</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#C5A059] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email & Event Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-white/70 flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-[#C5A059]" />
                        <span>Email Address</span>
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#C5A059] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-white/70 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-[#C5A059]" />
                        <span>Ceremony Type</span>
                      </label>
                      <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141210] border border-white/20 text-white text-sm focus:outline-none focus:border-[#C5A059] transition-colors"
                      >
                        <option value="Royal Nizami Nikah">Royal Nizami Nikah</option>
                        <option value="Reception & Grand Dinner">Reception &amp; Grand Dinner</option>
                        <option value="Candid Pre-Wedding Shoot">Candid Pre-Wedding Shoot</option>
                        <option value="Sangeet & Haldi Celebration">Sangeet &amp; Haldi Celebration</option>
                        <option value="Destination Royal Wedding">Destination Royal Wedding</option>
                      </select>
                    </div>
                  </div>

                  {/* Date & Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-white/70 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-[#C5A059]" />
                        <span>Event / Meeting Date *</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141210] border border-white/20 text-white text-sm focus:outline-none focus:border-[#C5A059] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-white/70 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#C5A059]" />
                        <span>Preferred Time Slot</span>
                      </label>
                      <select
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141210] border border-white/20 text-white text-sm focus:outline-none focus:border-[#C5A059] transition-colors"
                      >
                        <option value="10:00">10:00 AM (Morning Session)</option>
                        <option value="12:00">12:00 PM (Mid-Day)</option>
                        <option value="15:00">03:00 PM (Afternoon)</option>
                        <option value="18:30">06:30 PM (Evening Nikah Slot)</option>
                        <option value="20:00">08:00 PM (Night Reception Slot)</option>
                      </select>
                    </div>
                  </div>

                  {/* Venue & Notes */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-white/70 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-[#C5A059]" />
                      <span>City or Venue</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Chowmahalla Palace, Taj Falaknuma, Hyderabad"
                      value={venue}
                      onChange={(e) => setVenue(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#C5A059] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-white/70">
                      Special Requirements / Notes
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Tell us about your wedding vision, candid shoot requirements, or video coverage needs..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#C5A059] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button with Instant WhatsApp Redirect */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#25D366] via-[#20bd5a] to-[#128C7E] hover:brightness-110 text-[#070605] font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-xl hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>SUBMIT &amp; OPEN IN WHATSAPP</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>

                  <p className="text-center text-[11px] font-mono text-white/50 pt-1">
                    Direct instant booking with Syeda Shakila Qazi on WhatsApp (+91 9347307151)
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
