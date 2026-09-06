import { InstagramPostItem } from '../types';

export const OFFICIAL_INSTAGRAM_URL = 'https://www.instagram.com/shakeela__photography?stkn=MWVla2s2dWFteGdxNQ==';
export const OFFICIAL_INSTAGRAM_HANDLE = '@shakeela__photography';
export const OFFICIAL_PHONE = '+91 9347307151';
export const OFFICIAL_PHONE_RAW = '9347307151';
export const OFFICIAL_PHONE_ALT = '+91 93904 89371';
export const OFFICIAL_EMAIL = 'info@ShakeelaPhotography.in';
export const OFFICIAL_ADDRESS = 'Shakeela Photography, Janaki Nagar Colony, Toli Chowki, Hyderabad, Telangana 500008, India';
export const OFFICIAL_PHOTOGRAPHER = 'Syeda Shakila Qazi';
export const OFFICIAL_TITLE = 'Best Female Photographer of the Year';
export const OFFICIAL_BIO = 'Best Female Photographer of the year 🏆 | Candidphotography / Cinematography / Drones / LED | Since 2000 | For Bookings Directly Call: 9347307151 | Hyderabad, India';
export const OFFICIAL_STATS = {
  followers: '155K+',
  followersCount: 155400,
  posts: '2,233',
  following: 481,
  experience: '24+ Years',
  since: '2000'
};

export interface InstagramProfile {
  handle: string;
  name: string;
  title: string;
  bio: string;
  phone: string;
  url: string;
  avatarUrl: string;
  verified: boolean;
  stats: typeof OFFICIAL_STATS;
  services: string[];
}

export const instagramProfileData: InstagramProfile = {
  handle: OFFICIAL_INSTAGRAM_HANDLE,
  name: OFFICIAL_PHOTOGRAPHER,
  title: OFFICIAL_TITLE,
  bio: OFFICIAL_BIO,
  phone: OFFICIAL_PHONE,
  url: OFFICIAL_INSTAGRAM_URL,
  avatarUrl: '/assets/hero-reel-poster.jpg',
  verified: true,
  stats: OFFICIAL_STATS,
  services: [
    'Candid Photography',
    'Cinematography & Films',
    '4K Drone Cinema',
    'Live LED Screens',
    'Bridal & Nizami Portraits',
    'Pre-Wedding Films',
    'Destination Weddings'
  ]
};

export const instagramPosts: InstagramPostItem[] = [
  {
    id: 'ig-reel-hero',
    type: 'reel',
    mediaUrl: '/assets/hero-reel-h264.mp4',
    thumbnailUrl: '/assets/hero-reel-poster.jpg',
    caption: 'Moments in motion. Golden hour vows and royal Hyderabad grace. Honored to document this magical union. 👑✨ #ShakeelaPhotography #HyderabadWeddings #BestFemalePhotographer #RoyalWeddings #CandidPhotography',
    likes: 18450,
    comments: 432,
    date: 'Featured Reel',
    permalink: 'https://www.instagram.com/reel/DcrKjtAg6Kj/?stkn=MXhocjVrdzBuc3NveQ=='
  },
  {
    id: 'ig-bridal-payal',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=85',
    caption: 'The regal beauty of Hyderabadi bridal payal and intricate polki chokers. Traditional craftsmanship captured through our lens at Taj Falaknuma Palace. 💎🕊️ Call: 9347307151 #ShakeelaPhotography #BridalPayal #NizamiBride #Hyderabad',
    likes: 12890,
    comments: 285,
    date: '3 days ago',
    permalink: OFFICIAL_INSTAGRAM_URL
  },
  {
    id: 'ig-award-photographer',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1200&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=800&q=85',
    caption: "Humbled and deeply grateful to receive the 'Best Female Photographer of the Year' award! 🏆 24+ years of passion, sleepless wedding nights, and unforgettable love stories across Hyderabad. Thank you to all our couples! ❤️ #SyedaShakilaQazi #ShakeelaPhotography #BestFemalePhotographer",
    likes: 24600,
    comments: 890,
    date: '1 week ago',
    permalink: OFFICIAL_INSTAGRAM_URL
  },
  {
    id: 'ig-drone-heritage',
    type: 'reel',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-couple-walking-hand-in-hand-in-a-field-41584-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85',
    caption: 'Aerial 4K drone cinematography gliding over historic arches at dawn. Majestic scale for a once-in-a-lifetime love story. 🚁✨ #DroneCinematography #ShakeelaPhotography #PreWeddingHyderabad #GolcondaFort',
    likes: 15320,
    comments: 310,
    date: '2 weeks ago',
    permalink: OFFICIAL_INSTAGRAM_URL
  },
  {
    id: 'ig-haldi-candid',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=85',
    caption: 'Yellow marigold showers and contagious family laughter! That is the heartbeat of our candid work since 2000. 💛✨ Booking for 2026-2027 wedding season now open. Call 9347307151. #CandidPhotography #HaldiCeremony #HyderabadWeddings',
    likes: 9840,
    comments: 174,
    date: '2 weeks ago',
    permalink: OFFICIAL_INSTAGRAM_URL
  },
  {
    id: 'ig-aisle-cinematography',
    type: 'reel',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bride-walking-down-the-aisle-41727-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85',
    caption: 'When the shehnai echoes and every breath stands still. A grand Hyderabadi entrance bathed in crystal and candlelight. 🕯️🌹 #ShakeelaFilms #HyderabadWeddings #Cinematography #NizamiRoyal',
    likes: 19740,
    comments: 512,
    date: '3 weeks ago',
    permalink: OFFICIAL_INSTAGRAM_URL
  },
  {
    id: 'ig-henna-macro',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=85',
    caption: 'Macro lens poetry: Bridal Mehendi with the groom’s initials woven into Nizami jaal patterns. 🌿💍 Direct bookings: +91 9347307151. #MacroPhotography #BridalMehendi #ShakeelaPhotography',
    likes: 11200,
    comments: 215,
    date: '1 month ago',
    permalink: OFFICIAL_INSTAGRAM_URL
  },
  {
    id: 'ig-royal-chowmahalla',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=85',
    caption: 'Aristocratic grandeur at Chowmahalla. Regal sherwani, handcrafted dupatta, and 24 years of storytelling expertise. 👑 #Chowmahalla #HyderabadiHeritage #WeddingPortraits #ShakeelaPhotography',
    likes: 14600,
    comments: 340,
    date: '1 month ago',
    permalink: OFFICIAL_INSTAGRAM_URL
  },
  {
    id: 'ig-bride-getting-ready',
    type: 'reel',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bride-putting-on-her-earrings-before-the-wedding-41728-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=85',
    caption: 'The sacred pause before the celebrations begin. Adjusting the jhumkas in quiet reverence. 🕊️✨ #BridalPreparation #ShakeelaPhotography #CinematicMoments',
    likes: 16800,
    comments: 390,
    date: '1 month ago',
    permalink: OFFICIAL_INSTAGRAM_URL
  }
];

