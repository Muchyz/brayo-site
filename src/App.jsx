import { useEffect, useState, useRef, useCallback, useMemo } from "react";

const PHONE = "+254712319654";
const WA_NUMBER = "254712319654";
const BUSINESS_NAME = "Brayo wa Ndarugo Mawe";
const TIKTOK_URL = "https://vm.tiktok.com/ZS9LLoHapUneQ-GhztX/";
const FACEBOOK_URL = "https://www.facebook.com/brayo.mars.3";

const wa = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

const MSG = {
  hero: `Hi ${BUSINESS_NAME} 👋\n\nI need building materials delivered urgently.\n\n📍 My location: [Enter your area]\n\nThank you!`,
  float: `Hi ${BUSINESS_NAME} 👋\n\nI'd like to ORDER today.\n\n📦 Material: [e.g. Ndarugo Stones]\n📍 Delivery location: [Your area]\n🚛 Quantity: [No. of trucks]\n\nReady to pay!`,
  all: `Hi ${BUSINESS_NAME} 👋\n\nI'd like a full PRICE LIST for all materials.\n\n📍 My delivery area: [Your area]\n\nThank you!`,
  delivery: `Hi ${BUSINESS_NAME} 👋\n\nI want to confirm delivery to my area.\n\n📍 My location: [Enter your exact area]\n\nThank you!`,
  product: (n) => `Hi ${BUSINESS_NAME} 👋\n\nI'm interested in *${n}*.\n\n📍 Delivery area: [Enter your area]\n🚛 Quantity: [No. of trucks]\n\nReady to confirm order!`,
  price: (i) => `Hi ${BUSINESS_NAME} 👋\n\nI need an EXACT QUOTE for *${i}*.\n\n📍 Delivery location: [Your area]\n🚛 Quantity: [No. of trucks]\n\nThank you!`,
  form: (name, phone, loc, msg) => `Hi ${BUSINESS_NAME} 👋\n\nNew enquiry:\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n📍 Location: ${loc}\n💬 Request: ${msg}\n\nReady to order today!`,
};

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  :root {
    --cream: #f7f3ec;
    --cream2: #f0e9de;
    --cream3: #e8dece;
    --parchment: #ddd0bc;
    --ink: #0f0c08;
    --ink2: #1e1a13;
    --ink3: #332d22;
    --ink4: #6b6052;
    --ink5: #9c8f7e;
    --gold: #c49a2a;
    --gold2: #d4a831;
    --gold3: #e8bf4a;
    --gold-pale: #fdf6e3;
    --gold-pale2: #f8edcc;
    --ember: #b8390a;
    --ember2: #d44512;
    --sage: #2d6a4f;
    --sage2: #40916c;
    --white: #ffffff;
    --nav-h: 72px;
    --font-serif: 'Playfair Display', Georgia, serif;
    --font-sans: 'DM Sans', sans-serif;
    --font-mono: 'DM Mono', monospace;
    --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    --ease-smooth: cubic-bezier(0.22, 1, 0.36, 1);
  }

  body {
    font-family: var(--font-sans);
    background: var(--cream);
    color: var(--ink);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  ::selection { background: var(--gold); color: var(--white); }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--cream2); }
  ::-webkit-scrollbar-thumb { background: var(--gold); }

  body { cursor: none; }
  .c-dot, .c-ring { position: fixed; pointer-events: none; z-index: 9999; border-radius: 50%; transform: translate(-50%,-50%); }
  .c-dot { width: 6px; height: 6px; background: var(--gold2); transition: width 0.2s, height 0.2s, background 0.2s; }
  .c-ring { width: 32px; height: 32px; border: 1px solid rgba(196,154,42,0.5); transition: width 0.3s var(--ease-smooth), height 0.3s var(--ease-smooth), border-color 0.2s; }
  .c-hover .c-dot { width: 10px; height: 10px; background: var(--gold3); }
  .c-hover .c-ring { width: 48px; height: 48px; border-color: var(--gold2); }

  body::after {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 9000;
    opacity: 0.35;
    mix-blend-mode: multiply;
  }

  @keyframes fadeUp { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes fadeInDown { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:translateY(0); } }
  @keyframes slideInLeft { from { opacity:0; transform:translateX(-30px); } to { opacity:1; transform:translateX(0); } }
  @keyframes slideInRight { from { opacity:0; transform:translateX(60px); } to { opacity:1; transform:translateX(0); } }
  @keyframes scaleIn { from { opacity:0; transform:scale(0.92); } to { opacity:1; transform:scale(1); } }
  @keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.4);opacity:0.7} }
  @keyframes waPulse { 0%,100%{box-shadow:0 0 0 0 rgba(45,106,79,0.5)} 70%{box-shadow:0 0 0 14px rgba(45,106,79,0)} }
  @keyframes shimmer { from{background-position:-200% 0} to{background-position:200% 0} }
  @keyframes countUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes borderDraw { from{stroke-dashoffset:1000} to{stroke-dashoffset:0} }
  @keyframes rotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes toastIn { from{opacity:0;transform:translateX(100%)} to{opacity:1;transform:translateX(0)} }
  @keyframes toastOut { from{opacity:1;transform:translateX(0)} to{opacity:0;transform:translateX(100%)} }
  @keyframes lightboxIn { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }

  .section-label {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1.5rem;
  }
  .section-label::before {
    content: '';
    display: inline-block;
    width: 28px;
    height: 1px;
    background: var(--gold);
  }

  [id] { scroll-margin-top: calc(var(--nav-h) + 16px); }

  .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.7s var(--ease-smooth), transform 0.7s var(--ease-smooth); }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  .clip-top-right { clip-path: polygon(0 0, 100% 4vw, 100% 100%, 0 100%); margin-top: -4vw; padding-top: calc(4vw + 4rem) !important; }
  .clip-top-left  { clip-path: polygon(0 4vw, 100% 0, 100% 100%, 0 100%); margin-top: -4vw; padding-top: calc(4vw + 4rem) !important; }
  .clip-both      { clip-path: polygon(0 4vw, 100% 0, 100% calc(100% - 4vw), 0 100%); margin-top: -4vw; margin-bottom: -4vw; padding-top: calc(4vw + 4rem) !important; padding-bottom: calc(4vw + 4rem) !important; }

  .typed-cursor { animation: blink 0.7s infinite; }

  .lightbox-overlay {
    position: fixed; inset: 0; z-index: 9900;
    background: rgba(10,8,5,0.96);
    display: flex; align-items: center; justify-content: center;
    animation: fadeIn 0.25s ease;
    backdrop-filter: blur(8px);
  }
  .lightbox-img {
    max-width: 90vw; max-height: 88vh;
    object-fit: contain;
    border: 1px solid rgba(196,154,42,0.2);
    animation: lightboxIn 0.3s var(--ease-spring);
    box-shadow: 0 40px 120px rgba(0,0,0,0.8);
  }
  .lightbox-close {
    position: absolute; top: 1.5rem; right: 1.5rem;
    background: rgba(196,154,42,0.15); border: 1px solid rgba(196,154,42,0.3);
    color: var(--gold); width: 48px; height: 48px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 1.4rem; transition: all 0.2s;
  }
  .lightbox-close:hover { background: var(--gold); color: var(--ink); }
  .lightbox-nav {
    position: absolute; top: 50%; transform: translateY(-50%);
    background: rgba(196,154,42,0.12); border: 1px solid rgba(196,154,42,0.25);
    color: var(--gold); width: 52px; height: 52px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.2s; font-size: 1.2rem;
  }
  .lightbox-nav:hover { background: var(--gold); color: var(--ink); }
  .lightbox-prev { left: 1.5rem; }
  .lightbox-next { right: 1.5rem; }
  .lightbox-counter {
    position: absolute; bottom: 1.5rem; left: 50%; transform: translateX(-50%);
    font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.2em;
    color: rgba(255,255,255,0.4); text-transform: uppercase;
  }

  .wa-sticky {
    position: fixed; bottom: 2rem; right: 2rem; z-index: 998;
    width: 60px; height: 60px; border-radius: 50%;
    background: var(--sage); color: var(--white);
    display: flex; align-items: center; justify-content: center;
    text-decoration: none; transition: all 0.3s var(--ease-spring);
    box-shadow: 0 4px 20px rgba(45,106,79,0.45);
    animation: waPulse 2.5s infinite;
  }
  .wa-sticky:hover { transform: scale(1.12); background: var(--sage2); box-shadow: 0 8px 32px rgba(45,106,79,0.55); }
  .wa-sticky-label {
    position: absolute; right: 70px; top: 50%; transform: translateY(-50%);
    background: var(--ink); color: var(--gold);
    font-family: var(--font-mono); font-size: 0.6rem; letter-spacing: 0.12em;
    padding: 0.4rem 0.85rem; white-space: nowrap; border-radius: 2px;
    opacity: 0; transition: opacity 0.2s; pointer-events: none;
    border: 1px solid rgba(196,154,42,0.25);
  }
  .wa-sticky:hover .wa-sticky-label { opacity: 1; }

  .toast {
    position: fixed; top: 5rem; right: 1.5rem; z-index: 9800;
    background: var(--ink); border: 1px solid rgba(196,154,42,0.3);
    border-left: 3px solid var(--sage2);
    padding: 1rem 1.4rem; min-width: 280px;
    box-shadow: 0 8px 40px rgba(15,12,8,0.3);
    animation: toastIn 0.4s var(--ease-spring);
    border-radius: 2px;
  }
  .toast.leaving { animation: toastOut 0.35s var(--ease-smooth) forwards; }
  .toast-title { font-family: var(--font-serif); font-weight: 700; font-size: 0.95rem; color: var(--white); margin-bottom: 0.25rem; }
  .toast-body { font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.08em; color: rgba(255,255,255,0.4); }

  .gallery-item { cursor: zoom-in; }

  @media (max-width: 767px) {
    .gallery-main-grid {
      grid-template-columns: 1fr 1fr !important;
      grid-template-rows: auto !important;
    }
    .gallery-main-grid > div {
      grid-column: auto !important;
      grid-row: auto !important;
      aspect-ratio: 1 / 1 !important;
    }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    .gallery-main-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      grid-template-rows: auto !important;
    }
    .gallery-main-grid > div {
      grid-column: auto !important;
      grid-row: auto !important;
      aspect-ratio: 4/3 !important;
    }
  }

  @media (max-width: 767px) {
    body { cursor: auto; }
    .c-dot, .c-ring { display: none; }
    .desktop-nav { display: none !important; }
    .mobile-btn { display: flex !important; }
    .wa-sticky { display: none !important; }
    .hero-image-panel { display: none !important; }
    .hero-content { padding: 7rem 1.25rem 3rem !important; }
    .hero-ctas { flex-direction: column !important; }
    .hero-ctas a { width: 100% !important; justify-content: center !important; }
    .hero-number { display: none !important; }
    .hero-trust { gap: 1rem !important; }
    .stats-row { grid-template-columns: 1fr 1fr !important; }
    .stats-row > div:nth-child(2n) { border-right: none !important; }
    .products-grid { grid-template-columns: 1fr !important; }
    .products-header { flex-direction: column !important; align-items: flex-start !important; }
    .why-grid { grid-template-columns: 1fr !important; }
    .why-grid > div { border-right: none !important; }
    .steps-grid { grid-template-columns: 1fr !important; }
    .steps-grid > div { border-right: none !important; border-bottom: 1px solid var(--cream3) !important; }
    .pricing-grid { grid-template-columns: 1fr !important; }
    .delivery-boxes { grid-template-columns: 1fr !important; }
    .testi-grid { grid-template-columns: 1fr !important; }
    .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
    .footer-inner { flex-direction: column !important; gap: 2.5rem !important; }
    .pricing-header { flex-direction: column !important; align-items: flex-start !important; gap: 1rem !important; }
    .gallery-header { flex-direction: column !important; align-items: flex-start !important; gap: 1rem !important; }
    .clip-top-right, .clip-top-left, .clip-both {
      clip-path: none !important;
      margin-top: 0 !important;
      margin-bottom: 0 !important;
      padding-top: 4rem !important;
      padding-bottom: 4rem !important;
    }
    a, button { cursor: pointer; }
    .lightbox-prev { left: 0.5rem; }
    .lightbox-next { right: 0.5rem; }
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    .products-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .why-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .why-grid > div:nth-child(2n) { border-right: none !important; }
    .pricing-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .testi-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .contact-grid { gap: 3rem !important; }
    .steps-grid { grid-template-columns: 1fr !important; }
    .steps-grid > div { border-right: none !important; border-bottom: 1px solid var(--cream3) !important; }
  }

  @media (min-width: 768px) {
    .mobile-btn { display: none !important; }
  }
`;

function Toast({ message, onDone }) {
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), 4200);
    const t2 = setTimeout(() => onDone(), 4600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <div className={`toast${leaving ? ' leaving' : ''}`}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(64,145,108,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <WAIcon s={15} style={{ color: '#4ade80' }} />
        </div>
        <div>
          <div className="toast-title">{message.title}</div>
          <div className="toast-body">{message.body}</div>
        </div>
      </div>
    </div>
  );
}

function Lightbox({ images, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  const prev = useCallback(() => setIdx(i => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIdx(i => (i + 1) % images.length), [images.length]);
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [prev, next, onClose]);
  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <img key={idx} src={images[idx]} alt={`Gallery ${idx + 1}`} className="lightbox-img" onClick={e => e.stopPropagation()} />
      <button className="lightbox-close" onClick={onClose}>×</button>
      <button className="lightbox-nav lightbox-prev" onClick={e => { e.stopPropagation(); prev(); }}>‹</button>
      <button className="lightbox-nav lightbox-next" onClick={e => { e.stopPropagation(); next(); }}>›</button>
      <div className="lightbox-counter">{idx + 1} / {images.length}</div>
    </div>
  );
}

function StickyWA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <a href={wa(MSG.float)} target="_blank" rel="noopener noreferrer"
      className="wa-sticky"
      style={{ opacity: show ? 1 : 0, transform: show ? 'scale(1)' : 'scale(0.7)', pointerEvents: show ? 'auto' : 'none', transition: 'opacity 0.3s, transform 0.4s var(--ease-spring), background 0.2s, box-shadow 0.2s' }}>
      <span className="wa-sticky-label">ORDER NOW</span>
      <WAIcon s={26} />
    </a>
  );
}

function useTyped(words, speed = 90, pause = 2200) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIdx];
    let timer;
    if (!deleting && charIdx < current.length) {
      timer = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timer = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timer = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);
  return display;
}

function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [hover, setHover] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef(null);
  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current) { dot.current.style.left = e.clientX + 'px'; dot.current.style.top = e.clientY + 'px'; }
    };
    let rx = 0, ry = 0;
    const loop = () => {
      rx += (pos.current.x - rx) * 0.12;
      ry += (pos.current.y - ry) * 0.12;
      if (ring.current) { ring.current.style.left = rx + 'px'; ring.current.style.top = ry + 'px'; }
      raf.current = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener('mousemove', move);
    const over = (e) => { if (e.target.closest('a,button,.gallery-item')) setHover(true); };
    const out = () => setHover(false);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
      cancelAnimationFrame(raf.current);
    };
  }, []);
  return (
    <div className={hover ? 'c-hover' : ''}>
      <div ref={dot} className="c-dot" />
      <div ref={ring} className="c-ring" />
    </div>
  );
}

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const c = () => setM(window.innerWidth < 768);
    c(); window.addEventListener('resize', c, { passive: true });
    return () => window.removeEventListener('resize', c);
  }, []);
  return m;
}

function useCounter(target, visible, duration = 2200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target, duration]);
  return count;
}

const PhoneIcon = ({ s = 18 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>;
const WAIcon = ({ s = 18 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>;
const MapPin = ({ s = 16 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>;
const TruckIcon = ({ s = 18 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>;
const Star = ({ s = 13, filled = true }) => <svg width={s} height={s} viewBox="0 0 24 24" fill={filled ? "var(--gold2)" : "none"} stroke="var(--gold2)" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
const ArrowRight = ({ s = 14 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>;
const ArrowUpRight = ({ s = 14 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>;
const MenuIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="17" x2="15" y2="17" /></svg>;
const XIcon = ({ s = 24 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
const ChevDown = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>;
const ChevUp = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><polyline points="18 15 12 9 6 15" /></svg>;
const CheckIcon = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>;
const AlertIcon = () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>;
const FacebookIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>;
const TikTokIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 106.34 6.34V8.69a8.18 8.18 0 004.79 1.54V6.78a4.85 4.85 0 01-1.02-.09z" /></svg>;
const ZoomIcon = ({ s = 18 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>;

const PRODUCTS = [
  { name: "Yellow Stones", cat: "stones", desc: "Premium yellow quarry stones — warm-toned, strong and highly sought after for walling, foundations and feature finishes. Sourced fresh from our quarry.", img: "/product-yellowstones.jpg", tag: "BEST SELLER", price: "KES 8,000+", unit: "/truck" },
  { name: "Bush Stones", cat: "stones", desc: "Natural bush stones ideal for rustic walling, perimeter fencing and heavy-duty foundations. Durable, affordable and delivered in bulk loads.", img: "/product-bushstones.jpg", tag: "POPULAR", price: "KES 7,500+", unit: "/truck" },
  { name: "Ballast", cat: "sand", desc: "Clean, well-graded ballast for structural concrete. Consistently graded for reliable strength, every pour.", img: "/product-ballast.jpg", tag: "", price: "KES 7,500+", unit: "/truck" },
  { name: "Machine Cut Stones", cat: "stones", desc: "Laser-precise cuts for flawless, clean walls. Perfect uniformity for residential and premium commercial builds.", img: "/product-machinecut.jpg", tag: "", price: "KES 12,000+", unit: "/truck" },
  { name: "Foundation Stones", cat: "stones", desc: "Heavy-duty stones engineered for deep foundations and load-bearing structures. The backbone of every solid build — sourced direct from Ndarugo.", img: "/product-foundationstones.jpg", tag: "NEW", price: "KES 9,000+", unit: "/truck" },
  { name: "River Sand", cat: "sand", desc: "Fine, clean river sand for plastering, block-making and concrete. Sourced fresh, delivered direct to site.", img: "/product-sand.jpg", tag: "", price: "KES 6,500+", unit: "/truck" },
];

const TESTIMONIALS = [
  { name: "James Mwangi", role: "Civil Contractor, Ruiru", text: "Nimekuwa nikitumia Brayo wa Ndarugo kwa miaka miwili. Delivery ni haraka sana na mawe ni ya kweli ya ubora.", stars: 5 },
  { name: "Eng. Patricia Wanjiku", role: "Site Engineer, Juja", text: "The ballast and aggregates are consistently graded. I've recommended this supplier to three different developers this year alone.", stars: 5 },
  { name: "Samuel Kariuki", role: "Home Builder, Kiambu", text: "Nilipigia simu na bei ilikuwa nzuri kuliko wengine. Walidelivery siku moja. Nitaendelea kutumia Bravo tu.", stars: 5 },
  { name: "David Njoroge", role: "Developer, Thika Road", text: "Best supplier I've worked with in 10 years of construction. Always on time, quality consistent, very responsive on WhatsApp.", stars: 5 },
];

const FAQS = [
  { q: "Do you offer same-day delivery?", a: "Yes! Same-day delivery within Nairobi, Kiambu, Ruiru, and Juja for orders placed before 10:00 AM. Delivery slots fill up fast — call early to secure yours." },
  { q: "What is the minimum order?", a: "Minimum order is 1 truck load. We serve small homebuilders and large contractors alike with equal care." },
  { q: "Which areas do you deliver to?", a: "We deliver across Nairobi, Kiambu, Ruiru, Juja, Thika, Githurai, Kahawa, Limuru and surrounding areas." },
  { q: "How do I place an order?", a: "Click 'Order via WhatsApp' or call us directly. Tell us what you need, your location, and quantity — we give a transparent quote and confirm delivery within the hour." },
  { q: "Do you offer bulk discounts?", a: "Absolutely. Contractors and developers ordering 3+ trucks receive preferential rates. Ask us for a bulk quotation." },
  { q: "What payment methods do you accept?", a: "We accept M-Pesa, bank transfer, and cash on delivery for your convenience." },
];

const AREAS = ["Nairobi", "Kiambu", "Ruiru", "Juja", "Thika", "Githurai", "Kahawa", "Limuru"];

const PRICING = [
  { item: "Yellow Stones", price: "From KES 8,000", unit: "per truck", pop: false },
  { item: "Bush Stones", price: "From KES 7,500", unit: "per truck", pop: false },
  { item: "Ballast", price: "From KES 7,500", unit: "per truck", pop: true },
  { item: "Machine Cut Stones", price: "From KES 12,000", unit: "per truck", pop: false },
  { item: "Foundation Stones", price: "From KES 9,000", unit: "per truck", pop: false },
  { item: "River Sand", price: "From KES 6,500", unit: "per truck", pop: false },
];

const GALLERY = [
  { src: "/gallery-1.jpg", label: "Our Delivery Fleet", tag: "FLEET" },
  { src: "/gallery-2.jpg", label: "Site Delivery", tag: "DELIVERY" },
  { src: "/gallery-3.jpg", label: "Quarry Stockpile", tag: "QUARRY" },
  { src: "/gallery-4.jpg", label: "Finished Home", tag: "RESULT" },
  { src: "/gallery-5.jpg", label: "Night Operations", tag: "24/7" },
  { src: "/product-yellowstones.jpg", label: "Yellow Stones", tag: "MATERIAL" },
];

const CATS = [
  { key: "all", label: "All Materials" },
  { key: "stones", label: "Stones" },
  { key: "sand", label: "Sand & Ballast" },
];

function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let ticking = false;
    const fn = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const h = document.documentElement;
          setPct((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '2px', zIndex: 9997, background: 'rgba(196,154,42,0.15)' }}>
      <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, var(--ember), var(--gold), var(--gold3))', transition: 'width 0.06s linear', boxShadow: '0 0 8px rgba(196,154,42,0.5)' }} />
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    let ticking = false;
    const fn = () => {
      if (!ticking) {
        requestAnimationFrame(() => { setScrolled(window.scrollY > 50); ticking = false; });
        ticking = true;
      }
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const links = ['Products', 'Pricing', 'Delivery', 'Gallery', 'Contact'];
  return (
    <>
      <nav style={{ position: 'fixed', top: 2, left: 0, right: 0, zIndex: 500, background: scrolled ? 'rgba(247,243,236,0.96)' : 'transparent', backdropFilter: scrolled ? 'blur(24px) saturate(1.5)' : 'none', borderBottom: scrolled ? '1px solid var(--cream3)' : 'none', transition: 'all 0.4s var(--ease-smooth)', padding: scrolled ? '0.8rem 0' : '1.4rem 0', boxShadow: scrolled ? '0 1px 30px rgba(15,12,8,0.07)' : 'none', height: 'var(--nav-h)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ position: 'relative', width: '40px', height: '40px', flexShrink: 0 }}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--gold)', transform: 'rotate(45deg)', borderRadius: '4px' }} />
              <div style={{ position: 'absolute', inset: '5px', background: 'var(--ink)', transform: 'rotate(45deg)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ transform: 'rotate(-45deg)', color: 'var(--gold)' }}><TruckIcon s={14} /></div>
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--ink)', lineHeight: 1.1 }}>Brayo <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>wa</em> Ndarugo</div>
              <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink5)', fontSize: '0.52rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '2px' }}>Building Materials · Kiambu</div>
            </div>
          </a>
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ color: 'var(--ink4)', textDecoration: 'none', fontFamily: 'var(--font-sans)', fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.04em', padding: '0.5rem 1rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'var(--ink4)'}>{l}</a>
            ))}
          </div>
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a href={wa(MSG.float)} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--ink)', color: 'var(--gold)', fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '0.7rem', letterSpacing: '0.1em', padding: '0.65rem 1.4rem', textDecoration: 'none', transition: 'all 0.25s', border: '1px solid var(--ink)', borderRadius: '2px' }} onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor = 'var(--gold)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--ink)'; }}><WAIcon s={13} /> ORDER NOW</a>
            <a href={`tel:${PHONE}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--cream3)', color: 'var(--ink3)', fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '0.7rem', letterSpacing: '0.06em', padding: '0.65rem 1.1rem', textDecoration: 'none', transition: 'all 0.2s', borderRadius: '2px' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--cream3)'; e.currentTarget.style.color = 'var(--ink3)'; }}><PhoneIcon s={13} /> {PHONE}</a>
          </div>
          <button className="mobile-btn" onClick={() => setMenuOpen(o => !o)} style={{ background: 'none', border: '1px solid var(--cream3)', color: 'var(--ink)', display: 'none', padding: '0.5rem', borderRadius: '2px' }}>
            {menuOpen ? <XIcon s={22} /> : <MenuIcon />}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 490, background: 'var(--cream)', display: 'flex', flexDirection: 'column', padding: '2rem', animation: 'fadeIn 0.2s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--ink)' }}>Brayo <em style={{ color: 'var(--gold)' }}>wa</em> Ndarugo</div>
            <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--ink4)' }}><XIcon s={26} /></button>
          </div>
          {links.map((l, i) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)', textDecoration: 'none', fontSize: '2.75rem', fontWeight: 700, padding: '0.35rem 0', lineHeight: 1.2, animation: `fadeUp 0.4s ease ${i * 60}ms both`, borderBottom: '1px solid var(--cream3)' }}>{l}</a>
          ))}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '3rem' }}>
            <a href={wa(MSG.float)} target="_blank" rel="noopener noreferrer" style={{ flex: 1, background: 'var(--ink)', color: 'var(--gold)', fontFamily: 'var(--font-mono)', fontWeight: 500, padding: '1rem', textDecoration: 'none', display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', letterSpacing: '0.08em', borderRadius: '2px' }}><WAIcon s={15} /> WHATSAPP</a>
            <a href={`tel:${PHONE}`} style={{ flex: 1, border: '1px solid var(--ink)', color: 'var(--ink)', fontFamily: 'var(--font-mono)', fontWeight: 500, padding: '1rem', textDecoration: 'none', display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', letterSpacing: '0.08em', borderRadius: '2px' }}><PhoneIcon s={15} /> CALL</a>
          </div>
        </div>
      )}
    </>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  const typedWords = ['Yellow Stones', 'Same-Day Delivery', 'Direct Quarry Prices', 'Trusted by Kenya'];
  const typed = useTyped(typedWords, 85, 2000);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t); }, []);
  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--cream)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <img src="/product-foundationstones.jpg" alt="" loading="eager" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%', opacity: 0.07, filter: 'saturate(0) contrast(1.3)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(196,154,42,0.08), transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(247,243,236,0) 0%, rgba(247,243,236,0) 60%, rgba(247,243,236,1) 100%)' }} />
      </div>
      <div style={{ position: 'absolute', right: '8%', top: '18%', width: '420px', height: '420px', borderRadius: '50%', border: '1px solid rgba(196,154,42,0.15)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: '11%', top: '22%', width: '320px', height: '320px', borderRadius: '50%', border: '1px solid rgba(196,154,42,0.1)', pointerEvents: 'none' }} />
      <div className="hero-image-panel" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '40%', overflow: 'hidden', clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 0 100%)' }}>
        <img src="/product-yellowstones.jpg" loading="eager" alt="Ndarugo stones" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.7) contrast(1.1)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--cream) 0%, transparent 40%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,12,8,0.25)' }} />
        <div style={{ position: 'absolute', bottom: '15%', right: '8%', background: 'var(--ink2)', padding: '1.25rem 1.5rem', border: '1px solid rgba(196,154,42,0.25)', animation: loaded ? 'scaleIn 0.8s var(--ease-spring) 1s both' : 'none' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.8rem', color: 'var(--gold)', lineHeight: 1 }}>500+</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', marginTop: '4px', textTransform: 'uppercase' }}>Deliveries Done</div>
        </div>
      </div>
      <div className="hero-number" style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%) rotate(-90deg)', transformOrigin: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.3em', color: 'var(--ink5)', textTransform: 'uppercase', whiteSpace: 'nowrap', opacity: 0.6 }}>Ndarugo · Kiambu · Est. Kenya</div>
      <div className="hero-content" style={{ position: 'relative', zIndex: 10, flex: 1, maxWidth: '1280px', margin: '0 auto', padding: '9rem 2.5rem 4rem 4rem', width: '100%' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', marginBottom: '2rem', opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(12px)', transition: 'all 0.6s ease 0.1s' }}>
          <div style={{ width: '7px', height: '7px', background: '#ef4444', borderRadius: '50%', animation: 'pulse 2s infinite', boxShadow: '0 0 12px rgba(239,68,68,0.6)', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '0.63rem', letterSpacing: '0.18em', color: 'var(--ink4)', textTransform: 'uppercase' }}>Live · Limited Slots Today</span>
          <div style={{ width: '24px', height: '1px', background: 'var(--gold)', opacity: 0.5, flexShrink: 0 }} />
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ overflow: 'hidden' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 900, fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 0.95, color: 'var(--ink)', letterSpacing: '-0.02em', opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(100%)', transition: 'all 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s' }}>Ndarugo</h1>
          </div>
          <div style={{ overflow: 'hidden', minHeight: 'clamp(2.5rem,7vw,6.5rem)', display: 'flex', alignItems: 'center' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(2.5rem, 7vw, 6.5rem)', lineHeight: 0.95, color: 'var(--gold)', letterSpacing: '-0.02em', opacity: loaded ? 1 : 0, transition: 'all 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s', whiteSpace: 'nowrap' }}>
              {typed}<span className="typed-cursor" style={{ color: 'var(--gold3)', marginLeft: '2px', fontWeight: 300 }}>|</span>
            </h1>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 900, fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 0.95, color: 'var(--ink)', letterSpacing: '-0.02em', opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(100%)', transition: 'all 0.9s cubic-bezier(0.22,1,0.36,1) 0.4s' }}>Delivered.</h1>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem', opacity: loaded ? 1 : 0, transition: 'all 0.7s ease 0.55s', flexWrap: 'wrap' }}>
          <div style={{ width: '60px', height: '1px', background: 'var(--gold)', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--ink5)', textTransform: 'uppercase' }}>Delivered same day · Nairobi &amp; Kiambu</span>
        </div>
        <p style={{ fontSize: '0.95rem', color: 'var(--ink4)', maxWidth: '400px', lineHeight: 1.8, marginBottom: '2.75rem', fontWeight: 300, opacity: loaded ? 1 : 0, transition: 'all 0.7s ease 0.65s' }}>Kenya's fastest-growing building materials supplier. Fresh from the quarry, delivered straight to your construction site.</p>
        <div className="hero-ctas" style={{ display: 'flex', gap: '1rem', alignItems: 'center', opacity: loaded ? 1 : 0, transition: 'all 0.7s ease 0.75s', flexWrap: 'wrap' }}>
          <a href={wa(MSG.hero)} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', background: 'var(--ink)', color: 'var(--gold)', fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '0.75rem', letterSpacing: '0.12em', padding: '1.1rem 2.25rem', textDecoration: 'none', transition: 'all 0.3s var(--ease-smooth)', border: '1px solid var(--ink)', borderRadius: '2px', boxShadow: '4px 4px 0 var(--gold)' }} onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.boxShadow = '2px 2px 0 var(--ink)'; e.currentTarget.style.transform = 'translate(2px,2px)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--ink)'; e.currentTarget.style.boxShadow = '4px 4px 0 var(--gold)'; e.currentTarget.style.transform = 'none'; }}><WAIcon s={15} /> ORDER VIA WHATSAPP</a>
          <a href={`tel:${PHONE}`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', border: '1px solid var(--cream3)', color: 'var(--ink3)', fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '0.75rem', letterSpacing: '0.08em', padding: '1.1rem 1.75rem', textDecoration: 'none', transition: 'all 0.25s', borderRadius: '2px', background: 'var(--white)' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--cream3)'; e.currentTarget.style.color = 'var(--ink3)'; }}><PhoneIcon s={15} /> CALL NOW</a>
        </div>
        <div className="hero-trust" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '3rem', opacity: loaded ? 1 : 0, transition: 'all 0.7s ease 0.85s' }}>
          {['No Hidden Charges', '500+ Deliveries', 'Bulk Discounts', 'M-Pesa Accepted'].map(t => (
            <span key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--ink5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              <span style={{ color: 'var(--gold)', fontSize: '0.5rem' }}>◈</span> {t}
            </span>
          ))}
        </div>
      </div>
      <HeroStats loaded={loaded} />
    </section>
  );
}

function StatItem({ target, suffix, label }) {
  const [ref, visible] = useInView(0.3);
  const count = useCounter(target, visible);
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '1.75rem 1rem', flex: 1, borderRight: '1px solid var(--cream3)' }}>
      <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 900, fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)', color: 'var(--ink)', lineHeight: 1, animation: visible ? 'countUp 0.6s ease both' : 'none' }}>
        {count}<span style={{ color: 'var(--gold)' }}>{suffix}</span>
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink5)', fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '0.4rem' }}>{label}</div>
    </div>
  );
}

function HeroStats({ loaded }) {
  return (
    <div className="stats-row" style={{ position: 'relative', zIndex: 10, borderTop: '1px solid var(--cream3)', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease 1s', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
      <StatItem target={500} suffix="+" label="Deliveries Done" />
      <StatItem target={100} suffix="+" label="Contractors Served" />
      <StatItem target={8} suffix="" label="Areas Covered" />
      <StatItem target={5} suffix="★" label="Average Rating" />
    </div>
  );
}

function ProductCard({ p, i }) {
  const [ref, visible] = useInView();
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position: 'relative', background: 'var(--white)', border: `1px solid ${hov ? 'var(--gold)' : 'var(--cream3)'}`, overflow: 'hidden', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 0.6s var(--ease-smooth) ${i * 70}ms, transform 0.6s var(--ease-smooth) ${i * 70}ms, border-color 0.25s`, boxShadow: hov ? '0 12px 40px rgba(15,12,8,0.1), 4px 4px 0 var(--gold)' : '0 2px 8px rgba(15,12,8,0.04)' }}>
      <div style={{ position: 'relative', height: '230px', overflow: 'hidden' }}>
        <img loading="lazy" src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hov ? 'scale(1.07)' : 'scale(1)', transition: 'transform 0.7s var(--ease-smooth)', filter: 'saturate(0.8) contrast(1.05)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,12,8,0.65) 0%, rgba(15,12,8,0.1) 50%, transparent 100%)' }} />
        {p.tag && <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--gold)', color: 'var(--ink)', fontFamily: 'var(--font-mono)', fontSize: '0.55rem', fontWeight: 500, letterSpacing: '0.2em', padding: '0.35rem 0.75rem', textTransform: 'uppercase' }}>{p.tag}</div>}
        <div style={{ position: 'absolute', bottom: '1rem', left: '1.25rem' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.6rem', color: 'var(--white)', lineHeight: 1 }}>{p.price}</div>
          <div style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.55)', fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{p.unit}</div>
        </div>
      </div>
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '0.65rem', lineHeight: 1.2 }}>{p.name}</h3>
        <p style={{ color: 'var(--ink4)', fontSize: '0.82rem', lineHeight: 1.7, marginBottom: '1.4rem', fontWeight: 300 }}>{p.desc}</p>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <a href={wa(MSG.product(p.name))} target="_blank" rel="noopener noreferrer"
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--cream3)', color: 'var(--ink3)', fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '0.68rem', letterSpacing: '0.1em', padding: '0.75rem 1rem', textDecoration: 'none', transition: 'all 0.2s', borderRadius: '2px' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor = 'var(--gold)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink3)'; e.currentTarget.style.borderColor = 'var(--cream3)'; }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><WAIcon s={12} /> GET QUOTE</span>
            <ArrowUpRight s={12} />
          </a>
          <a href={`tel:${PHONE}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--cream3)', color: 'var(--ink4)', padding: '0.75rem 0.85rem', textDecoration: 'none', transition: 'all 0.2s', borderRadius: '2px' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--cream3)'; e.currentTarget.style.color = 'var(--ink4)'; }}><PhoneIcon s={13} /></a>
        </div>
      </div>
    </div>
  );
}

function Products() {
  const [cat, setCat] = useState('all');
  const filtered = useMemo(() => cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat), [cat]);
  return (
    <section id="products" className="clip-top-right" style={{ padding: '6rem 0', background: 'var(--cream2)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: '-100px', top: '10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,154,42,0.06), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="products-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}>
          <div>
            <div className="section-label">Our Products</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 900, fontSize: 'clamp(2.2rem, 5.5vw, 5rem)', color: 'var(--ink)', lineHeight: 0.92, letterSpacing: '-0.02em' }}>Premium<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Building</em><br />Materials</h2>
          </div>
          <p style={{ color: 'var(--ink4)', fontSize: '0.9rem', maxWidth: '320px', lineHeight: 1.8, fontWeight: 300 }}>Sourced fresh from Ndarugo quarry, delivered across Nairobi and Kiambu County.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {CATS.map(c => (
            <button key={c.key} onClick={() => setCat(c.key)} style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.55rem 1.25rem', border: `1px solid ${cat === c.key ? 'var(--gold)' : 'var(--cream3)'}`, background: cat === c.key ? 'var(--gold)' : 'var(--white)', color: cat === c.key ? 'var(--ink)' : 'var(--ink4)', transition: 'all 0.2s', borderRadius: '2px', cursor: 'pointer' }}>{c.label}</button>
          ))}
        </div>
        <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {filtered.map((p, i) => <ProductCard key={p.name} p={p} i={i} />)}
        </div>
        <div style={{ marginTop: '3.5rem', textAlign: 'center' }}>
          <a href={wa(MSG.all)} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', border: '1px solid var(--ink)', color: 'var(--ink)', fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.12em', padding: '1rem 2.25rem', textDecoration: 'none', transition: 'all 0.25s', background: 'var(--white)', borderRadius: '2px', boxShadow: '3px 3px 0 var(--gold)' }} onMouseEnter={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.boxShadow = '1px 1px 0 var(--gold)'; e.currentTarget.style.transform = 'translate(2px,2px)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.boxShadow = '3px 3px 0 var(--gold)'; e.currentTarget.style.transform = 'none'; }}><WAIcon s={15} /> Get Full Price List on WhatsApp <ArrowRight s={13} /></a>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const [ref, visible] = useInView();
  const items = [
    { num: '01', title: 'Same-Day Delivery', desc: '6 AM–6 PM, 7 days a week. Get materials on-site today — no delays, no excuses.' },
    { num: '02', title: 'Direct Quarry Prices', desc: 'No middlemen. Quarry-to-site rates. Save thousands on every order.' },
    { num: '03', title: '500+ Deliveries Done', desc: 'The fastest-growing supplier in Kiambu. Trusted by engineers, contractors and homebuilders alike.' },
    { num: '04', title: 'Premium Quality', desc: 'All materials freshly sourced, correctly graded, Kenya construction standard compliant.' },
    { num: '05', title: 'Wide Coverage', desc: 'Nairobi, Kiambu, Juja, Thika, Ruiru, Githurai, Limuru and beyond. We come to you.' },
    { num: '06', title: 'Night Operations', desc: "We load through the night so your site is never waiting. Materials ready when you need them — even at dawn." },
  ];
  return (
    <section className="clip-top-left" style={{ padding: '6rem 0', background: 'var(--ink)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
      <div style={{ position: 'absolute', right: '-80px', top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--font-serif)', fontWeight: 900, fontSize: 'clamp(8rem, 20vw, 18rem)', color: 'rgba(255,255,255,0.025)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.03em' }}>WHY</div>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
        <div style={{ marginBottom: '4rem' }}>
          <div className="section-label" style={{ color: 'var(--gold)' }}>Why Choose Us</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 900, fontSize: 'clamp(2.2rem, 5.5vw, 5rem)', color: 'var(--white)', lineHeight: 0.92, letterSpacing: '-0.02em' }}>Kenya's Most<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Trusted</em> Supplier</h2>
        </div>
        <div ref={ref} className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', border: '1px solid rgba(255,255,255,0.07)' }}>
          {items.map((it, i) => (
            <div key={it.num} style={{ padding: '2.5rem', borderRight: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.6s var(--ease-smooth) ${i * 80}ms`, cursor: 'default' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(196,154,42,0.07)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--gold)', letterSpacing: '0.2em', marginBottom: '1.25rem', opacity: 0.7 }}>{it.num}</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--white)', marginBottom: '0.75rem', lineHeight: 1.3 }}>{it.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.82rem', lineHeight: 1.8, fontWeight: 300 }}>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const [ref, visible] = useInView();
  const steps = [
    { n: '01', title: 'Contact Us', desc: 'WhatsApp or call us with what you need, your location, and quantity. We respond in minutes — not hours.' },
    { n: '02', title: 'Get a Clear Quote', desc: 'Transparent pricing, no hidden charges. Bulk discounts available. Quote guaranteed same-day.' },
    { n: '03', title: 'Delivered Today', desc: 'Our trucks head straight to your site — fast, professional, on time, every time.' },
  ];
  return (
    <section className="clip-top-right" style={{ padding: '6rem 0', background: 'var(--cream)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="section-label">Process</div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 900, fontSize: 'clamp(2.2rem, 5.5vw, 5rem)', color: 'var(--ink)', lineHeight: 0.92, letterSpacing: '-0.02em', marginBottom: '4rem' }}>Order in<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>3 steps</em></h2>
        <div ref={ref} className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', border: '1px solid var(--cream3)' }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{ padding: '3rem 2.5rem', borderRight: i < 2 ? '1px solid var(--cream3)' : 'none', position: 'relative', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(25px)', transition: `all 0.7s var(--ease-smooth) ${i * 140}ms`, background: 'var(--white)' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--gold-pale)'} onMouseLeave={e => e.currentTarget.style.background = 'var(--white)'}>
              <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 900, fontSize: 'clamp(3rem,6vw,5rem)', color: 'var(--cream3)', lineHeight: 1, marginBottom: '1.25rem', letterSpacing: '-0.03em' }}>{s.n}</div>
              <div style={{ width: '32px', height: '2px', background: 'var(--gold)', marginBottom: '1.25rem' }} />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '0.85rem', lineHeight: 1.3 }}>{s.title}</h3>
              <p style={{ color: 'var(--ink4)', fontSize: '0.85rem', lineHeight: 1.8, fontWeight: 300 }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '4rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <a href={wa(MSG.hero)} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'var(--ink)', color: 'var(--gold)', fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.1em', padding: '1rem 2rem', textDecoration: 'none', transition: 'all 0.25s', borderRadius: '2px', border: '1px solid var(--ink)', boxShadow: '3px 3px 0 var(--gold)' }} onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.transform = 'translate(2px,2px)'; e.currentTarget.style.boxShadow = '1px 1px 0 var(--ink)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '3px 3px 0 var(--gold)'; }}><WAIcon s={14} /> Get Quote on WhatsApp</a>
          <a href={`tel:${PHONE}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', border: '1px solid var(--cream3)', color: 'var(--ink4)', fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.08em', padding: '1rem 1.75rem', textDecoration: 'none', transition: 'all 0.2s', background: 'var(--white)', borderRadius: '2px' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--cream3)'; e.currentTarget.style.color = 'var(--ink4)'; }}><PhoneIcon s={14} /> {PHONE}</a>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const [ref, visible] = useInView();
  return (
    <section id="pricing" className="clip-top-left" style={{ padding: '6rem 0', background: 'var(--cream2)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="pricing-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
          <div>
            <div className="section-label">Pricing Guide</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 900, fontSize: 'clamp(2.2rem, 5.5vw, 5rem)', color: 'var(--ink)', lineHeight: 0.92, letterSpacing: '-0.02em' }}>Transparent<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Pricing</em></h2>
          </div>
          <p style={{ color: 'var(--ink4)', fontSize: '0.82rem', maxWidth: '260px', lineHeight: 1.8, fontWeight: 300 }}>Per standard truck load. WhatsApp for your exact location-based quote.</p>
        </div>
        <div ref={ref} className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--cream3)' }}>
          {PRICING.map((p, i) => (
            <div key={p.item} style={{ background: p.pop ? 'var(--ink)' : 'var(--white)', padding: '2.5rem 2rem', position: 'relative', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.55s var(--ease-smooth) ${i * 70}ms` }} onMouseEnter={e => e.currentTarget.style.background = p.pop ? 'var(--ink2)' : 'var(--gold-pale)'} onMouseLeave={e => e.currentTarget.style.background = p.pop ? 'var(--ink)' : 'var(--white)'}>
              {p.pop && <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>★ Most Ordered</div>}
              <div style={{ fontFamily: 'var(--font-mono)', color: p.pop ? 'rgba(255,255,255,0.35)' : 'var(--ink5)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{p.item}</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 900, fontSize: 'clamp(1.5rem,3vw,2.2rem)', color: p.pop ? 'var(--white)' : 'var(--ink)', lineHeight: 1, marginBottom: '0.25rem' }}>{p.price}</div>
              <div style={{ fontFamily: 'var(--font-mono)', color: p.pop ? 'rgba(255,255,255,0.3)' : 'var(--ink5)', fontSize: '0.65rem', marginBottom: '1.75rem' }}>{p.unit}</div>
              <a href={wa(MSG.price(p.item))} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', border: `1px solid ${p.pop ? 'rgba(196,154,42,0.4)' : 'var(--cream3)'}`, color: p.pop ? 'var(--gold)' : 'var(--ink4)', fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '0.62rem', letterSpacing: '0.1em', padding: '0.55rem 0.9rem', textDecoration: 'none', transition: 'all 0.2s', borderRadius: '2px' }} onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor = 'var(--gold)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = p.pop ? 'var(--gold)' : 'var(--ink4)'; e.currentTarget.style.borderColor = p.pop ? 'rgba(196,154,42,0.4)' : 'var(--cream3)'; }}><WAIcon s={11} /> Get Exact Price</a>
            </div>
          ))}
        </div>
        <p style={{ marginTop: '1.25rem', fontFamily: 'var(--font-mono)', color: 'var(--ink5)', fontSize: '0.6rem', letterSpacing: '0.08em' }}>* Prices vary by location and quantity. Bulk discounts for contractors ordering 3+ trucks.</p>
      </div>
    </section>
  );
}

function Delivery() {
  const [ref, visible] = useInView();
  return (
    <section id="delivery" className="clip-top-right" style={{ padding: '6rem 0', background: 'var(--white)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="section-label">Delivery Areas</div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 900, fontSize: 'clamp(2.2rem, 5.5vw, 5rem)', color: 'var(--ink)', lineHeight: 0.92, letterSpacing: '-0.02em', marginBottom: '3rem' }}>We Deliver<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Near You</em></h2>
        <div ref={ref} style={{ display: 'flex', flexWrap: 'wrap', gap: '0', marginBottom: '3rem', border: '1px solid var(--cream3)' }}>
          {AREAS.map((a, i) => (
            <div key={a} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '1.1rem 1.5rem', borderRight: '1px solid var(--cream3)', borderBottom: '1px solid var(--cream3)', opacity: visible ? 1 : 0, transform: visible ? 'scale(1)' : 'scale(0.92)', transition: `all 0.4s var(--ease-spring) ${i * 55}ms`, background: 'var(--white)' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--gold-pale)'} onMouseLeave={e => e.currentTarget.style.background = 'var(--white)'}>
              <span style={{ color: 'var(--gold)', opacity: 0.7 }}><MapPin s={13} /></span>
              <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1rem', color: 'var(--ink)' }}>{a}</span>
            </div>
          ))}
        </div>
        <div className="delivery-boxes" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--cream3)' }}>
          <div style={{ background: 'var(--cream)', padding: '2.5rem' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.4rem', color: 'var(--ink)', marginBottom: '0.75rem' }}>Not in the list?</div>
            <p style={{ color: 'var(--ink4)', fontSize: '0.87rem', lineHeight: 1.8, marginBottom: '1.75rem', fontWeight: 300 }}>We cover more areas than listed. Just ask — we'll make it work for your location and project.</p>
            <a href={wa(MSG.delivery)} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--sage)', color: 'var(--white)', fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '0.7rem', letterSpacing: '0.1em', padding: '0.9rem 1.5rem', textDecoration: 'none', transition: 'all 0.2s', borderRadius: '2px' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--sage2)'} onMouseLeave={e => e.currentTarget.style.background = 'var(--sage)'}><WAIcon s={14} /> Ask via WhatsApp</a>
          </div>
          <div style={{ background: 'var(--ink)', padding: '2.5rem' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.4rem', color: 'var(--white)', marginBottom: '0.75rem' }}>Same-Day Delivery</div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.87rem', lineHeight: 1.8, fontWeight: 300 }}>Orders before <strong style={{ color: 'var(--gold)' }}>10:00 AM</strong> qualify for same-day delivery within Nairobi, Kiambu, Ruiru &amp; Juja. Operating <strong style={{ color: 'var(--white)' }}>6 AM – 6 PM, 7 days a week.</strong></p>
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryItem({ item, index, onClick, style }) {
  const [hov, setHov] = useState(false);
  return (
    <div className="gallery-item" onClick={() => onClick(index)} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ position: 'relative', overflow: 'hidden', background: 'var(--ink)', cursor: 'zoom-in', ...style }}>
      <img loading="lazy" src={item.src} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hov ? 'scale(1.08)' : 'scale(1)', transition: 'transform 0.9s cubic-bezier(0.22,1,0.36,1)', filter: hov ? 'saturate(1) brightness(0.5)' : 'saturate(0.65) brightness(0.8)', willChange: 'transform' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,8,5,0.88) 0%, rgba(10,8,5,0.12) 45%, transparent 75%)', opacity: hov ? 0.6 : 1, transition: 'opacity 0.4s', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '0.85rem', left: '0.85rem', fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', background: 'rgba(10,8,5,0.6)', backdropFilter: 'blur(6px)', border: '1px solid rgba(196,154,42,0.35)', padding: '0.28rem 0.65rem', pointerEvents: 'none', opacity: hov ? 1 : 0.75, transition: 'opacity 0.3s' }}>{item.tag}</div>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: hov ? 1 : 0, transition: 'opacity 0.3s', pointerEvents: 'none' }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(196,154,42,0.18)', border: '1px solid rgba(196,154,42,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--white)', transform: hov ? 'scale(1)' : 'scale(0.7)', transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}><ZoomIcon s={22} /></div>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.1rem 1rem 0.9rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', pointerEvents: 'none' }}>
        <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--white)', transform: hov ? 'translateY(-3px)' : 'translateY(0)', transition: 'transform 0.4s', display: 'inline-block' }}>{item.label}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em' }}>{String(index + 1).padStart(2, '0')}</span>
      </div>
    </div>
  );
}

function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [ref, visible] = useInView(0.08);
  const gridItems = [
    { gridColumn: '1 / 3', gridRow: '1', aspectRatio: '16/10' },
    { gridColumn: '3',     gridRow: '1', aspectRatio: '3/4'   },
    { gridColumn: '4',     gridRow: '1', aspectRatio: '3/4'   },
    { gridColumn: '1',     gridRow: '2', aspectRatio: '4/3'   },
    { gridColumn: '2 / 4', gridRow: '2', aspectRatio: '16/9'  },
    { gridColumn: '4',     gridRow: '2', aspectRatio: '4/3'   },
  ];
  return (
    <section id="gallery" className="clip-top-left" style={{ padding: '6rem 0', background: 'var(--cream2)' }}>
      {lightboxIdx !== null && <Lightbox images={GALLERY.map(g => g.src)} startIndex={lightboxIdx} onClose={() => setLightboxIdx(null)} />}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="gallery-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.75rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div className="section-label">Gallery</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 900, fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', color: 'var(--ink)', lineHeight: 0.92, letterSpacing: '-0.02em' }}>Fleet, Quarry<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>&amp; Delivery Sites</em></h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
            <p style={{ color: 'var(--ink5)', fontSize: '0.8rem', lineHeight: 1.7, fontWeight: 300, textAlign: 'right', maxWidth: '220px' }}>Real materials, real deliveries, real results across Nairobi &amp; Kiambu.</p>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--gold)', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ width: 16, height: 1, background: 'var(--gold)', display: 'inline-block' }} />Click to enlarge</span>
          </div>
        </div>
        <div ref={ref} className="gallery-main-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'auto auto', gap: '4px' }}>
          {GALLERY.map((item, i) => (
            <GalleryItem key={i} item={item} index={i} onClick={setLightboxIdx} style={{ gridColumn: gridItems[i].gridColumn, gridRow: gridItems[i].gridRow, aspectRatio: gridItems[i].aspectRatio, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)', transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 75}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 75}ms` }} />
          ))}
        </div>
        <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', padding: '1.25rem 1.5rem', background: 'var(--white)', border: '1px solid var(--cream3)', borderRadius: '2px' }}>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {['Nationwide fleet delivery', '500+ deliveries completed', 'Night loading available'].map(t => (
              <span key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--ink5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}><span style={{ color: 'var(--gold)' }}>◈</span> {t}</span>
            ))}
          </div>
          <a href={wa(MSG.float)} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--ink)', color: 'var(--gold)', fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '0.68rem', letterSpacing: '0.1em', padding: '0.75rem 1.4rem', textDecoration: 'none', transition: 'all 0.25s', borderRadius: '2px', border: '1px solid var(--ink)', whiteSpace: 'nowrap' }} onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor = 'var(--gold)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--ink)'; }}><WAIcon s={13} /> Order via WhatsApp</a>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [ref, visible] = useInView();
  return (
    <section className="clip-top-right" style={{ padding: '6rem 0', background: 'var(--white)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: '-60px', bottom: '-60px', width: '400px', height: '400px', borderRadius: '50%', border: '1px solid var(--cream3)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
        <div className="section-label">Testimonials</div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 900, fontSize: 'clamp(2.2rem, 5.5vw, 5rem)', color: 'var(--ink)', lineHeight: 0.92, letterSpacing: '-0.02em', marginBottom: '3rem' }}>What Our<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Clients Say</em></h2>
        <div ref={ref} className="testi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1px', background: 'var(--cream3)' }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} style={{ background: 'var(--cream)', padding: '2.5rem', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: `all 0.65s var(--ease-smooth) ${i * 100}ms` }} onMouseEnter={e => e.currentTarget.style.background = 'var(--white)'} onMouseLeave={e => e.currentTarget.style.background = 'var(--cream)'}>
              <div style={{ display: 'flex', gap: '2px', marginBottom: '1.5rem' }}>{[...Array(t.stars)].map((_, j) => <Star key={j} s={11} />)}</div>
              <p style={{ color: 'var(--ink3)', fontSize: '0.9rem', lineHeight: 1.9, marginBottom: '2rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400 }}>"{t.text}"</p>
              <div style={{ borderTop: '1px solid var(--cream3)', paddingTop: '1.25rem' }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--ink)', letterSpacing: '0.01em' }}>{t.name}</div>
                <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--gold)', fontSize: '0.6rem', letterSpacing: '0.1em', marginTop: '0.25rem', textTransform: 'uppercase' }}>{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  const toggle = useCallback((i) => setOpen(p => p === i ? null : i), []);
  return (
    <section className="clip-top-left" style={{ padding: '6rem 0', background: 'var(--cream2)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="section-label">FAQ</div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 900, fontSize: 'clamp(2.2rem, 5.5vw, 5rem)', color: 'var(--ink)', lineHeight: 0.92, letterSpacing: '-0.02em', marginBottom: '3rem' }}>Common<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Questions</em></h2>
        <div>
          {FAQS.map((f, i) => (
            <div key={i} style={{ borderBottom: `1px solid ${open === i ? 'var(--gold)' : 'var(--cream3)'}`, background: open === i ? 'var(--gold-pale)' : 'transparent', transition: 'background 0.25s, border-color 0.25s' }}>
              <button onClick={() => toggle(i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '1rem' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1rem', color: open === i ? 'var(--gold)' : 'var(--ink)', lineHeight: 1.4 }}>{f.q}</span>
                <span style={{ color: open === i ? 'var(--gold)' : 'var(--ink5)', flexShrink: 0 }}>{open === i ? <ChevUp /> : <ChevDown />}</span>
              </button>
              {open === i && <div style={{ padding: '0 1.5rem 1.5rem', color: 'var(--ink4)', fontSize: '0.87rem', lineHeight: 1.85, animation: 'fadeUp 0.2s ease', fontWeight: 300 }}>{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ onToast }) {
  const [form, setForm] = useState({ name: '', phone: '', location: '', message: '' });
  const [errors, setErrors] = useState({});
  const validate = useCallback(() => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required.';
    const digits = form.phone.replace(/\D/g, '');
    if (!form.phone.trim() || digits.length < 9) e.phone = 'Valid phone required.';
    if (!form.location.trim()) e.location = 'Required.';
    if (!form.message.trim()) e.message = 'Required.';
    return e;
  }, [form]);
  const handleWA = useCallback(() => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    window.open(wa(MSG.form(form.name, form.phone, form.location, form.message)), '_blank');
    onToast({ title: 'Opening WhatsApp…', body: "We'll reply with your quote shortly." });
    setForm({ name: '', phone: '', location: '', message: '' });
  }, [form, validate, onToast]);
  const inputS = (k) => ({ background: 'var(--white)', border: `1px solid ${errors[k] ? '#ef4444' : 'var(--cream3)'}`, padding: '0.9rem 1.1rem', color: 'var(--ink)', fontSize: '0.87rem', fontFamily: 'var(--font-sans)', fontWeight: 300, outline: 'none', width: '100%', transition: 'border-color 0.2s', borderRadius: '2px' });
  return (
    <section id="contact" className="clip-top-right" style={{ padding: '6rem 0', background: 'var(--white)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }}>
          <div>
            <div className="section-label">Get in Touch</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 900, fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', color: 'var(--ink)', lineHeight: 0.92, letterSpacing: '-0.02em', marginBottom: '2.5rem' }}>Contact<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Us Today</em></h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {[
                { href: `tel:${PHONE}`, icon: <PhoneIcon s={17} />, label: 'Call Now', value: PHONE, col: 'var(--gold)' },
                { href: wa(MSG.float), icon: <WAIcon s={17} />, label: 'WhatsApp Order', value: PHONE, col: 'var(--sage2)', target: '_blank' },
                { icon: <MapPin s={17} />, label: 'Location', value: 'Ndarugo, Kiambu County', col: 'var(--ink5)' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                  <div style={{ width: '48px', height: '48px', border: '1px solid var(--cream3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.col, flexShrink: 0, background: 'var(--cream)', borderRadius: '2px' }}>{item.icon}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink5)', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{item.label}</div>
                    {item.href ? <a href={item.href} target={item.target} rel="noopener noreferrer" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.95rem', color: 'var(--ink)', textDecoration: 'none' }}>{item.value}</a> : <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.95rem', color: 'var(--ink)' }}>{item.value}</div>}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid var(--cream3)', paddingTop: '2rem', marginBottom: '2rem' }}>
              {['Same-day delivery, Nairobi & Kiambu', '500+ successful deliveries done', 'No hidden charges — transparent pricing', 'Bulk discounts for large orders', 'M-Pesa, bank & cash accepted'].map(t => (
                <div key={t} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.7rem' }}>
                  <span style={{ color: 'var(--gold)', flexShrink: 0 }}><CheckIcon /></span>
                  <span style={{ color: 'var(--ink4)', fontSize: '0.82rem', fontWeight: 300 }}>{t}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
              {[{ href: FACEBOOK_URL, icon: <FacebookIcon />, label: 'Facebook', hov: '#1877f2' }, { href: TIKTOK_URL, icon: <TikTokIcon />, label: 'TikTok', hov: 'var(--ink)' }].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', border: '1px solid var(--cream3)', color: 'var(--ink5)', fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '0.62rem', letterSpacing: '0.1em', padding: '0.6rem 1rem', textDecoration: 'none', transition: 'all 0.2s', background: 'var(--white)', borderRadius: '2px' }} onMouseEnter={e => { e.currentTarget.style.borderColor = s.hov; e.currentTarget.style.color = s.hov; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--cream3)'; e.currentTarget.style.color = 'var(--ink5)'; }}>{s.icon} {s.label}</a>
              ))}
            </div>
          </div>
          <div style={{ background: 'var(--cream)', padding: '2.5rem', border: '1px solid var(--cream3)', borderRadius: '2px' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.4rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>Get a Quote via WhatsApp</div>
            <p style={{ color: 'var(--ink5)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', marginBottom: '2rem' }}>We'll reply to your WhatsApp with a full breakdown.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[{ ph: 'Your Full Name', k: 'name', t: 'text' }, { ph: 'Phone (0712 319 654 or +254…)', k: 'phone', t: 'tel' }, { ph: 'Delivery Area (e.g. Ruiru, Juja, Thika…)', k: 'location', t: 'text' }].map(f => (
                <div key={f.k}>
                  <input type={f.t} placeholder={f.ph} value={form[f.k]} onChange={e => { setForm(p => ({ ...p, [f.k]: e.target.value })); setErrors(p => ({ ...p, [f.k]: '' })); }} style={inputS(f.k)} onFocus={e => e.target.style.borderColor = errors[f.k] ? '#ef4444' : 'var(--gold)'} onBlur={e => e.target.style.borderColor = errors[f.k] ? '#ef4444' : 'var(--cream3)'} />
                  {errors[f.k] && <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', marginTop: '0.3rem' }}><AlertIcon /><span style={{ color: '#ef4444', fontSize: '0.68rem' }}>{errors[f.k]}</span></div>}
                </div>
              ))}
              <div>
                <textarea placeholder="What do you need? (e.g. 2 trucks of ballast + 1 river sand)" rows={4} value={form.message} onChange={e => { setForm(p => ({ ...p, message: e.target.value })); setErrors(p => ({ ...p, message: '' })); }} style={{ ...inputS('message'), resize: 'none' }} onFocus={e => e.target.style.borderColor = errors.message ? '#ef4444' : 'var(--gold)'} onBlur={e => e.target.style.borderColor = errors.message ? '#ef4444' : 'var(--cream3)'} />
                {errors.message && <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', marginTop: '0.3rem' }}><AlertIcon /><span style={{ color: '#ef4444', fontSize: '0.68rem' }}>{errors.message}</span></div>}
              </div>
              <button onClick={handleWA} style={{ background: 'var(--ink)', color: 'var(--gold)', fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '0.75rem', letterSpacing: '0.12em', padding: '1.2rem', border: '1px solid var(--ink)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', transition: 'all 0.25s', borderRadius: '2px', boxShadow: '3px 3px 0 var(--gold)' }} onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.transform = 'translate(2px,2px)'; e.currentTarget.style.boxShadow = '1px 1px 0 var(--ink)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--ink)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '3px 3px 0 var(--gold)'; }}><WAIcon s={16} /> Send via WhatsApp — Get Quote Now</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const navLinks = ['Products', 'Pricing', 'Delivery', 'Gallery', 'Contact'];
  const materials = ['Yellow Stones', 'Bush Stones', 'Ballast', 'Machine Cut Stones', 'Foundation Stones', 'River Sand'];
  return (
    <footer style={{ background: 'var(--ink2)', borderTop: '1px solid rgba(196,154,42,0.2)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '5rem 1.5rem 2.5rem' }}>
        <div className="footer-inner" style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '4rem' }}>
          <div style={{ maxWidth: '320px', minWidth: '220px', flexShrink: 0 }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.5rem', color: 'var(--white)', marginBottom: '0.25rem' }}>Brayo <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>wa</em> Ndarugo</div>
            <div style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.2)', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Building Materials · Kiambu County, Kenya</div>
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.82rem', lineHeight: 1.85, marginBottom: '2rem', fontWeight: 300 }}>Kenya's fastest-growing supplier of yellow stones, bush stones, ballast, river sand and more. Same-day delivery to Nairobi, Kiambu and beyond.</p>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {[{ href: FACEBOOK_URL, icon: <FacebookIcon />, l: 'FB' }, { href: TIKTOK_URL, icon: <TikTokIcon />, l: 'TT' }].map(s => (
                <a key={s.l} href={s.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '0.62rem', letterSpacing: '0.1em', padding: '0.5rem 0.85rem', textDecoration: 'none', transition: 'all 0.2s', borderRadius: '2px' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; }}>{s.icon} {s.l}</a>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '0.6rem', letterSpacing: '0.22em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Navigation</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {navLinks.map(l => <a key={l} href={`#${l.toLowerCase()}`} style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.87rem', fontFamily: 'var(--font-sans)', fontWeight: 300, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.25)'}>{l}</a>)}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '0.6rem', letterSpacing: '0.22em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Materials</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {materials.map(m => <a key={m} href={wa(MSG.product(m))} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.87rem', fontFamily: 'var(--font-sans)', fontWeight: 300, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.25)'}>{m}</a>)}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '0.6rem', letterSpacing: '0.22em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Contact</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href={`tel:${PHONE}`} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'rgba(255,255,255,0.25)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 300 }} onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.25)'}><PhoneIcon s={13} /> {PHONE}</a>
              <a href={wa(MSG.float)} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'rgba(255,255,255,0.25)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 300 }} onMouseEnter={e => e.currentTarget.style.color = '#4ade80'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.25)'}><WAIcon s={13} /> WhatsApp Us</a>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', color: 'rgba(255,255,255,0.15)', fontSize: '0.82rem', fontWeight: 300 }}><MapPin s={13} /> Ndarugo, Kiambu County</div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '0.75rem', alignItems: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.12)', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em' }}>© {new Date().getFullYear()} BRAVO WA NDARUGO MAWE. ALL RIGHTS RESERVED.</p>
          <p style={{ color: 'rgba(255,255,255,0.08)', fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.06em' }}>Yellow Stones · Bush Stones · Ballast · River Sand · Machine Cut · Foundation Stones</p>
        </div>
      </div>
    </footer>
  );
}

function MobileBar() {
  const isMobile = useIsMobile();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 350);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  if (!isMobile) return null;
  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999, background: 'rgba(247,243,236,0.97)', backdropFilter: 'blur(20px)', borderTop: '1px solid var(--cream3)', padding: '0.65rem 1rem calc(0.65rem + env(safe-area-inset-bottom))', display: 'flex', gap: '0.6rem', transform: show ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.4s var(--ease-smooth)', boxShadow: '0 -8px 30px rgba(15,12,8,0.08)' }}>
      <a href={wa(MSG.float)} target="_blank" rel="noopener noreferrer" style={{ flex: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', background: 'var(--sage)', color: 'var(--white)', fontFamily: 'var(--font-mono)', fontWeight: 500, padding: '0.9rem 0.5rem', textDecoration: 'none', fontSize: '0.7rem', letterSpacing: '0.08em', borderRadius: '2px' }}><WAIcon s={14} /> WHATSAPP</a>
      <a href={`tel:${PHONE}`} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', background: 'var(--ink)', color: 'var(--gold)', fontFamily: 'var(--font-mono)', fontWeight: 500, padding: '0.9rem 0.5rem', textDecoration: 'none', fontSize: '0.7rem', letterSpacing: '0.08em', borderRadius: '2px' }}><PhoneIcon s={14} /> CALL</a>
      <a href="#contact" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--cream3)', color: 'var(--ink4)', fontFamily: 'var(--font-mono)', fontWeight: 500, padding: '0.9rem 0.5rem', textDecoration: 'none', fontSize: '0.65rem', letterSpacing: '0.06em', borderRadius: '2px', background: 'var(--white)' }}>QUOTE</a>
    </div>
  );
}

export default function App() {
  const [toast, setToast] = useState(null);
  const showToast = useCallback((msg) => { setToast(null); setTimeout(() => setToast(msg), 10); }, []);
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <Cursor />
      <ScrollProgress />
      <Navbar />
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
      <StickyWA />
      <Hero />
      <Products />
      <WhyUs />
      <HowItWorks />
      <Pricing />
      <Delivery />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Contact onToast={showToast} />
      <Footer />
      <MobileBar />
    </>
  );
}
