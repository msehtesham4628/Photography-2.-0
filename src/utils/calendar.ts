import { BookingFormData } from '../types';

export function createGoogleCalendarUrl(data: BookingFormData): string {
  const title = `Shakeela Photography - ${data.fullName} - ${data.eventType}`;

  // Calculate appointment start and end datetime
  const appointmentDateStr = data.preferredAppointmentDate || data.eventDate || new Date().toISOString().split('T')[0];
  const timeStr = data.preferredAppointmentTime || '11:00 AM';

  // Parse time
  let hours = 11;
  let minutes = 0;
  const match = timeStr.match(/(\d+):?(\d+)?\s*(AM|PM)?/i);
  if (match) {
    hours = parseInt(match[1], 10);
    minutes = match[2] ? parseInt(match[2], 10) : 0;
    const modifier = match[3]?.toUpperCase();
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
  }

  // Format to UTC YYYYMMDDTHHmm00Z (approximate 45 min consultation)
  const [year, month, day] = appointmentDateStr.split('-').map(Number);
  const startDt = new Date(Date.UTC(year, (month || 1) - 1, day || 1, hours, minutes, 0));
  const endDt = new Date(startDt.getTime() + 45 * 60 * 1000);

  const formatCalTime = (d: Date) =>
    d.toISOString().replace(/-|:|\.\d+/g, '');

  const startFormatted = formatCalTime(startDt);
  const endFormatted = formatCalTime(endDt);

  const description = `Consultation with Shakeela Photography:
- Client: ${data.fullName}
- Phone: ${data.phone}
- Email: ${data.email}
- Event Type: ${data.eventType}
- Event Date: ${data.eventDate}
- Event Venue: ${data.venue}
- Number of Functions: ${data.numberOfFunctions}
- Requirements/Message: ${data.message || 'None provided'}

Shakeela Photography Studio:
Janaki Nagar Colony, Toli Chowki, Hyderabad, Telangana 500008
Official Contact: +91 93473 07151 / +91 93904 89371
https://ShakeelaPhotography.in`;

  const location = data.venue
    ? `${data.venue}, Hyderabad`
    : 'Shakeela Photography Studio, Janaki Nagar Colony, Toli Chowki, Hyderabad';

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${startFormatted}/${endFormatted}`,
    details: description,
    location: location,
    add: data.email
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function generateICSFile(data: BookingFormData): void {
  const title = `Shakeela Photography - ${data.fullName} - ${data.eventType}`;
  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Shakeela Photography//Consultation Booking//EN
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:Shakeela Photography Consultation for ${data.fullName} (${data.phone})\\nEvent Date: ${data.eventDate}\\nType: ${data.eventType}
LOCATION:Shakeela Photography Studio, Janaki Nagar Colony, Toli Chowki, Hyderabad
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `ShakeelaPhotography-Appointment-${data.fullName.replace(/\s+/g, '_')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
