export interface InstagramPhoto {
  id: string;
  image: string;
  instagramUrl: string;
  title: string;
  caption: string;
  category: 'Bridal' | 'Nikah' | 'Royal Groom' | 'Celebrity' | 'Candid';
  location: string;
  aspect: 'portrait' | 'square' | 'landscape';
}

export const INSTAGRAM_PHOTOS: InstagramPhoto[] = [
  {
    id: 'photo-01',
    image: '/assets/instagram-photos/photo-01.jpg',
    instagramUrl: 'https://www.instagram.com/p/Dcwi6r3ET0b/?stkn=Y2RocWZveGlzOHAw',
    title: 'Two Hands, One Forever',
    caption: 'Two hands one forever 😍✨🕊️ A beautiful beginning to forever with royal Nizam jewelry and delicate henna details.',
    category: 'Bridal',
    location: 'Taj Falaknuma Palace, Hyderabad',
    aspect: 'portrait'
  },
  {
    id: 'photo-02',
    image: '/assets/instagram-photos/photo-02.jpg',
    instagramUrl: 'https://www.instagram.com/p/DcojC0kgLGH/?stkn=MWVtNWV3a3BzY3NhcA==',
    title: 'نِكَاح · Sacred Vows',
    caption: 'نِكَاح ❤️✨🕊️ Once in a while, right in the middle of an ordinary life, love gives us a fairytale.',
    category: 'Nikah',
    location: 'Chowmahalla Palace, Hyderabad',
    aspect: 'square'
  },
  {
    id: 'photo-03',
    image: '/assets/instagram-photos/photo-03.jpg',
    instagramUrl: 'https://www.instagram.com/p/DcoiZ_ugHfs/?stkn=MWM1bDFyZnRndnYybA==',
    title: 'Royal Nizami Couple',
    caption: 'نِكَاح ❤️✨🕊️ Beautiful royal couple in heritage Hyderabadi bridal ensemble with emerald jewels.',
    category: 'Nikah',
    location: 'Hyderabad, Telangana',
    aspect: 'portrait'
  },
  {
    id: 'photo-04',
    image: '/assets/instagram-photos/photo-04.jpg',
    instagramUrl: 'https://www.instagram.com/p/Dcoepo7AFDo/?stkn=MWltYzRnemU4enFrZg==',
    title: 'Traditional Splendor',
    caption: 'نِكَاح ❤️✨🕊️ Capturing the grandeur of Hyderabadi wedding traditions and golden hues.',
    category: 'Nikah',
    location: 'Hyderabad',
    aspect: 'portrait'
  },
  {
    id: 'photo-05',
    image: '/assets/instagram-photos/photo-05.jpg',
    instagramUrl: 'https://www.instagram.com/p/Db50BOqAOwc/?stkn=NzJjMWF3bzkzOWtv',
    title: 'خوبصورت · Sister of the Bride',
    caption: '‎“خوبصورت” 🕊️✨ The beautiful bride’s sister in handcrafted pastel couture.',
    category: 'Bridal',
    location: 'Banjara Hills, Hyderabad',
    aspect: 'portrait'
  },
  {
    id: 'photo-06',
    image: '/assets/instagram-photos/photo-06.jpg',
    instagramUrl: 'https://www.instagram.com/p/DXE-KOaDal_/?stkn=cmlrcm5xN3d2cmIx',
    title: 'The Royal Groom',
    caption: 'EVERY DETAIL MATTERS ✨✨ THE ROYAL GROOM in royal sherwani and antique pearls.',
    category: 'Royal Groom',
    location: 'Falaknuma, Hyderabad',
    aspect: 'portrait'
  },
  {
    id: 'photo-07',
    image: '/assets/instagram-photos/photo-07.jpg',
    instagramUrl: 'https://www.instagram.com/p/DWZJe1bjSuW/?stkn=aDM5bHl2c3JjNmVm',
    title: 'The Nizam Bride',
    caption: 'Beautiful bride 😍🫶 Give your memories a magnificent Royal look with authentic Hyderabadi portraits.',
    category: 'Bridal',
    location: 'Hyderabad',
    aspect: 'portrait'
  },
  {
    id: 'photo-08',
    image: '/assets/instagram-photos/photo-08.jpg',
    instagramUrl: 'https://www.instagram.com/p/DVmJtuzAN8o/?stkn=MnZtZ2E1bXI5ZW42',
    title: 'Love & Laughter',
    caption: 'Cheers to love, laughter and happily ever after! ❤️😍✨ Candid emotions preserved for eternity.',
    category: 'Candid',
    location: 'Jubilee Hills, Hyderabad',
    aspect: 'square'
  },
  {
    id: 'photo-09',
    image: '/assets/instagram-photos/photo-09.jpg',
    instagramUrl: 'https://www.instagram.com/p/DVg-cLPgN8Y/?stkn=MXgxMnl1aTBhdHM3dg==',
    title: 'Qubool Hai · Forever Begins',
    caption: 'Qubool Hai ❤️🕊✨ Forever begins today! Sacred tears and unspoken joy.',
    category: 'Nikah',
    location: 'Mecca Masjid & Heritage Venues',
    aspect: 'square'
  },
  {
    id: 'photo-10',
    image: '/assets/instagram-photos/photo-10.jpg',
    instagramUrl: 'https://www.instagram.com/p/DUYpEpYDTUD/?stkn=azlrbjVqNDF2dXUx',
    title: 'Aliya Baig Bridal Muse',
    caption: 'The most beautiful & talented @makeupbyaliyabaig in frame with couture bridal styling.',
    category: 'Celebrity',
    location: 'Hyderabad, India',
    aspect: 'portrait'
  },
  {
    id: 'photo-11',
    image: '/assets/instagram-photos/photo-11.jpg',
    instagramUrl: 'https://www.instagram.com/p/DUYk0r2jYCN/?stkn=MXR4MGRtNXRzOTBmaQ==',
    title: 'Bespoke Celebration',
    caption: 'Cheers to love, laughter and happily ever after! ❤️ Celebratory confetti and joyous reception moments.',
    category: 'Candid',
    location: 'Hyderabad',
    aspect: 'portrait'
  },
  {
    id: 'photo-12',
    image: '/assets/instagram-photos/photo-12.jpg',
    instagramUrl: 'https://www.instagram.com/p/DSU-k5ADTCD/?stkn=aHp0OHM4cjk5ajM0',
    title: 'Qubool Hai Elegance',
    caption: 'Qubool Hai ❤️🕊✨ The solemn grace of the Nikah ceremony captured through timeless cinematic framing.',
    category: 'Nikah',
    location: 'Hyderabad',
    aspect: 'square'
  }
];
