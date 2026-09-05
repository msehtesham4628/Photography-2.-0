export type MediaCategory =
  | 'all'
  | 'weddings'
  | 'pre-weddings'
  | 'engagements'
  | 'receptions'
  | 'couple-portraits'
  | 'candid-photography'
  | 'family-functions'
  | 'events';

export interface PhotoItem {
  id: string;
  title: string;
  category: MediaCategory;
  categoryLabel: string;
  url: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  location?: string;
  caption?: string;
  tags?: string[];
}

export interface VideoItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  duration: string;
  videoUrl: string;
  posterUrl: string;
  aspectRatio?: '16:9' | '9:16';
  description?: string;
}

export interface EventStory {
  id: string;
  name: string;
  couple?: string;
  date: string;
  category: 'Weddings' | 'Pre-Weddings' | 'Engagements' | 'Receptions' | 'Events';
  location: string;
  venue: string;
  coverPhoto: string;
  coverVideo: string;
  description: string;
  quote?: string;
  photos: string[];
  filmUrl: string;
  driveFolder?: string;
  highlights: string[];
}

export interface InstagramPostItem {
  id: string;
  type: 'image' | 'video' | 'reel';
  mediaUrl: string;
  thumbnailUrl: string;
  caption: string;
  likes: number;
  comments: number;
  date: string;
  permalink: string;
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  venue: string;
  preferredAppointmentDate: string;
  preferredAppointmentTime: string;
  numberOfFunctions: string;
  message: string;
}

export interface BookingRecord extends BookingFormData {
  id: string;
  dateSubmitted: string;
  bookingStatus: 'Confirmed' | 'Pending Review' | 'Consultation Scheduled';
}
