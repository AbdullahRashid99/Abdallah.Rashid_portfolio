// Portfolio-Enhanced.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, Linkedin, Phone, LineChart,
  GraduationCap, Code, ArrowUp, ChevronLeft, ChevronRight, Sparkles,
  MessageCircle, Rocket, TrendingUp, ChevronDown
} from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';

// Import SocialCircle component
import SocialCircle from '../src/components/SocialCircle.jsx';

// --- Global Protection Styles ---
const protectionStyles = {
  userSelect: 'none',
  WebkitTouchCallout: 'none',
  WebkitUserSelect: 'none',
};

// --- Custom Lazy & Animated Image Component ---
const LazyImage = ({ src, alt, className = "", style = {}, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-neutral-900/80 ${className}`}>
      {/* Skeleton Pulse Loading effect */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 animate-pulse z-10" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ease-out ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        } ${className}`}
        style={{ ...protectionStyles, ...style }}
        draggable={false}
        {...props}
      />
    </div>
  );
};

// --- Reusable Scroll Reveal Animation Wrapper ---
const ScrollReveal = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

// --- Custom Mouse Drag & Touch Scroll Hook ---
function useDragScroll() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let startY = 0;
    let scrollLeft = 0;
    let hasDragged = false;

    const onMouseDown = (e) => {
      isDown = true;
      hasDragged = false;
      el.classList.add('cursor-grabbing');
      el.classList.remove('cursor-grab');
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };

    const onMouseLeave = () => {
      isDown = false;
      el.classList.remove('cursor-grabbing');
      el.classList.add('cursor-grab');
    };

    const onMouseUp = () => {
      isDown = false;
      el.classList.remove('cursor-grabbing');
      el.classList.add('cursor-grab');
    };

    const onMouseMove = (e) => {
      if (!isDown) return;
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.8;
      if (Math.abs(x - startX) > 6) {
        hasDragged = true;
      }
      el.scrollLeft = scrollLeft - walk;
    };

    const onTouchStart = (e) => {
      hasDragged = false;
      if (e.touches.length === 1) {
        startX = e.touches[0].pageX - el.offsetLeft;
        startY = e.touches[0].pageY;
        scrollLeft = el.scrollLeft;
      }
    };

    const onTouchMove = (e) => {
      if (e.touches.length === 1) {
        const x = e.touches[0].pageX - el.offsetLeft;
        const diffX = Math.abs(x - startX);
        if (diffX > 6) {
          hasDragged = true;
        }
      }
    };

    const onClickCapture = (e) => {
      if (hasDragged) {
        e.stopPropagation();
        e.preventDefault();
      }
      hasDragged = false;
    };

    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mousemove', onMouseMove);

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    el.addEventListener('click', onClickCapture, true);

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mousemove', onMouseMove);

      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('click', onClickCapture, true);
    };
  }, []);

  return ref;
}

// --- Watermark Sub-component ---
const RenderName = () => (
  <span
    className="text-[14px] md:text-[22px] font-semibold text-white/40 tracking-[0.3em] uppercase leading-none select-none pointer-events-none"
    style={{ textShadow: '0 0 2px rgba(0,0,0,0.4)' }}
  >
    Rashid
  </span>
);

// --- Watermark Component ---
const WatermarkWrapper = ({ children }) => {
  return (
    <div className="relative overflow-hidden w-full h-full flex items-center justify-center">
      {children}
      <div className="absolute inset-0 pointer-events-none select-none opacity-50">
        <div
          className="absolute inset-[-50%] md:inset-[-50%]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                -45deg,
                rgba(255,255,255,0.08) 0px,
                rgba(255,255,255,0.08) 120px,
                transparent 120px,
                transparent 240px
              )
            `,
          }}
        />
        <div className="absolute inset-[-30%] md:inset-[-50%] rotate-[-45deg] flex flex-wrap gap-[60px] md:gap-[120px]">
          {Array.from({ length: 20 }).map((_, i) => (
            <RenderName key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Personal Info ---
const personalInfo = {
  name: "Abdullah Rashid",
  title: "Senior Media Buyer | Shopify Developer | Google Certificated Digital Marketer & E-commerce expert",
  linkedin: "https://www.linkedin.com/in/abdullah-rash-id/",
  whatsapp: "https://api.whatsapp.com/send/?phone=%2B201025030220&text&type=phone_number&app_absent=0",
  tiktok: "https://www.tiktok.com/",
  profileImage: "https://i.postimg.cc/DwGWP6Y3/lkjhljkh.jpg",
  startupForm: "https://docs.google.com/forms/d/e/1FAIpQLSdEBwP65M40klTsS3_3eez_y8Sjj5lbLI276pYZ1omnuF2ZVQ/viewform",
  sales300kForm: "https://docs.google.com/forms/d/e/1FAIpQLSfpnHDVpZeI_7Q5srnURXlnPzfLUhuyiPzptUeqj77uyeeRVg/viewform"
};

// Navigation sections
const sections = [
  { id: "skills", title: "Skills" },
  { id: "results", title: "Results" },
];

const skillsData = [
  "Analytical Mindset",
  "Problem-Solver",
  "E-commerce Expert",
  "Master, Optimize & Scale",
  "Strong interpersonal skills",
  "All Social Platforms Ads",
  "Content Strategys",
  "Business & Pricing Strategys",
  "Financial & Data Analyst",
  "Data-Driven Decision Making",
  "Shopify Developer",
  "Websites CRO"
];

const mascotQuotes = [
  "I Mastered This! 🧽✨",
  "Easy Peasy! 🔥",
  "Boom! 100% Expert! 🚀",
  "Look Here! 👇",
  "Top Skill! 🎯",
  "Ready to Scale! 📈"
];

// --- Brands Data ---
const brandLogos = [
  { 
    name: "Trillion Club", 
    url: "https://trillionclubsa.com/", 
    font: "font-serif tracking-[0.25em] font-bold", 
    bg: "from-amber-950/50 via-neutral-900 to-neutral-950", 
    glow: "rgba(251,191,36,0.6)", 
    border: "border-amber-500/40",
    textGradient: "from-amber-200 via-white to-amber-400"
  },
  { 
    name: "Fluency", 
    url: "https://fluency.live/", 
    font: "font-mono tracking-wider font-semibold", 
    bg: "from-blue-950/50 via-neutral-900 to-neutral-950", 
    glow: "rgba(59,130,246,0.6)", 
    border: "border-blue-500/40",
    textGradient: "from-blue-200 via-white to-cyan-400"
  }, 
  { 
    name: "Icona", 
    url: "https://icona.ae/", 
    font: "font-light tracking-[0.3em] uppercase", 
    bg: "from-purple-950/50 via-neutral-900 to-neutral-950", 
    glow: "rgba(168,85,247,0.6)", 
    border: "border-purple-500/40",
    textGradient: "from-purple-200 via-white to-pink-400"
  },
  { 
    name: "Reborn", 
    url: "https://rebornegypt.com/", 
    font: "font-black tracking-tighter uppercase", 
    bg: "from-red-950/50 via-neutral-900 to-neutral-950", 
    glow: "rgba(239,68,68,0.6)", 
    border: "border-red-500/40",
    textGradient: "from-red-200 via-white to-orange-500"
  },
  { 
    name: "Torinese", 
    url: "https://www.instagram.com/torinese.eg/", 
    font: "font-serif italic tracking-wide", 
    bg: "from-emerald-950/50 via-neutral-900 to-neutral-950", 
    glow: "rgba(16,185,129,0.6)", 
    border: "border-emerald-500/40",
    textGradient: "from-emerald-200 via-white to-teal-400"
  },
  { 
    name: "Roots", 
    url: "https://www.instagram.com/roots_hairrepair/", 
    font: "font-normal tracking-[0.2em] lowercase", 
    bg: "from-stone-900/80 via-neutral-900 to-neutral-950", 
    glow: "rgba(217,119,6,0.6)", 
    border: "border-amber-600/40",
    textGradient: "from-stone-200 via-white to-amber-500"
  },
  { 
    name: "Viola", 
    url: "https://www.instagram.com/getviola/", 
    font: "font-thin tracking-[0.4em] uppercase", 
    bg: "from-teal-950/50 via-neutral-900 to-neutral-950", 
    glow: "rgba(20,184,166,0.6)", 
    border: "border-teal-500/40",
    textGradient: "from-teal-200 via-white to-cyan-300"
  },
  { 
    name: "Naturel", 
    url: "https://www.instagram.com/___naturel___/", 
    font: "font-light tracking-[0.35em] uppercase", 
    bg: "from-pink-950/50 via-neutral-900 to-neutral-950", 
    glow: "rgba(236,72,153,0.6)", 
    border: "border-pink-500/40",
    textGradient: "from-pink-200 via-white to-rose-400"
  },
  { 
    name: "The Rx-Hair", 
    url: "https://www.instagram.com/therxhair/", 
    font: "font-bold tracking-tight", 
    bg: "from-cyan-950/50 via-neutral-900 to-neutral-950", 
    glow: "rgba(6,182,212,0.6)", 
    border: "border-cyan-500/40",
    textGradient: "from-cyan-200 via-white to-blue-400"
  },
  { 
    name: "Robust", 
    url: "https://www.facebook.com/robustsportswear/", 
    font: "font-black tracking-widest uppercase", 
    bg: "from-orange-950/50 via-neutral-900 to-neutral-950", 
    glow: "rgba(249,115,22,0.6)", 
    border: "border-orange-500/40",
    textGradient: "from-orange-200 via-white to-amber-400"
  }
];

// --- WhatsApp Icon Component ---
const WhatsAppLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

// --- NEW CUSTOM CONTACT US COMPONENT ---
const ContactUsSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto my-8 flex flex-col items-center">
      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="group relative px-8 py-4 bg-gradient-to-r from-teal-500 via-sky-500 to-indigo-600 text-white font-bold text-lg md:text-xl rounded-full shadow-[0_0_25px_rgba(20,184,166,0.4)] hover:shadow-[0_0_35px_rgba(20,184,166,0.7)] border border-teal-300/30 flex items-center gap-3 transition-all duration-300"
      >
        <MessageCircle className="w-6 h-6 animate-pulse" />
        <span>Contact Us</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-teal-200" />
        </motion.div>
      </motion.button>

      {/* Expanded 3 Buttons Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="overflow-hidden w-full mt-6"
          >
            <div className="flex flex-col sm:flex-row justify-center items-stretch gap-4 w-full px-2">
              {/* 1. Startup Button */}
              <motion.a
                href={personalInfo.startupForm}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-2xl border border-amber-300/40 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all text-center group"
              >
                <span className="text-2xl group-hover:scale-125 transition-transform duration-300">🚀</span>
                <span className="text-base font-semibold tracking-wide">Startup</span>
              </motion.a>

              {/* 2. +300K Sales Button */}
              <motion.a
                href={personalInfo.sales300kForm}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-bold rounded-2xl border border-teal-300/40 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all text-center group"
              >
                <span className="text-2xl group-hover:scale-125 transition-transform duration-300">📈</span>
                <span className="text-base font-semibold tracking-wide">+300K Sales</span>
              </motion.a>

              {/* 3. Other (WhatsApp) Button */}
              <motion.a
                href={personalInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-neutral-950 font-extrabold rounded-2xl border border-emerald-200/50 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all text-center group"
              >
                <WhatsAppLogo />
                <span className="text-base font-bold tracking-wide">Other</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Section Wrapper ---
const SectionWrapper = React.forwardRef(({ id, title, children, className }, ref) => (
  <section ref={ref} id={id} className={`py-16 md:py-24 ${className}`}>
    <ScrollReveal>
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-sky-400">{title}</span>
      </h2>
    </ScrollReveal>
    {children}
  </section>
));

// --- Smart Navbar Component ---
const Navbar = ({ activeSection, isModalOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  if (isModalOpen) return null;

  return (
    <motion.nav 
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full bg-neutral-950/80 backdrop-blur-lg z-40 border-b border-neutral-800/50"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <a href="#home" className="text-2xl font-bold tracking-tight text-white hover:text-teal-400 transition-colors">{personalInfo.name}</a>
        <div className="hidden md:flex gap-8 items-center">
          {sections.map((sec) => (
            <a key={sec.id} href={`#${sec.id}`} className={`font-medium transition-colors ${activeSection === sec.id ? 'text-teal-400' : 'text-neutral-300 hover:text-teal-400'}`}>
              {sec.title}
            </a>
          ))}
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="bg-transparent text-white p-2">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-neutral-900">
            <div className="flex flex-col items-center gap-4 py-4">
              {sections.map((sec) => (
                <a key={sec.id} href={`#${sec.id}`} onClick={() => setIsMenuOpen(false)} className={`text-lg font-medium transition-colors ${activeSection === sec.id ? 'text-teal-400' : 'text-neutral-300 hover:text-teal-400'}`}>
                  {sec.title}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// --- Gallery Modal ---
const GalleryModal = ({ images = [], startIndex = 0, onClose }) => {
  const [index, setIndex] = useState(startIndex);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => { setIndex(startIndex); }, [startIndex]);

  useEffect(() => {
    window.history.pushState({ modalOpen: true }, '');
    const handlePopState = () => onClose();
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (window.history.state?.modalOpen) window.history.back();
    };
  }, [onClose]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setIndex(i => (i + 1) % images.length);
      if (e.key === 'ArrowLeft') setIndex(i => (i - 1 + images.length) % images.length);
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [images.length, onClose]);

  const handleTouchStart = (e) => { touchStartX.current = e.changedTouches[0].screenX; };
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) setIndex(i => (i + 1) % images.length);
      else setIndex(i => (i - 1 + images.length) % images.length);
    }
  };

  if (!images.length) return null;

  return (
    <motion.div 
      className="fixed inset-0 bg-black/95 flex justify-center items-center z-[100] p-4 cursor-pointer"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      onClick={onClose}
    >
      <motion.div 
        className="relative w-full flex items-center justify-center max-w-7xl cursor-default" 
        initial={{ scale: 0.95 }} 
        animate={{ scale: 1 }} 
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-12 right-2 md:top-3 md:right-3 z-50 bg-neutral-800/80 hover:bg-neutral-700 p-2.5 rounded-full text-white backdrop-blur-md"
        >
          <X size={20} />
        </button>

        <button
          type="button"
          onClick={() => setIndex(i => (i - 1 + images.length) % images.length)}
          className="hidden md:flex absolute left-3 z-50 items-center justify-center h-12 w-12 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm"
        >
          <ChevronLeft size={28} />
        </button>

        <button
          type="button"
          onClick={() => setIndex(i => (i + 1) % images.length)}
          className="hidden md:flex absolute right-3 z-50 items-center justify-center h-12 w-12 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm"
        >
          <ChevronRight size={28} />
        </button>

        <div className="max-w-full max-h-[85vh] flex items-center justify-center rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 p-2 md:p-4">
          <WatermarkWrapper>
            <LazyImage 
              src={images[index]} 
              alt={`zoom-${index}`} 
              className="object-contain max-h-[80vh] w-auto h-auto max-w-full" 
            />
          </WatermarkWrapper>
        </div>

        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2">
          {images.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setIndex(i)} 
              className={`h-2.5 rounded-full transition-all ${i === index ? 'w-8 bg-teal-400' : 'w-2.5 bg-white/30'}`} 
              type="button" 
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- CERTIFICATIONS SECTION ---
const CERT_IMAGES = [
  'https://i.postimg.cc/rsxncdPk/65952225.jpg',
  'https://i.postimg.cc/B6dYd5MJ/6NXTTFXQ7B77-page-0001.jpg',
  'https://i.postimg.cc/Znp7Z9Mt/7WWC9OROA2E2-page-0001.jpg',
  'https://i.postimg.cc/0jDWx6Bv/CINQDM1IJMQR-page-0001.jpg',
  'https://i.postimg.cc/WzgWjDH4/CJB4ROD8WKVL-page-0001.jpg',
  'https://i.postimg.cc/9Mv8vP1d/3ZWC24LXWG87_page_0001.jpg',
  'https://i.postimg.cc/BZKw2ynt/Google-Certification.png',
];

const ImageSlider = ({ images = CERT_IMAGES, speed = 60, onOpenModal }) => {
  const containerRef = useDragScroll();
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimerRef = useRef(null);
  const duplicated = [...images, ...images];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let lastTime = 0;
    let rafId;
    const step = (ts) => {
      if (!lastTime) lastTime = ts;
      const dt = (ts - lastTime) / 1000;
      lastTime = ts;
      if (!isPaused) {
        el.scrollLeft += speed * dt;
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [speed, isPaused, containerRef]);

  const handleInteraction = () => {
    setIsPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  return (
    <ScrollReveal className="w-full py-12">
      <div className="max-w-5xl mx-auto overflow-hidden">
        <h3 className="text-xl md:text-2xl font-bold mb-6 text-center text-amber-400">Google Certifications</h3>
        <div 
          ref={containerRef}
          className="flex overflow-x-auto gap-4 py-4 scrollbar-none cursor-grab active:cursor-grabbing select-none"
          style={{ touchAction: 'pan-x pan-y', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onTouchStart={handleInteraction}
          onMouseDown={handleInteraction}
        >
          {duplicated.map((src, i) => (
            <motion.div 
              key={i} 
              className="flex-shrink-0 w-48 h-32 md:w-64 md:h-40 bg-neutral-800 rounded-xl overflow-hidden cursor-pointer border border-neutral-700"
              whileHover={{ scale: 1.05 }}
              onClick={() => onOpenModal(images, images.indexOf(src))}
            >
              <LazyImage src={src} className="w-full h-full object-cover" alt="Cert" />
            </motion.div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
};

// --- RESULTS DATA ---
const reelsCasesImages = [
  "https://i.postimg.cc/L5t3RNPm/1.png", 
  "https://i.postimg.cc/D0rPFBGm/5.png", 
  "https://i.postimg.cc/mkfy00Pg/Untitled-design-(1).png", 
  "https://i.postimg.cc/cCRBZX34/2.png", 
  "https://i.postimg.cc/7h3nDmzH/4.png"
];

const landscapeBannerItems = [
  { src: "https://i.postimg.cc/C5GsYm88/11.png", title: "Last 7 days Average 🔥" },
  { src: "https://i.postimg.cc/wMXQH0N1/8.png", title: "Hits harder than I love you" },
  { src: "https://i.postimg.cc/qqsx0jK6/10.png", title: "From 80K ad spend & 260K Purchase to 60K & 525K in no-time" },
  { src: "https://i.postimg.cc/Gp9FRGX5/1.png", title: "$$$ Traget Roas=4" },
  { src: "https://i.postimg.cc/N0L6tmdZ/2.png", title: "From 0 to hero Startup Brand BEP Roas 2.5" },
  { src: "https://i.postimg.cc/1z4GSwvL/3.png", title: "From Roas 1.9 to Roas 4 In Month, same spend" }
];

// --- AUTO SCROLL HOOK ---
function useAutoScrollResults(containerRef, { speed = 80, reverse = false, isPaused = false }) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let lastTime = 0;
    let rafId;
    const step = (ts) => {
      if (!lastTime) lastTime = ts;
      const dt = (ts - lastTime) / 1000;
      lastTime = ts;
      if (!isPaused) {
        const move = speed * dt;
        if (reverse) {
          el.scrollLeft -= move;
          if (el.scrollLeft <= 0) el.scrollLeft = el.scrollWidth / 2;
        } else {
          el.scrollLeft += move;
          if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
        }
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [speed, reverse, isPaused, containerRef]);
}

// --- REELS BANNER STRIP ---
const ReelsBannerStrip = ({ images, reverse = false, onImageClick }) => {
  const containerRef = useDragScroll();
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimerRef = useRef(null);
  const duplicated = [...images, ...images];
  useAutoScrollResults(containerRef, { speed: 80, reverse, isPaused });

  const trigger5sPause = () => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  return (
    <ScrollReveal>
      <div 
        ref={containerRef}
        className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-x-auto scrollbar-none flex select-none py-4 cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'pan-x pan-y', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onTouchStart={trigger5sPause}
        onMouseDown={trigger5sPause}
      >
        <div className="flex items-center">
          {duplicated.map((src, i) => (
            <div key={i} className="w-[65vw] sm:w-[40vw] md:w-[28vw] lg:w-[20vw] flex-shrink-0 px-2.5 md:px-3 flex flex-col items-center">
              <motion.div 
                className="w-full aspect-[9/16] max-h-[55vh] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 cursor-pointer shadow-2xl relative"
                whileHover={{ scale: 1.02 }}
                onClick={() => onImageClick(src)}
              >
                <WatermarkWrapper>
                  <LazyImage src={src} alt="Result Case" className="w-full h-full object-cover object-top" />
                </WatermarkWrapper>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
};

// --- LANDSCAPE BANNER STRIP ---
const LandscapeBannerStrip = ({ items, reverse = true, onImageClick }) => {
  const containerRef = useDragScroll();
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimerRef = useRef(null);
  const duplicated = [...items, ...items];
  useAutoScrollResults(containerRef, { speed: 90, reverse, isPaused });

  const trigger5sPause = () => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  return (
    <ScrollReveal>
      <div 
        ref={containerRef} 
        className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-x-auto scrollbar-none flex select-none py-4 cursor-grab active:cursor-grabbing" 
        style={{ touchAction: 'pan-x pan-y', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onTouchStart={trigger5sPause}
        onMouseDown={trigger5sPause}
      >
        <div className="flex">
          {duplicated.map((item, i) => (
            <div key={i} className="w-[88vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] flex-shrink-0 px-2 md:px-3 flex flex-col items-center">
              {item.title && <h4 className="text-teal-400 font-bold text-xs md:text-sm mb-2 text-center tracking-wide px-2 truncate w-full">{item.title}</h4>}
              <motion.div 
                className="w-full h-[180px] sm:h-[240px] md:h-[300px] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 cursor-pointer shadow-2xl relative" 
                whileHover={{ scale: 1.02 }} 
                transition={{ type: "spring", stiffness: 300 }} 
                onClick={() => onImageClick(item.src)}
              >
                <WatermarkWrapper>
                  <LazyImage src={item.src} alt={item.title || "Result Landscape"} className="w-full h-full object-cover object-top" />
                </WatermarkWrapper>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
};

// --- BRANDS BANNER STRIP ---
const BrandsBannerStrip = ({ items, speed = 40 }) => {
  const containerRef = useDragScroll();
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimerRef = useRef(null);
  
  const duplicated = [...items, ...items, ...items]; 
  useAutoScrollResults(containerRef, { speed, reverse: false, isPaused });

  const trigger5sPause = () => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  return (
    <ScrollReveal>
      <div
        ref={containerRef}
        className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-x-auto scrollbar-none flex items-center py-10 md:py-14 cursor-grab active:cursor-grabbing select-none"
        style={{ touchAction: 'pan-x pan-y', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onTouchStart={trigger5sPause}
        onMouseDown={trigger5sPause}
      >
        <div className="flex gap-4 md:gap-8 px-4 items-center">
          {duplicated.map((brand, i) => (
            <a
              key={i}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex-shrink-0 flex items-center justify-center 
                         px-8 py-5 md:px-16 md:py-10 
                         bg-gradient-to-br ${brand.bg}
                         border ${brand.border} rounded-2xl md:rounded-3xl 
                         shadow-[0_4px_25px_rgba(0,0,0,0.5)] 
                         transition-all duration-500 ease-out transform hover:-translate-y-2 hover:scale-105 
                         overflow-hidden`}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl pointer-events-none"
                style={{ backgroundColor: brand.glow }}
              ></div>
              
              <span className={`relative z-10 text-2xl md:text-4xl whitespace-nowrap
                               bg-clip-text text-transparent bg-gradient-to-b ${brand.textGradient}
                               ${brand.font} transition-all duration-500`}>
                {brand.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
};

// --- SPONGEBOB MASCOT SVG ---
const SpongeBobMascot = ({ quote }) => (
  <motion.div 
    className="flex flex-col items-center pointer-events-none z-30"
    initial={{ scale: 0.5, y: -20 }}
    animate={{ scale: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 500, damping: 20 }}
  >
    <motion.div 
      animate={{ y: [0, -5, 0], scale: [1, 1.03, 1] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      className="bg-amber-400 text-neutral-950 font-black text-[11px] md:text-xs px-3 py-1 rounded-xl shadow-[0_0_15px_rgba(251,191,36,0.8)] border border-yellow-200 flex items-center gap-1 mb-1 whitespace-nowrap"
    >
      <span>{quote}</span>
      <Sparkles size={12} className="text-orange-600 animate-spin" />
    </motion.div>

    <motion.div
      animate={{ 
        rotate: [-6, 6, -6],
        y: [0, -6, 0]
      }}
      transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
      className="relative w-12 h-12 md:w-14 md:h-14 drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        <rect x="20" y="20" width="60" height="55" rx="6" fill="#FACC15" stroke="#CA8A04" strokeWidth="3" />
        <circle cx="28" cy="28" r="4" fill="#EAB308" />
        <circle cx="68" cy="32" r="5" fill="#EAB308" />
        <circle cx="32" cy="62" r="4.5" fill="#EAB308" />
        <circle cx="70" cy="65" r="3.5" fill="#EAB308" />

        <circle cx="38" cy="38" r="12" fill="#FFFFFF" stroke="#000" strokeWidth="2" />
        <circle cx="62" cy="38" r="12" fill="#FFFFFF" stroke="#000" strokeWidth="2" />
        
        <circle cx="40" cy="38" r="5" fill="#38BDF8" />
        <circle cx="60" cy="38" r="5" fill="#38BDF8" />
        <circle cx="41" cy="38" r="2.5" fill="#000000" />
        <circle cx="59" cy="38" r="2.5" fill="#000000" />

        <path d="M 32 24 L 30 18 M 38 23 L 38 16 M 44 24 L 46 18" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <path d="M 56 24 L 54 18 M 62 23 L 62 16 M 68 24 L 70 18" stroke="#000" strokeWidth="2" strokeLinecap="round" />

        <path d="M 50 40 Q 55 45 50 48" fill="none" stroke="#CA8A04" strokeWidth="3" strokeLinecap="round" />
        <path d="M 30 52 Q 50 66 70 52" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" />
        
        <circle cx="28" cy="50" r="4" fill="#EF4444" opacity="0.6" />
        <circle cx="72" cy="50" r="4" fill="#EF4444" opacity="0.6" />

        <rect x="44" y="58" width="5" height="6" fill="#FFF" stroke="#000" strokeWidth="1" />
        <rect x="51" y="58" width="5" height="6" fill="#FFF" stroke="#000" strokeWidth="1" />

        <rect x="20" y="70" width="60" height="6" fill="#FFFFFF" stroke="#000" strokeWidth="1.5" />
        <rect x="20" y="75" width="60" height="10" fill="#854D0E" stroke="#000" strokeWidth="1.5" />
        
        <polygon points="50,71 47,81 50,85 53,81" fill="#DC2626" />

        <g className="animate-bounce">
          <path d="M 18 55 Q 0 50 10 75" fill="none" stroke="#FACC15" strokeWidth="5" strokeLinecap="round" />
          <path d="M 82 55 Q 100 50 90 88" fill="none" stroke="#FACC15" strokeWidth="5" strokeLinecap="round" />
          <polygon points="88,88 95,98 82,94" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
        </g>
      </svg>
    </motion.div>
  </motion.div>
);

const mascotPositions = [
  "absolute -top-20 left-1/2 -translate-x-1/2",
  "absolute -top-20 -left-6",
  "absolute -top-20 -right-6",
  "absolute -bottom-20 left-1/2 -translate-x-1/2",
  "absolute -bottom-20 -left-6",
  "absolute -bottom-20 -right-6",
];

// --- SKILLS SECTION ---
const SkillsSection = ({ skills }) => {
  const [activeSkill, setActiveSkill] = useState(0);
  const [posIndex, setPosIndex] = useState(0);

  const getNextRandomPosition = (currentPos) => {
    let nextPos;
    do {
      nextPos = Math.floor(Math.random() * mascotPositions.length);
    } while (nextPos === currentPos);
    return nextPos;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSkill((prev) => (prev + 1) % skills.length);
      setPosIndex((prevPos) => getNextRandomPosition(prevPos));
    }, 2800);
    return () => clearInterval(interval);
  }, [skills.length]);

  const handleSkillClick = (index) => {
    setActiveSkill(index);
    setPosIndex((prevPos) => getNextRandomPosition(prevPos));
  };

  return (
    <ScrollReveal className="relative max-w-4xl mx-auto py-12">
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 relative">
        {skills.map((skill, i) => {
          const isActive = activeSkill === i;
          return (
            <div key={i} className="relative my-4">
              {isActive && (
                <motion.div
                  layoutId="spongebobMascot"
                  className={`${mascotPositions[posIndex]} z-30 pointer-events-none`}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                >
                  <SpongeBobMascot quote={mascotQuotes[i % mascotQuotes.length]} />
                </motion.div>
              )}

              <motion.button
                onClick={() => handleSkillClick(i)}
                className={`relative bg-neutral-800/80 backdrop-blur-md px-5 py-3 rounded-full text-sm md:text-base font-semibold border transition-all duration-300 ${
                  isActive 
                    ? 'border-yellow-400 text-yellow-300 shadow-[0_0_25px_rgba(250,204,21,0.5)] bg-neutral-900 scale-105' 
                    : 'border-neutral-700 text-neutral-300 hover:border-teal-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                {skill}
              </motion.button>
            </div>
          );
        })}
      </div>
    </ScrollReveal>
  );
};

// --- MULTI STRIP BANNERS ---
const MultiStripBanners = ({ onOpenModal }) => {
  const landscapeUrls = landscapeBannerItems.map(item => item.src);

  return (
    <div className="space-y-6 md:space-y-10">
      <div>
        <ReelsBannerStrip 
          images={reelsCasesImages} 
          reverse={false} 
          onImageClick={(src) => onOpenModal(reelsCasesImages, reelsCasesImages.indexOf(src))} 
        />
      </div>
      <div>
        <LandscapeBannerStrip 
          items={landscapeBannerItems} 
          reverse={true} 
          onImageClick={(src) => onOpenModal(landscapeUrls, landscapeUrls.indexOf(src))} 
        />
      </div>
    </div>
  );
};

// --- Main Portfolio ---
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [modalConfig, setModalConfig] = useState(null);

  const sectionRefs = { 
    home: useRef(null), 
    skills: useRef(null), 
    results: useRef(null)
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -70% 0px' }
    );
    Object.values(sectionRefs).forEach(ref => ref.current && observer.observe(ref.current));
    return () => observer.disconnect();
  }, []);

  const openModalForSection = (images, start = 0) => {
    setModalConfig({ images, start });
  };

  return (
    <div 
      className="bg-neutral-950 text-white min-h-screen font-sans antialiased relative overflow-x-hidden"
      onContextMenu={(e) => e.preventDefault()} 
      style={protectionStyles}
    >
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_black_100%)] opacity-60"></div>
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              radial-gradient(1px 1px at 20px 30px, #fff, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 40px 70px, #fff, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 130px 80px, #fff, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0,0,0,0))
            `,
            backgroundSize: '200px 200px'
          }}
        ></div>
      </div>

      <Navbar activeSection={activeSection} isModalOpen={!!modalConfig} />

      <main className="relative z-10 max-w-5xl mx-auto px-4 pb-24">
        {/* Hero Section */}
        <section ref={sectionRefs.home} id="home" className="min-h-screen flex flex-col justify-center items-center text-center relative pt-16">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-500/10 blur-[120px] rounded-full -z-10" />

          {/* Hero Profile Image with instant load */}
          <motion.img 
            src={personalInfo.profileImage} 
            loading="eager"
            decoding="async"
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5 }}
            className="w-32 h-32 rounded-full object-cover border-4 border-neutral-700 mb-6 shadow-[0_0_20px_rgba(20,184,166,0.3)]" 
            draggable="false"
          />

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4"
          >
            Abdullah Rashid<br /> Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">Growth</span> Partner.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-300 max-w-2xl mb-2"
          >
            {personalInfo.title}
          </motion.p>

          {/* New Contact Us Component Placed Under Name & Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full"
          >
            <ContactUsSection />
          </motion.div>
        </section>

        <SocialCircle />
        <ImageSlider onOpenModal={openModalForSection} />

        {/* Skills Section */}
        <SectionWrapper ref={sectionRefs.skills} id="skills" title="Skills">
          <SkillsSection skills={skillsData} />
        </SectionWrapper>

        {/* Results Section */}
        <SectionWrapper ref={sectionRefs.results} id="results" title="Results">
          <MultiStripBanners onOpenModal={openModalForSection} />
          
          <div className="mt-16 md:mt-24">
            <BrandsBannerStrip items={brandLogos} />
          </div>
        </SectionWrapper>

        {/* Cards Container */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScrollReveal delay={0.1}>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-neutral-900/90 border-2 border-amber-400/80 rounded-2xl p-6 flex flex-col items-center text-center shadow-[0_0_15px_rgba(251,191,36,0.15)] hover:shadow-[0_0_25px_rgba(251,191,36,0.3)] transition-all h-full"
            >
              <GraduationCap className="text-amber-400 mb-4" size={38} />
              <p className="text-neutral-200 font-semibold text-base">
                Bachelor of Business Administration from Ain Shams University.
              </p>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-neutral-900/90 border-2 border-amber-400/80 rounded-2xl p-6 flex flex-col items-center text-center shadow-[0_0_15px_rgba(251,191,36,0.15)] hover:shadow-[0_0_25px_rgba(251,191,36,0.3)] transition-all h-full"
            >
              <LineChart className="text-amber-400 mb-4" size={38} />
              <p className="text-neutral-200 font-semibold text-base">
                Financial Analyst with over 4 years of experience in financial markets.
              </p>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-neutral-900/90 border-2 border-amber-400/80 rounded-2xl p-6 flex flex-col items-center text-center shadow-[0_0_15px_rgba(251,191,36,0.15)] hover:shadow-[0_0_25px_rgba(251,191,36,0.3)] transition-all h-full"
            >
              <Code className="text-amber-400 mb-4" size={38} />
              <p className="text-neutral-200 font-semibold text-base">
                Web Developer & E-commerce Solutions.⭐
              </p>
            </motion.div>
          </ScrollReveal>
        </div>
      </main>

      <footer className="relative z-10 text-center py-12 border-t border-neutral-800/50 bg-neutral-950/50 backdrop-blur-sm">
        <div className="flex justify-center gap-6 mb-4">
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full text-neutral-500 hover:text-teal-400 hover:bg-neutral-800 transition-all"
          >
            <Linkedin size={20} />
          </a>

          <a
            href={personalInfo.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full text-neutral-500 hover:text-green-500 hover:bg-neutral-800 transition-all"
          >
            <Phone size={20} />
          </a>

          <a
            href={personalInfo.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full text-neutral-500 hover:text-pink-500 hover:bg-neutral-800 transition-all"
          >
            <SiTiktok size={18} />
          </a>
        </div>

        <p className="text-neutral-500 text-sm">
          © 2022 - {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.
        </p>
      </footer>

      <ScrollToTopButton />

      {/* Gallery Modal rendering */}
      <AnimatePresence>
        {modalConfig && (
          <GalleryModal 
            images={modalConfig.images} 
            startIndex={modalConfig.start} 
            onClose={() => setModalConfig(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggle = () => setVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', toggle);
    return () => window.removeEventListener('scroll', toggle);
  }, []);
  if (!visible) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-5 right-5 bg-teal-500 text-white p-3 rounded-full shadow-lg z-30 hover:bg-teal-400 transition-colors">
      <ArrowUp size={24} />
    </button>
  );
}