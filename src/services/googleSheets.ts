import { getAccessToken } from './googleAuth';
import type { AppointmentRecord } from '../components/AppointmentSection';

// The user's Google Spreadsheet ID
export const DEFAULT_SPREADSHEET_ID = '10d8gr7UZT119jRwDA7YAAUHhTHjC7HbJRJRc2e43ODE';
export const DEFAULT_SHEET_URL = `https://docs.google.com/spreadsheets/d/${DEFAULT_SPREADSHEET_ID}/edit`;

interface AppendResult {
  success: boolean;
  message?: string;
  updatedRange?: string;
}

/**
 * Appends a consultation booking inquiry as a new row in the user's Google Spreadsheet.
 */
export async function appendAppointmentToSheet(
  appointment: AppointmentRecord,
  spreadsheetId: string = DEFAULT_SPREADSHEET_ID
): Promise<AppendResult> {
  const token = getAccessToken();
  if (!token) {
    return {
      success: false,
      message: 'Google authorization required. Please sign in to sync with Google Sheets.'
    };
  }

  // Row format: [Booking ID, Submission Timestamp, Client Name, Phone, Email, Ceremony Type, Event Date, Event Time, City/Venue, Notes, Status]
  const rowValues = [
    appointment.id,
    new Date(appointment.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    appointment.clientName,
    appointment.phone,
    appointment.email,
    appointment.eventType,
    appointment.eventDate,
    appointment.eventTime,
    appointment.venue,
    appointment.notes || 'None',
    appointment.status
  ];

  try {
    const range = 'Sheet1!A:K';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
      range
    )}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values: [rowValues]
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => null);
      const errMsg = errData?.error?.message || `HTTP ${response.status} error`;
      throw new Error(errMsg);
    }

    const data = await response.json();
    return {
      success: true,
      updatedRange: data?.updates?.updatedRange || range
    };
  } catch (error: any) {
    console.error('Failed to append appointment to Google Sheet:', error);
    return {
      success: false,
      message: error?.message || 'Failed to save to Google Sheets'
    };
  }
}
