import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, CalendarDays, ChevronLeft, ChevronRight, Instagram, Mail, Menu, Play, X } from 'lucide-react';

const A = (n: number) => `/assets/aistudio/IMG-20260904-WA${String(n).padStart(4, '0')}.jpg`;
const photos = Array.from({ length: 27 }, (_, i) => A(i + 21));
const films = [
  'https://assets.mixkit.co/videos/preview/mixkit-bride-walking-down-the-aisle-41727-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-young-couple-walking-hand-in-hand-in-a-field-41584-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-bride-putting-on-her-earrings-before-the-wedding-41728-large.mp4',
];

const wa = 'https://wa.me/919347307151?text=' + encodeURIComponent('Hello Shakeela Photography, I would like to enquire about photography and videography services.');

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('is-visible'); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function Image({ src, alt, className = '', onClick }: { src: string; alt: string; className?: string; onClick?: () => void }) {
  return <img src={src} alt={alt} loading="lazy" decoding="async" className={`media-image ${className}`} onClick={onClick} />;
}

export default function App() {
  const [menu, setMenu] = useState(false);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [film, setFilm] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const go = (id: string) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const submitBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="site">
      <header className="topbar">
        <button className="wordmark" onClick={() => go('home')} aria-label="Shakeela Photography home">
          <span>SHAKEELA</span><small>PHOTOGRAPHY</small>
        </button>
        <nav className="desktop-nav">
          {['story','work','films','events','instagram'].map(x => <button key={x} onClick={() => go(x)}>{x}</button>)}
        </nav>
        <button className="book-pill" onClick={() => go('book')}>BOOK YOUR DATE <ArrowUpRight size={15}/></button>
        <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Open menu">{menu ? <X/> : <Menu/>}</button>
      </header>
      {menu && <div className="mobile-menu">{['home','story','work','films','events','instagram','book'].map(x => <button key={x} onClick={() => go(x)}>{x}</button>)}</div>}

      <main>
        <section id="home" className="hero cinematic-panel">
          <div className="hero-image-stack" aria-hidden="true">
            {photos.slice(0, 5).map((p, i) => <Image key={p} src={p} alt="" className={`stack-photo s${i}`}/>) }
          </div>
          <div className="hero-wash" />
          <div className="hero-copy">
            <p className="eyebrow">HYDERABAD · INDIA · EST. 2023</p>
            <h1><span>Moments</span><em>in motion.</em></h1>
            <p className="hero-lede">Wedding photography & cinematography for stories that deserve to be felt, not simply remembered.</p>
            <div className="hero-actions"><button className="solid-btn" onClick={() => go('work')}>Enter the story <ArrowDown size={16}/></button><a className="line-btn" href={wa} target="_blank" rel="noreferrer">WhatsApp us</a></div>
          </div>
          <div className="hero-meta"><span>20+ YEARS</span><span>WEDDINGS · FILMS · STORIES</span><span>SCROLL TO EXPLORE ↓</span></div>
        </section>

        <section id="story" className="manifesto">
          <Reveal className="manifesto-inner">
            <p className="eyebrow">THE SHAKEELA APPROACH</p>
            <h2>We don't direct<br/><i>the moment.</i><br/>We catch it.</h2>
            <p>From the quiet breath before the ceremony to the chaos on the dance floor, we make images and films with movement, intimacy and a distinctly Hyderabad soul.</p>
          </Reveal>
          <div className="orbit" aria-hidden="true"><span>CAPTURE · FEEL · REMEMBER ·</span></div>
        </section>

        <section id="work" className="work-section">
          <div className="section-head"><div><p className="eyebrow">01 / PHOTOGRAPHY</p><h2>The still<br/><i>becomes alive.</i></h2></div><p className="section-note">A moving wall of real celebrations. Tap any frame to step inside.</p></div>
          <div className="photo-wall">
            {photos.map((p, i) => <Reveal key={p} className={`photo-frame f${i % 6}`}><button className="photo-button" onClick={() => setActivePhoto(i)}><Image src={p} alt={`Shakeela Photography wedding frame ${i + 1}`}/><span className="frame-index">{String(i + 1).padStart(2,'0')}</span></button></Reveal>)}
          </div>
        </section>

        <section id="films" className="film-section">
          <div className="section-head light"><div><p className="eyebrow">02 / CINEMATOGRAPHY</p><h2>Press<br/><i>play.</i></h2></div><p className="section-note">Cinematic wedding films built around real emotion, rhythm and the people who make your day yours.</p></div>
          <div className="film-stage">
            <video key={films[film]} className="film-video" src={films[film]} poster={photos[film + 3]} muted autoPlay loop playsInline controls preload="metadata" />
            <div className="film-overlay"><span>FILM 0{film + 1}</span><strong>{['THE WALK · A WEDDING FILM','TWO SOULS · A LOVE STORY','BEFORE THE CEREMONY'][film]}</strong><button onClick={() => setFilm((film + 1) % films.length)}>NEXT FILM <ArrowUpRight size={15}/></button></div>
          </div>
          <div className="film-switch"><button onClick={() => setFilm((film + films.length - 1) % films.length)}><ChevronLeft/></button><span>0{film + 1} / 0{films.length}</span><button onClick={() => setFilm((film + 1) % films.length)}><ChevronRight/></button></div>
        </section>

        <section id="events" className="events-section">
          <div className="event-split"><Reveal><p className="eyebrow">03 / EVENT STORIES</p><h2>Every celebration<br/><i>has a pulse.</i></h2><p>Weddings, engagements, receptions, pre-weddings and the in-between moments. Your complete visual story, organized event by event.</p><button className="circle-btn" onClick={() => setActivePhoto(0)}>EXPLORE STORIES <ArrowUpRight size={17}/></button></Reveal><Reveal className="event-image"><Image src={photos[18]} alt="Wedding celebration"/></Reveal></div>
        </section>

        <section id="instagram" className="instagram-section">
          <div className="section-head"><div><p className="eyebrow">04 / SOCIAL</p><h2>From the frame<br/><i>to the feed.</i></h2></div><a className="insta-link" href="#instagram"><Instagram size={18}/> @SHAKEELAPHOTOGRAPHY <ArrowUpRight size={15}/></a></div>
          <div className="insta-strip">{photos.slice(8, 14).map((p,i)=><a href="#instagram" key={p} className="insta-card"><Image src={p} alt={`Instagram wedding post ${i+1}`}/><span>VIEW STORY ↗</span></a>)}</div>
        </section>

        <section id="book" className="booking-section">
          <Reveal className="booking-inner">
            <div className="booking-copy"><p className="eyebrow">05 / BOOK YOUR DATE</p><h2>Let's make<br/><i>your film.</i></h2><p>Tell us a little about your celebration. We'll take it from there.</p><div className="contact-line"><Mail size={16}/> info@ShakeelaPhotography.in</div><div className="contact-line"><CalendarDays size={16}/> Google Calendar appointments</div></div>
            {!sent ? <form onSubmit={submitBooking} className="booking-form"><input required name="name" placeholder="Your name"/><input required name="phone" placeholder="Phone number"/><input type="email" required name="email" placeholder="Email address"/><select name="event"><option>Wedding</option><option>Pre-Wedding</option><option>Engagement</option><option>Reception</option><option>Event</option></select><input required type="date" name="date"/><textarea name="message" placeholder="Tell us about your story" rows={4}/><button className="solid-btn" type="submit">Request an appointment <ArrowUpRight size={16}/></button><small>Connect this form to Google Calendar + Google Sheets using your serverless endpoint. No database required.</small></form> : <div className="success"><span>THANK YOU</span><h3>Your story is on its way.</h3><p>We'll be in touch to confirm your consultation.</p><a className="solid-btn" href={wa} target="_blank" rel="noreferrer">Continue on WhatsApp <ArrowUpRight size={16}/></a></div>}
          </Reveal>
        </section>

        <section className="final-hero">
          <div className="final-image"><Image src={photos[25]} alt="Shakeela Photography final wedding portrait"/></div><div className="final-shade"/><div className="final-copy"><p className="eyebrow">SHAKEELA PHOTOGRAPHY · HYDERABAD</p><h2>Your moment.<br/><i>Your story.<br/>Your film.</i></h2><div className="final-links"><a href={wa} target="_blank" rel="noreferrer">WHATSAPP <ArrowUpRight size={15}/></a><a href="mailto:info@ShakeelaPhotography.in">EMAIL <ArrowUpRight size={15}/></a><a href="tel:+919347307151">CALL <ArrowUpRight size={15}/></a></div><p className="address">Janaki Nagar Colony, Toli Chowki, Hyderabad, Telangana 500008</p></div></section>
      </main>

      <footer>© 2023 Shakeela Photography. All Rights Reserved.</footer>

      {activePhoto !== null && <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setActivePhoto(null)}><button className="close" onClick={() => setActivePhoto(null)}><X/></button><Image src={photos[activePhoto]} alt="Selected Shakeela Photography frame" className="lightbox-image"/><div className="lightbox-count">{activePhoto + 1} / {photos.length}</div></div>}
      {bookingOpen && <div className="booking-modal" onClick={() => setBookingOpen(false)}><div onClick={e => e.stopPropagation()}><h3>Book your date</h3><p>Use the booking section below to request your consultation.</p><button onClick={() => { setBookingOpen(false); go('book'); }} className="solid-btn">Go to booking <ArrowUpRight/></button></div></div>}
    </div>
  );
}
