import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar as CalendarIcon,
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
  FileSpreadsheet,
  AlertCircle,
  ExternalLink,
  LogOut,
  Loader2
} from 'lucide-react';
import {
  OFFICIAL_PHONE,
  OFFICIAL_ADDRESS
} from '../data/instagramData';
import {
  initAuth,
  googleSignIn,
  logout as googleLogout,
  getAccessToken
} from '../services/googleAuth';
import {
  appendAppointmentToSheet,
  DEFAULT_SHEET_URL,
  DEFAULT_SPREADSHEET_ID
} from '../services/googleSheets';
import {
  createCalendarEvent,
  listUpcomingCalendarEvents,
  type UpcomingEvent
} from '../services/googleCalendar';
import type { User as FirebaseUser } from 'firebase/auth';

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
  syncedToSheets?: boolean;
  calendarEventId?: string;
  calendarEventLink?: string;
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

  // Google Workspace Auth & Sync State
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [hasGoogleAuth, setHasGoogleAuth] = useState(false);
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  
  // Sheets status
  const [sheetSyncStatus, setSheetSyncStatus] = useState<
    'idle' | 'saving' | 'synced' | 'failed' | 'needs_auth'
  >('idle');
  
  // Calendar status
  const [calendarSyncStatus, setCalendarSyncStatus] = useState<
    'idle' | 'saving' | 'synced' | 'failed' | 'needs_auth'
  >('idle');
  const [calendarEventLink, setCalendarEventLink] = useState<string | null>(null);
  
  const [syncErrorMessage, setSyncErrorMessage] = useState<string | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Setup Firebase Google Auth state listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setHasGoogleAuth(Boolean(token));
        // Refresh upcoming events
        listUpcomingCalendarEvents().then((items) => {
          if (items && items.length > 0) setUpcomingEvents(items.slice(0, 3));
        });
      },
      () => {
        setCurrentUser(null);
        setHasGoogleAuth(false);
        setUpcomingEvents([]);
      }
    );
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

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

  const handleConnectGoogle = async () => {
    try {
      setIsAuthorizing(true);
      setSyncErrorMessage(null);
      const res = await googleSignIn();
      if (res) {
        setCurrentUser(res.user);
        setHasGoogleAuth(true);
        const events = await listUpcomingCalendarEvents();
        if (events && events.length > 0) setUpcomingEvents(events.slice(0, 3));
      }
    } catch (err: any) {
      console.error('Google Sign in failed:', err);
      setSyncErrorMessage(err?.message || 'Google authorization could not be completed.');
    } finally {
      setIsAuthorizing(false);
    }
  };

  const handleDisconnectGoogle = async () => {
    await googleLogout();
    setCurrentUser(null);
    setHasGoogleAuth(false);
    setUpcomingEvents([]);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !phone.trim() || !eventDate) return;

    setIsSubmitting(true);
    setSheetSyncStatus('saving');
    setCalendarSyncStatus('saving');
    setSyncErrorMessage(null);
    setCalendarEventLink(null);

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
      status: 'Confirmed',
      syncedToSheets: false
    };

    const token = getAccessToken();
    if (token) {
      // 1. Google Sheets sync
      const sheetResult = await appendAppointmentToSheet(newRecord, DEFAULT_SPREADSHEET_ID);
      if (sheetResult.success) {
        newRecord.syncedToSheets = true;
        setSheetSyncStatus('synced');
      } else {
        setSheetSyncStatus('failed');
      }

      // 2. Google Calendar sync
      const calResult = await createCalendarEvent(newRecord);
      if (calResult.success) {
        newRecord.calendarEventId = calResult.eventId;
        newRecord.calendarEventLink = calResult.htmlLink;
        setCalendarEventLink(calResult.htmlLink || null);
        setCalendarSyncStatus('synced');
        // Refresh list
        listUpcomingCalendarEvents().then((items) => {
          if (items && items.length > 0) setUpcomingEvents(items.slice(0, 3));
        });
      } else {
        setCalendarSyncStatus('failed');
      }
    } else {
      setSheetSyncStatus('needs_auth');
      setCalendarSyncStatus('needs_auth');
    }

    const updated = [newRecord, ...appointments];
    saveAppointments(updated);
    setSubmittedBooking(newRecord);
    setIsSubmitting(false);
  };

  const syncPendingBookingToWorkspace = async () => {
    if (!submittedBooking) return;
    setSheetSyncStatus('saving');
    setCalendarSyncStatus('saving');
    setSyncErrorMessage(null);

    if (!getAccessToken()) {
      try {
        setIsAuthorizing(true);
        const res = await googleSignIn();
        if (res) {
          setCurrentUser(res.user);
          setHasGoogleAuth(true);
        }
      } catch (err: any) {
        setIsAuthorizing(false);
        setSheetSyncStatus('failed');
        setCalendarSyncStatus('failed');
        setSyncErrorMessage(err?.message || 'Sign in cancelled.');
        return;
      } finally {
        setIsAuthorizing(false);
      }
    }

    // 1. Append to Sheet
    const sheetRes = await appendAppointmentToSheet(submittedBooking, DEFAULT_SPREADSHEET_ID);
    if (sheetRes.success) {
      setSheetSyncStatus('synced');
    } else {
      setSheetSyncStatus('failed');
    }

    // 2. Add to Calendar
    const calRes = await createCalendarEvent(submittedBooking);
    let calLink = submittedBooking.calendarEventLink;
    if (calRes.success) {
      setCalendarSyncStatus('synced');
      calLink = calRes.htmlLink;
      setCalendarEventLink(calRes.htmlLink || null);
      listUpcomingCalendarEvents().then((items) => {
        if (items && items.length > 0) setUpcomingEvents(items.slice(0, 3));
      });
    } else {
      setCalendarSyncStatus('failed');
    }

    const updated = appointments.map((appt) =>
      appt.id === submittedBooking.id
        ? {
            ...appt,
            syncedToSheets: sheetRes.success ? true : appt.syncedToSheets,
            calendarEventId: calRes.eventId || appt.calendarEventId,
            calendarEventLink: calLink || appt.calendarEventLink
          }
        : appt
    );
    saveAppointments(updated);
    setSubmittedBooking({
      ...submittedBooking,
      syncedToSheets: sheetRes.success ? true : submittedBooking.syncedToSheets,
      calendarEventId: calRes.eventId || submittedBooking.calendarEventId,
      calendarEventLink: calLink || submittedBooking.calendarEventLink
    });
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
        {/* Top Header Tag & Google Workspace Live Sync Badges */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-[#C5A059]/40 text-[#E6B85C] text-xs font-mono uppercase tracking-[0.2em] backdrop-blur-md shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>BOOK APPOINTMENT · NIZAMI WEDDING CONSULTATION</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Google Calendar & Sheets Sync Badges */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-[#4285F4]/40 text-white text-xs font-mono backdrop-blur-md shadow-sm">
              <CalendarIcon className="w-3.5 h-3.5 text-[#4285F4]" />
              <span className="text-[#8ab4f8] font-semibold">Google Calendar</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-[#107c41]/50 text-white text-xs font-mono backdrop-blur-md shadow-sm">
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#34A853]" />
              <span className="text-[#34A853] font-semibold">Google Sheets</span>
              <a
                href={DEFAULT_SHEET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors ml-0.5 p-0.5"
                title="Open Studio Spreadsheet in new tab"
              >
                <ExternalLink className="w-3 h-3 text-[#C5A059]" />
              </a>
            </div>

            <div className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-white/20 text-white/80 text-xs font-mono tracking-wider backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>HYDERABAD &amp; DESTINATIONS</span>
            </div>
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
              Book a bespoke consultation with Syeda Shakila Qazi for your royal Nikah, grand reception, or candid destination wedding. Appointments sync directly with Google Calendar and our studio schedule.
            </p>

            {/* Google Calendar & Workspace Sync Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-black/60 backdrop-blur-md border border-[#4285F4]/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#4285F4]/20 border border-[#4285F4]/50 flex items-center justify-center">
                    <CalendarIcon className="w-4 h-4 text-[#8ab4f8]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-semibold text-white tracking-wide">
                      GOOGLE CALENDAR &amp; SHEETS
                    </h4>
                    <p className="text-[11px] text-white/60 font-mono">
                      Auto-invites &amp; consultation slots in IST
                    </p>
                  </div>
                </div>

                {hasGoogleAuth ? (
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-[#4285F4]/30 border border-[#4285F4] text-[#8ab4f8] text-[10px] font-mono uppercase">
                      Connected
                    </span>
                    <button
                      type="button"
                      onClick={handleDisconnectGoogle}
                      className="p-1 rounded text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                      title="Sign Out of Google"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleConnectGoogle}
                    disabled={isAuthorizing}
                    className="gsi-material-button inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white text-gray-800 hover:bg-gray-100 text-xs font-mono font-semibold transition-all shadow cursor-pointer"
                  >
                    {isAuthorizing ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-600" />
                    ) : (
                      <svg className="w-3.5 h-3.5" viewBox="0 0 48 48">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                      </svg>
                    )}
                    <span>{isAuthorizing ? 'Connecting...' : 'Sign in with Google'}</span>
                  </button>
                )}
              </div>

              <p className="text-xs text-white/70 font-sans leading-relaxed">
                Consultations generate instant Google Calendar event invitations with reminders (24 hrs &amp; 1 hr before) and append a record to your studio's Google Sheet.
              </p>

              {/* Upcoming Events Mini Preview if logged in */}
              {hasGoogleAuth && upcomingEvents.length > 0 && (
                <div className="pt-2 border-t border-white/10 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#C5A059] block">
                    Upcoming Calendar Schedule
                  </span>
                  <div className="space-y-1">
                    {upcomingEvents.map((evt) => (
                      <div
                        key={evt.id}
                        className="flex items-center justify-between text-xs font-mono text-white/80 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/10"
                      >
                        <span className="truncate max-w-[200px]">{evt.summary}</span>
                        <span className="text-[11px] text-[#C5A059]">
                          {evt.start.dateTime
                            ? new Date(evt.start.dateTime).toLocaleDateString('en-IN', {
                                month: 'short',
                                day: 'numeric'
                              })
                            : evt.start.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                /* Post-Submission Confirmation with Direct WhatsApp & Calendar Contact */
                <div className="space-y-6 text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-[#25D366]/20 border border-[#25D366]/50 flex items-center justify-center mx-auto text-[#25D366]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#C5A059]">
                      APPOINTMENT RECEIVED · {submittedBooking.id}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium">
                      Thank You, {submittedBooking.clientName}!
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 font-sans max-w-md mx-auto">
                      Your consultation inquiry for <strong>{submittedBooking.eventType}</strong> on{' '}
                      <strong>
                        {submittedBooking.eventDate} at {submittedBooking.eventTime}
                      </strong>{' '}
                      has been logged.
                    </p>
                  </div>

                  {/* Google Calendar & Sheets Sync Status Card */}
                  <div className="space-y-2 text-left">
                    {/* Calendar Event Status */}
                    {calendarSyncStatus === 'synced' || submittedBooking.calendarEventId ? (
                      <div className="p-3.5 rounded-xl bg-[#4285F4]/20 border border-[#4285F4]/50 flex items-center justify-between gap-3 text-xs font-mono">
                        <div className="flex items-center gap-2.5 text-[#8ab4f8]">
                          <CalendarIcon className="w-4 h-4 shrink-0" />
                          <span>Event Created in Google Calendar</span>
                        </div>
                        {(calendarEventLink || submittedBooking.calendarEventLink) && (
                          <a
                            href={calendarEventLink || submittedBooking.calendarEventLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[#C5A059] hover:underline shrink-0"
                          >
                            <span>Open Calendar</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    ) : null}

                    {/* Sheets Status */}
                    {sheetSyncStatus === 'synced' || submittedBooking.syncedToSheets ? (
                      <div className="p-3.5 rounded-xl bg-[#107c41]/20 border border-[#107c41]/50 flex items-center justify-between gap-3 text-xs font-mono">
                        <div className="flex items-center gap-2.5 text-[#34A853]">
                          <FileSpreadsheet className="w-4 h-4 shrink-0" />
                          <span>Logged to Google Spreadsheet</span>
                        </div>
                        <a
                          href={DEFAULT_SHEET_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#C5A059] hover:underline shrink-0"
                        >
                          <span>Open Sheet</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ) : null}

                    {/* Prompt to Sync if not synced */}
                    {(!submittedBooking.syncedToSheets || !submittedBooking.calendarEventId) &&
                      calendarSyncStatus !== 'synced' && (
                        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs font-mono">
                          <div className="flex items-center gap-2 text-white/70">
                            <CalendarIcon className="w-4 h-4 text-[#C5A059] shrink-0" />
                            <span>Add to Calendar &amp; Sheet?</span>
                          </div>
                          <button
                            type="button"
                            onClick={syncPendingBookingToWorkspace}
                            disabled={isAuthorizing}
                            className="px-3 py-1.5 rounded-lg bg-[#4285F4] hover:bg-[#3367d6] text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            {isAuthorizing ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <CalendarIcon className="w-3.5 h-3.5" />
                            )}
                            <span>Sync to Google Now</span>
                          </button>
                        </div>
                      )}
                  </div>

                  {syncErrorMessage && (
                    <div className="p-3 rounded-xl bg-red-900/20 border border-red-500/30 text-xs font-mono text-red-300 flex items-center gap-2 text-left">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{syncErrorMessage}</span>
                    </div>
                  )}

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
                        {submittedBooking.eventDate} ({submittedBooking.eventTime} IST)
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
                      href={`https://wa.me/919347307151?text=${encodeURIComponent(
                        `Hi Syeda Shakila Qazi, I just submitted an appointment request on your website!\nBooking ID: ${submittedBooking.id}\nName: ${submittedBooking.clientName}\nDate: ${submittedBooking.eventDate} at ${submittedBooking.eventTime}\nEvent: ${submittedBooking.eventType}\nVenue: ${submittedBooking.venue}`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0A2614] font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-md"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>CONFIRM ON WHATSAPP NOW</span>
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
                    onClick={() => {
                      setSubmittedBooking(null);
                      setSheetSyncStatus('idle');
                      setCalendarSyncStatus('idle');
                      setSyncErrorMessage(null);
                      setCalendarEventLink(null);
                    }}
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
                        Bespoke wedding photography &amp; cinematic film consultation
                      </p>
                    </div>

                    {hasGoogleAuth && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#4285F4]/20 border border-[#4285F4]/50 text-[#8ab4f8] text-[10px] font-mono">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Calendar Connected</span>
                      </span>
                    )}
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
                        <CalendarIcon className="w-3 h-3 text-[#C5A059]" />
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

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#E6B85C] hover:brightness-110 text-[#070605] font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-xl hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin text-[#070605]" />
                    ) : (
                      <>
                        <span>REQUEST WEDDING CONSULTATION</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] font-mono text-white/50 pt-1">
                    Auto-schedules in Google Calendar &amp; logs to Studio Spreadsheet
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
