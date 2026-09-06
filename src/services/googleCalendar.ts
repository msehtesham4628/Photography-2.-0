import { getAccessToken } from './googleAuth';
import type { AppointmentRecord } from '../components/AppointmentSection';

export interface CalendarEventResult {
  success: boolean;
  eventId?: string;
  htmlLink?: string;
  message?: string;
}

export interface UpcomingEvent {
  id: string;
  summary: string;
  description?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
  location?: string;
  htmlLink?: string;
}

/**
 * Creates a consultation or wedding photoshoot appointment on the user's primary Google Calendar.
 */
export async function createCalendarEvent(
  appointment: AppointmentRecord
): Promise<CalendarEventResult> {
  const token = getAccessToken();
  if (!token) {
    return {
      success: false,
      message: 'Google authorization required. Please sign in to sync with Google Calendar.'
    };
  }

  // Parse start and end time (default to 1 hour consultation)
  const dateStr = appointment.eventDate; // "YYYY-MM-DD"
  const timeStr = appointment.eventTime || '11:00'; // "HH:mm"

  // Construct RFC3339 datetime with IST offset (+05:30) for Hyderabad
  const startDateTime = `${dateStr}T${timeStr}:00+05:30`;

  // Calculate 1-hour duration
  const [hours, minutes] = timeStr.split(':').map(Number);
  const endHour = (hours + 1) % 24;
  const endHourStr = endHour < 10 ? `0${endHour}` : `${endHour}`;
  const endDateTime = `${dateStr}T${endHourStr}:${minutes < 10 ? `0${minutes}` : minutes}:00+05:30`;

  const summary = `📸 [Wedding Consultation] ${appointment.clientName} - ${appointment.eventType}`;
  const description = `Syeda Shakila Qazi Studio Consultation
Booking ID: ${appointment.id}
Client: ${appointment.clientName}
WhatsApp / Phone: ${appointment.phone}
Email: ${appointment.email}
Ceremony: ${appointment.eventType}
Venue: ${appointment.venue}
Notes: ${appointment.notes || 'None'}
Created via: Shakeela Photography Web Portal`;

  const eventPayload = {
    summary,
    description,
    location: appointment.venue || 'Hyderabad, Telangana',
    start: {
      dateTime: startDateTime,
      timeZone: 'Asia/Kolkata'
    },
    end: {
      dateTime: endDateTime,
      timeZone: 'Asia/Kolkata'
    },
    attendees: appointment.email && appointment.email !== 'Not Provided' ? [{ email: appointment.email }] : [],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 60 }
      ]
    }
  };

  try {
    const response = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventPayload)
      }
    );

    if (!response.ok) {
      const errData = await response.json().catch(() => null);
      const errMsg = errData?.error?.message || `HTTP ${response.status} error`;
      throw new Error(errMsg);
    }

    const data = await response.json();
    return {
      success: true,
      eventId: data.id,
      htmlLink: data.htmlLink
    };
  } catch (error: any) {
    console.error('Failed to create Google Calendar event:', error);
    return {
      success: false,
      message: error?.message || 'Failed to create Google Calendar event'
    };
  }
}

/**
 * Lists upcoming photoshoot consultations or booked sessions from Google Calendar.
 */
export async function listUpcomingCalendarEvents(): Promise<UpcomingEvent[]> {
  const token = getAccessToken();
  if (!token) return [];

  const now = new Date().toISOString();
  try {
    const url = new URL('https://www.googleapis.com/calendar/v3/calendars/primary/events');
    url.searchParams.set('timeMin', now);
    url.searchParams.set('maxResults', '10');
    url.searchParams.set('singleEvents', 'true');
    url.searchParams.set('orderBy', 'startTime');

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.items || [];
  } catch (e) {
    console.error('Error fetching calendar events:', e);
    return [];
  }
}
