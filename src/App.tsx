import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Menu, X } from 'lucide-react';

const base = `${import.meta.env.BASE_URL}assets/aistudio/`;
const photo = (n: number) => `${base}IMG-20260904-WA${String(n).padStart(4, '0')}.jpg`;

const gallery = [
  { src: photo(21), number: '01', title: 'The Beginning', className: 'large' },
  { src: photo(22), number: '02', title: 'The Celebration', className: 'portrait' },
  { src: photo(23), number: '03', title: 'The Groom', className: 'wide' },
  { src: photo(24), number: '04', title: 'The Details', className: 'portrait' },
  { src: photo(25), number: '05', title: 'Together', className: 'large' },
  { src: photo(26), number: '06', title: 'The People', className: 'square' },
  { src: photo(27), number: '07', title: 'The Ceremony', className: 'wide' },
  { src: photo(28), number: '08', title: 'Afterglow', className: 'portrait' },
  { src: photo(29), number: '09', title: 'Forever', className: 'large' },
  { src: photo(30), number: '10', title: 'In Between', className: 'portrait' },
  { src: photo(31), number: '11', title: 'The Family', className: 'wide' },
  { src: photo(32), number: '12', title: 'A Quiet Moment', className: 'square' },
];

const whatsapp = 'https://wa.me/919347307151?text=' + encodeURIComponent('Hello Shakeela Photography, I would like to enquire about photography and cinematography services.');

function SafeImage({ src, alt, eager = false, className = '' }: { src: string; alt: string; eager?: boolean; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className={`image-error ${className}`} aria-label={alt}>IMAGE</div>;
  return <img src={src} alt={alt} className={className} loading={eager ? 'eager' : 'lazy'} decoding="async" fetchPriority={eager ? 'high' : 'auto'} onError={() => setFailed(true)} />;
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = document.querySelector(`[data-reveal="${delay}-${Math.random()}"]`);
    return () => { void el; };
  }, [delay]);
  return <div className={`reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${delay}ms` }} ref={(node) => {
    if (!node || visible) return;
    const io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.08 });
    io.observe(node);
  }}>{children}</div>;
}

export default function App() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <div className="site">
      <header className="nav">
        <button className="logo" onClick={() => go('home')} aria-label="Shakeela Photography home">
          <strong>SHAKEELA</strong><span>PHOTOGRAPHY</span>
        </button>
        <nav>
          <button onClick={() => go('story')}>STORY</button>
          <button onClick={() => go('work')}>WORK</button>
          <button onClick={() => go('films')}>FILMS</button>
          <button onClick={() => go('contact')}>CONTACT</button>
        </nav>
        <a className="nav-cta" href={whatsapp} target="_blank" rel="noreferrer">WHATSAPP <ArrowUpRight size={14} /></a>
        <button className="menu" onClick={() => setMenu(v => !v)} aria-label="Menu">{menu ? <X /> : <Menu />}</button>
      </header>

      {menu && <div className="mobile-menu">
        <button onClick={() => go('home')}>HOME</button><button onClick={() => go('story')}>STORY</button><button onClick={() => go('work')}>WORK</button><button onClick={() => go('films')}>FILMS</button><button onClick={() => go('contact')}>CONTACT</button>
        <a href={whatsapp} target="_blank" rel="noreferrer">WHATSAPP US <ArrowUpRight size={18} /></a>
      </div>}

      <main>
        <section id="home" className="hero">
          <div className="hero-media"><SafeImage src={photo(21)} alt="Indian wedding couple" eager /></div>
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="kicker">HYDERABAD · INDIA · EST. 2023</p>
            <h1>Moments<br /><i>in motion.</i></h1>
            <p className="hero-text">Wedding photography & cinematography for stories that deserve to be felt, not simply remembered.</p>
            <div className="actions"><button className="light-button" onClick={() => go('work')}>ENTER THE STORY <ArrowDown size={16} /></button><a className="dark-button" href={whatsapp} target="_blank" rel="noreferrer">WHATSAPP US <ArrowUpRight size={16} /></a></div>
          </div>
          <div className="hero-bottom"><span>20+ YEARS</span><span>WEDDINGS · FILMS · STORIES</span><span>SCROLL TO EXPLORE ↓</span></div>
        </section>

        <section id="story" className="statement">
          <div className="statement-mark">S</div>
          <Reveal><p className="kicker">THE SHAKEELA APPROACH</p><h2>We preserve<br /><i>how it felt.</i></h2><p className="statement-copy">Not just the ceremony. The nervous laugh. The hands held under the table. The people who travelled miles. The noise, the light, the tears and everything that happens between the big moments.</p></Reveal>
        </section>

        <section id="work" className="work">
          <div className="section-intro"><div><p className="kicker">01 / PHOTOGRAPHY</p><h2>The still<br /><i>becomes alive.</i></h2></div><p>Real celebrations, photographed with an editorial eye and a soft cinematic touch.</p></div>
          <div className="gallery">
            {gallery.map((item, i) => <Reveal key={item.src} delay={(i % 3) * 80}><button className={`gallery-card ${item.className}`} onClick={() => setActive(i)}><SafeImage src={item.src} alt={item.title} /><span className="number">{item.number}</span><span className="caption">{item.title} <ArrowUpRight size={14} /></span></button></Reveal>)}
          </div>
        </section>

        <section id="films" className="films">
          <div className="section-intro light"><div><p className="kicker">02 / CINEMATOGRAPHY</p><h2>Press<br /><i>play.</i></h2></div><p>Cinematic wedding films built around real emotion, rhythm and the people who make your day yours.</p></div>
          <div className="film-card"><SafeImage src={photo(33)} alt="Cinematic wedding film still" /><div className="film-shade" /><div className="film-copy"><span>FILM 01</span><h3>THE WALK · A<br />WEDDING FILM</h3><a href={whatsapp} target="_blank" rel="noreferrer">ENQUIRE ABOUT FILMS <ArrowUpRight size={15} /></a></div><div className="play">▶</div></div>
          <div className="film-footer"><span>01 / 03</span><span>STORIES IN MOTION</span></div>
        </section>

        <section id="contact" className="contact">
          <div><p className="kicker">03 / YOUR STORY</p><h2>Let's make<br /><i>something timeless.</i></h2></div>
          <div className="contact-right"><p>Available for weddings, engagements, receptions and destination celebrations from Hyderabad and beyond.</p><a className="contact-button" href={whatsapp} target="_blank" rel="noreferrer">START A CONVERSATION <ArrowUpRight size={16} /></a></div>
        </section>

        <section className="closing"><SafeImage src={photo(46)} alt="Wedding portrait" /><div className="closing-shade" /><div className="closing-copy"><p className="kicker">SHAKEELA PHOTOGRAPHY · HYDERABAD</p><h2>Your moment.<br /><i>Your story.</i></h2><a href={whatsapp} target="_blank" rel="noreferrer">WHATSAPP US <ArrowUpRight size={15} /></a></div></section>
      </main>

      <footer>© 2023 Shakeela Photography. All Rights Reserved.</footer>

      {active !== null && <div className="lightbox" onClick={() => setActive(null)} role="dialog" aria-modal="true"><button onClick={() => setActive(null)} aria-label="Close"><X /></button><SafeImage src={gallery[active].src} alt={gallery[active].title} eager /><span>{gallery[active].number} / {gallery.length}</span></div>}
    </div>
  );
}
