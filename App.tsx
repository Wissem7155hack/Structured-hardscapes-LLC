import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LocationPage from './components/LocationPage';
import SEOHead from './components/SEOHead';

import { locations, getLocationBySlug } from './data/locations';
import {
  ArrowRight, Leaf, PencilRuler, Shovel, CheckCircle, Play, Loader2, Send, Phone,
  Maximize2, MapPin, Clock, Quote, Star
} from 'lucide-react';
import { NavigationLinks, ProjectImage, BlogPost } from './types';

// Import blog images
import grassImg from './images/grass.jpg';


import img1 from './images/1.jpeg';
import img2 from './images/2.jpeg';
import img3 from './images/3.jpeg';
import img4 from './images/4.jpeg';
import img5 from './images/5.jpeg';
import img6 from './images/6.jpeg';
import img7 from './images/7.jpeg';
import img8 from './images/8.jpeg';
import img9 from './images/9.jpeg';
import img10 from './images/10.jpeg';
import img11 from './images/11.jpeg';
import img12 from './images/12.jpeg';



import img21 from './images/arrows.png';

import img23 from './images/beautifully-maintained-green-lawn.jpg';
import img24 from './images/L.png';
import img25 from './images/logo_white.jpg';

import img26 from './images/phone-call.png';






// BeforeAfterSlider Component
const BeforeAfterSlider: React.FC<{ beforeImage: string | Record<string, unknown>; afterImage: string | Record<string, unknown>; }> = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg shadow-2xl cursor-col-resize select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <img
          src={String(afterImage)}
          alt="Nach der Transformation"
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
          Nachher
        </div>
      </div>

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={String(beforeImage)}
          alt="Vor der Transformation"
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute top-4 left-4 bg-gray-700 text-white px-4 py-2 rounded-full font-bold shadow-lg">
          Vorher
        </div>
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-col-resize"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* Slider Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing">
          <div className="flex gap-1">
            <div className="w-0.5 h-6 bg-gray-400"></div>
            <div className="w-0.5 h-6 bg-gray-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Blog Data ---
const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'retaining-wall-project',
    title: 'Retaining Wall Installation',
    excerpt: 'Expert installation of a structural retaining wall to manage slope and create usable yard space.',
    date: '2024-03-15',
    image: img3,
    story: ['A reliable retaining wall solution for a residential property.'],
    tips: [],
    qa: []
  },
  {
    id: '2',
    slug: 'paver-patio-design',
    title: 'Custom Paver Patio',
    excerpt: 'Beautiful paver patio design and installation for outdoor entertainment.',
    date: '2024-04-02',
    image: img2,
    story: ['Creating a functional outdoor living space with high-quality pavers.'],
    tips: [],
    qa: []
  },
  {
    id: '3',
    slug: 'site-grading-excavation',
    title: 'Site Grading & Excavation',
    excerpt: 'Professional site grading and excavation services for new construction preparation.',
    date: '2024-05-10',
    image: img9, // Using img9 as placeholder
    story: ['Preparing the ground for a solid foundation.'],
    tips: [],
    qa: []
  },
  {
    id: '4',
    slug: 'tree-removal-service',
    title: 'Major Tree Removal',
    excerpt: 'Safe and efficient removal of large trees and stump grinding.',
    date: '2024-06-15',
    image: img10, // Using img10 as placeholder
    story: ['Clearing the way for new landscape features.'],
    tips: [],
    qa: []
  },
  {
    id: '5',
    slug: 'landscape-transformation',
    title: 'Complete Landscape Transformation',
    excerpt: 'Full property transformation including softscaping, rock installation, and design.',
    date: '2024-07-20',
    image: img7, // Using img7 as placeholder
    story: ['Turning a vision into reality with complete landscaping services.'],
    tips: [],
    qa: []
  },
  {
    id: '6',
    slug: 'commercial-hardscaping',
    title: 'Commercial Hardscaping',
    excerpt: 'Durable hardscaping solutions for commercial properties.',
    date: '2024-08-01',
    image: img8, // Using img8 as placeholder
    story: ['High-traffic solutions for commercial environments.'],
    tips: [],
    qa: []
  }
];


// --- Utility Components ---

const RevealOnScroll: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const SectionTitle: React.FC<{ subtitle: string; title: string; align?: 'left' | 'center' }> = ({ subtitle, title, align = 'center' }) => (
  <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <span className="text-gold-500 font-bold tracking-[0.2em] text-xs uppercase mb-3 block">{subtitle}</span>
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-earth-900 relative inline-block">
      {title}
      <span className="absolute -bottom-4 left-0 w-1/2 h-1 bg-gold-500"></span>
    </h2>
  </div>
);

// Kontaktformular Komponente
const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Web3Forms Access Key
    formData.append("access_key", "");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setShowPopup(true);
        form.reset();
      } else {
        console.error("Web3Forms Error:", data);
        alert("Fehler beim Senden: " + (data.message || "Unbekannter Fehler"));
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Ein Netzwerkfehler ist aufgetreten.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-black p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-md mx-auto lg:mx-0">
        <h3 className="text-2xl md:text-3xl font-black text-white text-center mb-6 md:mb-8 uppercase font-sans">
          Free Consultation
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-white font-bold text-sm mb-1">
              Your Name *
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="John Doe"
              className="w-full p-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
              required
            />
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-white font-bold text-sm mb-1">
              Phone *
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="+1 425-870-9414"
              className="w-full p-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
              required
            />
          </div>

          {/* City Field */}
          <div>
            <label htmlFor="city" className="block text-white font-bold text-sm mb-1">
              Your City *
            </label>
            <input
              id="city"
              type="text"
              name="city"
              placeholder="Denver"
              className="w-full p-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
              required
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-white font-bold text-sm mb-1">
              How can we help you? *
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Your message..."
              rows={3}
              className="w-full p-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm resize-none"
              required
            />
          </div>

          {/* Checkbox for Terms */}
          <div className="flex items-start gap-2">
            <input
              id="agb"
              type="checkbox"
              className="mt-1"
              required
            />
            <label htmlFor="agb" className="text-xs text-gray-300">
              I agree to the{' '}
              <a
                href="/agb"
                className="text-green-500 underline hover:text-green-400 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Terms
              </a>{' '}
              and allow contact.
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#4a7c59] hover:bg-[#3d664a] text-white font-black uppercase py-4 rounded-md text-lg md:text-xl tracking-wide transition-colors duration-300 mt-2 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Sende...
              </>
            ) : (
              'Send Request'
            )}
          </button>
        </form>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl relative transform transition-all scale-100">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="mx-auto w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-2 font-serif">Vielen Dank!</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Wir haben Ihre Anfrage erhalten. Unser Team wird sich schnellstmöglich bei Ihnen melden.
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="w-full bg-[#4a7c59] text-white font-bold py-3 rounded-lg hover:bg-[#3d664a] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Schließen
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// Mobile-specific Contact Form (Styles matching reference photo)
const ContactFormMobile = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", "675b6a89-4977-4eeb-9177-759897523b65");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setShowPopup(true);
        form.reset();
      }
    } catch (error) {
      console.error("Submission Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label className="block text-[#1a1c1d] font-bold text-xs mb-2 pl-1">Your Name *</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            className="w-full px-4 py-4 rounded-xl bg-[#f8f9fa] border-none text-[#1a1c1d] placeholder:text-gray-400 focus:ring-2 focus:ring-[#4a7c59] text-sm font-medium"
            required
          />
        </div>

        <div>
          <label className="block text-[#1a1c1d] font-bold text-xs mb-2 pl-1">Phone *</label>
          <input
            type="tel"
            name="phone"
            placeholder="+1 425-870-9414"
            className="w-full px-4 py-4 rounded-xl bg-[#f8f9fa] border-none text-[#1a1c1d] placeholder:text-gray-400 focus:ring-2 focus:ring-[#4a7c59] text-sm font-medium"
            required
          />
        </div>

        <div>
          <label className="block text-[#1a1c1d] font-bold text-xs mb-2 pl-1">Your City *</label>
          <input
            type="text"
            name="city"
            placeholder="Denver"
            className="w-full px-4 py-4 rounded-xl bg-[#f8f9fa] border-none text-[#1a1c1d] placeholder:text-gray-400 focus:ring-2 focus:ring-[#4a7c59] text-sm font-medium"
            required
          />
        </div>

        <div>
          <label className="block text-[#1a1c1d] font-bold text-xs mb-2 pl-1">How can we help you? *</label>
          <textarea
            name="message"
            placeholder="Your message..."
            rows={4}
            className="w-full px-4 py-4 rounded-xl bg-[#f8f9fa] border-none text-[#1a1c1d] placeholder:text-gray-400 focus:ring-2 focus:ring-[#4a7c59] text-sm resize-none font-medium"
            required
          />
        </div>

        <div className="flex items-start gap-3 mt-4 px-1">
          <input type="checkbox" className="mt-1 accent-[#4a7c59] w-4 h-4" required id="agb-mob-inner" />
          <label htmlFor="agb-mob-inner" className="text-[11px] text-gray-500 leading-normal">
            I agree to the <a href="/agb" className="text-[#4a7c59] font-bold underline">Terms</a> and allow contact.
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#4a7c59] text-white font-black py-4 rounded-xl uppercase tracking-wider shadow-xl shadow-green-900/10 active:scale-[0.98] transition-all disabled:opacity-50 mt-6 text-base"
        >
          {isSubmitting ? 'SENDING...' : 'SEND REQUEST'}
        </button>
      </form>

      {/* Success Popup (Same as global) */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl relative">
            <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Vielen Dank!</h3>
            <p className="text-gray-600 mb-8 text-sm">Wir haben Ihre Anfrage erhalten und melden uns kurzfristig.</p>
            <button
              onClick={() => setShowPopup(false)}
              className="w-full bg-[#4a7c59] text-white font-bold py-3 rounded-lg"
            >
              Schließen
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Hauptabschnitte ---

const Hero = () => {
  return (
    <>
      {/* Mobile-Only Hero Layout (Visible on lg:hidden) */}
      <div className="lg:hidden flex flex-col bg-stone-100">
        <div className="relative h-screen w-full flex flex-col justify-center items-center px-6 overflow-hidden">
          {/* Background Image - img22 (grasshero2.png) */}
          <div
            className="absolute inset-0 bg-cover bg-center animate-slow-zoom"
            style={{
              backgroundImage: `url("${img23}")`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          >
            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center flex flex-col items-center top-[-40px]">
            <span className="text-[#c5a26a] font-bold tracking-[0.4em] text-[10px] uppercase mb-4 animate-[fadeInUp_0.8s_ease-out]">
              Expert Hardscaping & Construction
            </span>
            <h1 className="text-6xl font-serif text-white leading-[1.1] animate-[fadeInUp_1s_ease-out] drop-shadow-lg">
              Structured <br />
              <span className="text-[#c5a26a] italic font-light block mt-2">hardscapes LLC</span>
            </h1>


            <p className="text-white text-lg leading-relaxed max-w-[340px] mx-auto my-8 animate-[fadeInUp_1.3s_ease-out] font-medium drop-shadow-md">
              Specializing in heavy-duty construction, retaining walls, patios, excavation, and complete landscape transformations. Call 425-870-9414 for a free quote!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 w-full max-w-[280px] animate-[fadeInUp_1.4s_ease-out]">
              <Link
                to={NavigationLinks.SERVICES}
                className="bg-[#c5a26a] text-white py-4 px-8 font-bold text-xs uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-transform"
              >
                Our Services
              </Link>
              <Link
                to={NavigationLinks.PROJECTS}
                className="border border-white/50 bg-white/5 backdrop-blur-sm text-white py-4 px-8 font-bold text-xs uppercase tracking-[0.2em] active:scale-95 transition-transform hover:bg-white/10"
              >
                View Projects
              </Link>
            </div>
          </div>

          {/* Scroll Arrows - img21 */}

          <div className=" bottom-10 left-1/2 -translate-x-2.5">
            <img
              src={img21}
              alt="Scroll down"
              className="w-44 h-auto opacity-100 drop-shadow-xl"
            />
          </div>
        </div>

        {/* Mobile Contact Form Section (Card style under hero) */}
        <div className="relative z-30 -mt-8 bg-white rounded-t-[40px] px-6 pt-16 pb-16 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
          {/* Circular Logo Indicator */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-gold-400 to-earth-800 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <img
                src={img25}
                alt="Logo "
                className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-2xl"
              />
            </div>
          </div>

          <div className="text-center"><br /><br />
            <h2 className="text-2xl md:text-3xl font-black text-earth-900 text-center mb-6 md:mb-8 uppercase font-sans">
              FREE CONSULTATION
            </h2>
            <ContactFormMobile />
          </div>
        </div>
      </div>

      {/* Desktop-Only Hero Layout (Visible on hidden lg:block) */}
      <div className="hidden lg:block relative min-h-screen w-full overflow-visible pb-12">
        {/* Hintergrundbild mit langsamer Zoom-Effekt */}
        <div
          className="absolute inset-0 bg-cover bg-center animate-slow-zoom"
          style={{ backgroundImage: `url("${img23}")` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-earth-900/80 via-transparent to-black/20"></div>
        </div>

        {/* Inhalt */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center z-10 pt-20 lg:pt-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="overflow-hidden mb-2">
                <p className="text-gold-500 font-bold tracking-[0.3em] uppercase text-xs md:text-sm animate-[fadeInUp_1s_ease-out_forwards]">
                  Expert Hardscaping & Construction
                </p>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-white leading-[1.1] drop-shadow-2xl mb-6 md:mb-8 animate-[fadeInUp_1.2s_ease-out_forwards]">
                Structured
                <br />
                <span className="italic font-light text-gold-400">hardscapes LLC</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-200 font-light max-w-2xl border-l-2 border-gold-500 pl-4 md:pl-6 mb-8 md:mb-10 animate-[fadeInUp_1.4s_ease-out_forwards] mx-auto lg:mx-0">
                We specialize in hardscaping, retaining walls, patios, excavation, and complete landscape transformations. Contact us at +1 425-870-9414 for availability and a free quote!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 md:gap-5 animate-[fadeInUp_1.6s_ease-out_forwards] justify-center lg:justify-start">
                <Link
                  to={NavigationLinks.SERVICES}
                  className="px-6 md:px-10 py-3 md:py-4 bg-gold-500 hover:bg-gold-600 text-white font-bold tracking-widest uppercase transition-all duration-300 text-center shadow-xl hover:-translate-y-1 text-sm md:text-base"
                >
                  Our Services
                </Link>
                <Link
                  to={NavigationLinks.PROJECTS}
                  className="px-6 md:px-10 py-3 md:py-4 bg-transparent hover:bg-white/10 text-white border border-white/30 font-bold tracking-widest uppercase transition-all duration-300 text-center backdrop-blur-sm hover:-translate-y-1 text-sm md:text-base"
                >
                  View Projects
                </Link>
              </div>
            </div>

            {/* Kontaktformular rechts - für Desktop sichtbar */}
            <div className="animate-[fadeInUp_1.6s_ease-out_forwards]">
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Scroll-Indikator */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
          <div className="flex flex-col items-center">
            <span className="text-[10px] tracking-widest uppercase mb-2">Scroll</span>
            <div className="w-px h-8 md:h-12 bg-white/50"></div>
          </div>
        </div>
      </div>
    </>
  );
};

const ServicesSection = () => {
  const services = [
    {
      icon: <PencilRuler className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Hardscaping & Retaining Walls",
      desc: "Expert installation of structural retaining walls and tiered block systems to manage slopes and maximize usable yard space."
    },
    {
      icon: <Shovel className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Patios & Outdoor Living",
      desc: "Custom paver patio designs featuring integrated fire pits to create functional and inviting outdoor entertainment areas."
    },
    {
      icon: <Leaf className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Excavation & Site Grading",
      desc: "Complete land clearing, leveling, and dirt work to prepare residential or commercial sites for new construction or landscaping."
    },
    {
      icon: <Leaf className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Tree & Stump Removal",
      desc: "Specialized removal of trees and large root systems using heavy machinery to clear land effectively."
    },
    {
      icon: <PencilRuler className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Landscape Design & Softscaping",
      desc: "Installation of ornamental grasses, hedges, and specimen trees, accented with decorative rock and fresh mulch for enhanced curb appeal."
    },
    {
      icon: <Shovel className="w-6 h-6 md:w-8 md:h-8" />,
      title: "General Construction",
      desc: "Heavy-duty construction services for your outdoor projects."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F5F5F0] relative overflow-hidden">
      {/* Topographic Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
      }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <SectionTitle subtitle="Our Services" title="Quality Craftsmanship" />
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((s, i) => (
            <RevealOnScroll key={i} delay={i * 100}>
              <div className="h-full p-6 md:p-8 bg-white hover:bg-earth-900 group transition-all duration-500 shadow-sm hover:shadow-xl border-b-2 border-transparent hover:border-gold-500">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-stone-100 group-hover:bg-white/10 rounded-full flex items-center justify-center text-earth-900 group-hover:text-gold-500 mb-4 md:mb-6 transition-colors">
                  {s.icon}
                </div>
                <h3 className="text-lg md:text-xl font-serif text-earth-900 group-hover:text-white mb-3 md:mb-4 transition-colors">{s.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-300 text-sm leading-relaxed transition-colors">{s.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutPreview = () => (
  <section className="py-16 md:py-24 bg-earth-900 text-white overflow-hidden relative">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('images/moroccan-flower.png')] opacity-5 pointer-events-none"></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16">
        <RevealOnScroll>
          <div className="relative w-full max-w-lg mx-auto lg:mx-0">
            <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-full h-full border border-gold-500/30 z-0"></div>
            <img
              src={img7}
              alt="Work of Structured hardscapes LLC"
              className="relative z-10 w-full h-[400px] md:h-[600px] object-cover shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-white text-earth-900 p-4 md:p-8 shadow-xl max-w-xs hidden lg:block z-20">
              <p className="font-serif text-lg md:text-2xl italic">"Professional, reliable and with love of the craft."</p>
              <p className="text-right mt-2 md:mt-4 font-bold text-gold-600 text-xs md:text-sm tracking-widest">— Structured hardscapes LLC</p>
            </div>
          </div>
        </RevealOnScroll>

        <div className="lg:w-1/2 space-y-6 md:space-y-8 mt-8 lg:mt-0">
          <RevealOnScroll delay={200}>
            <span className="text-gold-500 font-bold tracking-[0.2em] text-xs uppercase">Our Philosophy</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mt-4 leading-tight">Craftsmanship & <span className="text-gold-500 italic">Tradition</span></h2>

            <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed mt-4 md:mt-6">
              We are a small family-owned landscaping company in Colorado dedicated to transforming outdoor spaces. Whether you need hardscaping with pavers, concrete installations, mulch or rock features, plant and tree services, wood fencing, or regular maintenance including mowing and clean-ups – we've got you covered. Contact us at +1 425-870-9414 for a free quote!
            </p>

            {/* Unternehmensteil */}
            <div className="flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-white/5 border border-white/10 rounded-sm mt-6 md:mt-8 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <img
                src={img5}
                alt="Structured hardscapes LLC"
                className="w-25 h-16 md:w-35 md:h-24 object-cover border-2 border-gold-500 shadow-md"
              />
              <div>
                <h4 className="text-lg md:text-xl font-serif text-white">Structured hardscapes LLC</h4>
                <p className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-1 md:mb-2">Construction & Hardscaping</p>
                <p className="text-gray-400 text-xs italic">"Quality construction services you can trust."</p>
              </div>
            </div>

            <div className="space-y-4 md:space-y-6 mt-6 md:mt-8">
              {[
                { title: "Expert Construction", desc: "Specialized in heavy-duty hardscaping, excavation, and structural retaining walls." },
                { title: "Free Quotes", desc: "Call or text 425-870-9414 for a free estimate on your project." },
                { title: "Complete Services", desc: "From site grading and tree removal to custom patios and landscape design." }
              ].map((item, i) => (
                <div key={i} className="flex">
                  <div className="mt-1 mr-3 md:mr-4 text-gold-500 shrink-0"><CheckCircle size={20} className="md:w-6 md:h-6" /></div>
                  <div>
                    <h4 className="text-white font-bold font-serif text-base md:text-lg">{item.title}</h4>
                    <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 md:pt-8">
              <Link to={NavigationLinks.ABOUT} className="inline-flex items-center text-gold-500 hover:text-white uppercase tracking-widest font-bold text-sm transition-colors border-b border-gold-500 pb-1 hover:border-white">
                Learn More About Us <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  </section>
);

const ProjectsGallery = () => {
  return (
    <section className="py-16 md:py-24 bg-[#F5F5F0] relative overflow-hidden">
      {/* Topographic Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
      }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <SectionTitle subtitle="Our Projects" title="Current Projects & Concepts" />
        </RevealOnScroll>

        {/* Galerie Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-12">
          {blogPosts.map((post, index) => (
            <RevealOnScroll key={post.id} delay={index * 50}>
              <div className="block h-full cursor-default">
                <div className="group relative overflow-hidden aspect-[4/3] shadow-md hover:shadow-xl transition-all duration-500 h-full">
                  <img
                    src={String(post.image)}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* Removed title overlay - images only */}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <Link to={NavigationLinks.PROJECTS} className="inline-block px-6 md:px-10 py-3 md:py-4 border-2 border-earth-900 text-earth-900 font-bold uppercase tracking-widest hover:bg-earth-900 hover:text-white transition-colors text-sm md:text-base bg-white/50 backdrop-blur-sm">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

// --- Styles for Animations ---
const AnimationStyles = () => (
  <style>{`
    @keyframes wiggle {
      0%, 100% { transform: rotate(-3deg); }
      50% { transform: rotate(3deg); }
    }
    .animate-wiggle {
      animation: wiggle 1s ease-in-out infinite;
    }
  `}</style>
);

const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFirstExpanded, setIsFirstExpanded] = useState(false);

  const googleMapsUrl = "";

  const allReviews = [
    { name: "Mark T.", location: "Snohomish, WA", rating: 5, time: "1 month ago", text: "Structured Hardscapes did an incredible job on our retaining wall. Professional, efficient, and the result is solid. Highly recommend them for any heavy construction work." },
    { name: "David L.", location: "Everett, WA", rating: 5, time: "2 months ago", text: "Hired them for site grading and excavation for a new shop. They have the right equipment and know-how. The site was perfectly leveled and ready for concrete." },
    { name: "Sarah J.", location: "Marysville, WA", rating: 5, time: "3 months ago", text: "Great communication and excellent work on our paver patio. Brett and his team are top notch. They transformed our backyard into a great living space." },
    { name: "Mike R.", location: "Lake Stevens, WA", rating: 5, time: "4 months ago", text: "We needed a large tree removed and some land clearing done. They handled it safely and quickly. Very impressed with their professionalism." },
    { name: "Jennifer P.", location: "Monroe, WA", rating: 5, time: "5 months ago", text: "Transformational work on our property. The hardscaping and softscaping looks amazing. reliable and fair pricing." },
    { name: "Robert K.", location: "Snohomish County", rating: 5, time: "6 months ago", text: "Excellent service! We needed a retaining wall replaced and they did a fantastic job. The tiered block system looks great and is rock solid." }
  ];

  const itemsPerPage = 3;
  const totalPages = Math.ceil(allReviews.length / itemsPerPage);
  const displayedReviews = allReviews.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <section className="py-16 md:py-24 bg-stone-100 relative overflow-hidden">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: `url('./images/grid.png')`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px'
      }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <SectionTitle subtitle="Customer Reviews" title="What Our Clients Say" />
        </RevealOnScroll>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {displayedReviews.map((review, i) => (
            <RevealOnScroll key={`${currentPage}-${i}`} delay={i * 100}>
              <div className="bg-white p-6 md:p-8 shadow-lg rounded-lg h-full flex flex-col hover:shadow-xl transition-shadow">
                {/* Header with Avatar and Name */}
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white font-bold text-lg mr-3 shrink-0">
                    {review.name[0]}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-1 mb-1">
                      <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-earth-900 text-base md:text-lg hover:text-gold-500 transition-colors cursor-pointer"
                      >
                        {review.name}
                      </a>
                      <div className="relative group">
                        <img src="https://img.icons8.com/color/48/verified-account.png" alt="Verified Badge" className="w-4 h-4" />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          Verified Customer
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">{review.time}</p>
                  </div>
                </div>

                {/* Google Logo */}
                <div className="mb-3 text-xs">
                  <svg width="72" height="24" viewBox="0 0 72 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <text x="0" y="18" fontSize="16" fontWeight="500">
                      <tspan fill="#4285F4">G</tspan>
                      <tspan fill="#EA4335">o</tspan>
                      <tspan fill="#FBBC04">o</tspan>
                      <tspan fill="#34A853">g</tspan>
                      <tspan fill="#EA4335">l</tspan>
                      <tspan fill="#4285F4">e</tspan>
                    </text>
                  </svg>
                </div>

                {/* Stars */}
                <div className="flex text-gold-500 mb-4">
                  {[...Array(5)].map((_, j) => {
                    const rating = (review as any).rating || 5;
                    return (
                      <Star
                        key={j}
                        size={16}
                        fill={j < rating ? "currentColor" : "none"}
                        className={j < rating ? "text-gold-500" : "text-gray-300"}
                      />
                    );
                  })}
                </div>

                {/* Review Text */}
                <div className="flex-grow">
                  <p className={`text-gray-700 text-sm md:text-base leading-relaxed`}>
                    {review.text}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center items-center gap-4 md:gap-6 flex-wrap">
          <button
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="px-6 py-2 md:py-3 bg-earth-900 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-gold-500 hover:text-earth-900 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all text-sm md:text-base"
          >
            ← Previous
          </button>

          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full font-bold text-sm md:text-base transition-all ${i === currentPage
                  ? 'bg-gold-500 text-earth-900'
                  : 'bg-earth-900 text-white hover:bg-gold-500 hover:text-earth-900'
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
            disabled={currentPage === totalPages - 1}
            className="px-6 py-2 md:py-3 bg-earth-900 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-gold-500 hover:text-earth-900 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all text-sm md:text-base"
          >
            Next →
          </button>
        </div>

        {/* Google Badge */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-sm md:text-base">
            <span className="font-bold">Our Google</span> Reviews – what our clients say: ⭐⭐⭐⭐⭐
          </p>
        </div>
      </div>
    </section>
  );
};

const InteractiveMap = () => (
  <div className="w-full h-[300px] md:h-[500px] relative">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d341936.7262145396!2d-122.25468755000003!3d48.06450650000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548555e5898d93c1%3A0x629555c1602410!2sSnohomish%20County%2C%20WA!5e0!3m2!1sen!2sus!4v1707923456789!5m2!1sen!2sus"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Location in Snohomish County, WA"
      className="transition-all duration-700"
    ></iframe>
  </div>
);

// --- Seitenzusammenfassungen ---

const PageHeader: React.FC<{ title: string; subtitle: string; image: string }> = ({ title, subtitle, image }) => (
  <div className="relative h-[40vh] md:h-[50vh] min-h-[300px] md:min-h-[400px] w-full overflow-hidden flex items-center justify-center">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url("${image}")` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
    </div>
    <div className="relative z-10 text-center px-4">
      <span className="block text-gold-500 font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-3 md:mb-4 animate-[fadeInUp_0.8s_ease-out_forwards]">{subtitle}</span>
      <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-white mb-4 md:mb-6 animate-[fadeInUp_1s_ease-out_forwards]">{title}</h1>
    </div>
  </div>
);

const HomePage = () => (
  <>
    <SEOHead
      title="Structured hardscapes LLC – Professional Construction & Hardscaping"
      description="Expert hardscaping and construction services. We install retaining walls, patios, pavers, and perform excavation and tree removal. ✓ Free Consultation ✓ Quality Work ✓ Reliable Service. Request a quote today!"
      keywords="hardscaping, retaining walls, excavation, landscape construction, patio installation, tree removal, Structured hardscapes LLC"
    />
    <Hero />
    <ServicesSection />
    <AboutPreview />
    <ProjectsGallery />
    <Testimonials />
    <InteractiveMap />
  </>
);

const ServicesPage = () => (
  <>
    <SEOHead
      title="Our Services – Hardscaping & Construction | Structured hardscapes LLC"
      description="Professional hardscaping and construction services: ✓ Retaining Walls ✓ Patios ✓ Excavation ✓ Tree Removal. Quality service at fair prices. Contact us today!"
      keywords="hardscaping services, retaining walls, excavation, patio installation, tree removal, landscape construction"
    />
    <PageHeader
      title="Our Services"
      subtitle="Quality Craftsmanship"
      image="https://images.unsplash.com/photo-1557429287-b2e26467fc2b?q=80&w=2000&auto=format&fit=crop&quot"
    />
    <ServicesSection />
    <section className="py-12 md:py-20 bg-earth-900 text-center text-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-serif mb-4 md:mb-6">Ready to Transform Your Outdoor Space?</h2>
        <p className="text-gray-300 mb-4 text-sm md:text-base">Structured hardscapes LLC is ready to help with your next project:</p>
        <ul className="text-gray-300 text-sm md:text-base mb-6 md:mb-8 max-w-2xl mx-auto text-left space-y-2">
          <li>✓ Hardscaping & Retaining Walls</li>
          <li>✓ Patios & Outdoor Living Areas</li>
          <li>✓ Excavation, Site Grading & Dirt Work</li>
          <li>✓ Tree Removal & Stump Grinding</li>
          <li>✓ Landscape Design & Installation</li>
          <li>✓ Heavy-Duty Construction</li>
        </ul>
        <p className="text-gold-500 font-bold text-lg mb-6">Call or text: 425-870-9414</p>
        <Link to={NavigationLinks.CONTACT} className="inline-block px-6 md:px-8 py-2 md:py-3 border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-earth-900 transition-colors uppercase tracking-widest font-bold text-sm md:text-base">
          Get Free Quote
        </Link>
      </div>
    </section>
    <Testimonials />
  </>
);

const ProjectsPage = () => (
  <>
    <SEOHead
      title="Projects & Gallery – Hardscaping Work | Structured hardscapes LLC"
      description="View our completed hardscaping and construction projects. ✓ Retaining Walls ✓ Patios ✓ Excavation ✓ Tree Removal. See our quality work!"
      keywords="hardscaping projects, retaining wall gallery, patio examples, construction gallery, landscape transformation"
    />
    <PageHeader
      title="Projects"
      subtitle="Our Work & Results"
      image="https://images.unsplash.com/photo-1557429287-b2e26467fc2b?q=80&w=2000&auto=format&fit=crop&quot"
    />
    <ProjectsGallery />
    <div className="bg-stone-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-500 italic text-sm md:text-base">Selected projects from 2020-2024</p>
      </div>
    </div>
  </>
);

const AboutPage = () => (
  <>
    <SEOHead
      title="About Us – Your Hardscaping Experts | Structured hardscapes LLC"
      description="Learn more about Structured hardscapes LLC. Your reliable partner for hardscaping and construction with professional service and guaranteed satisfaction."
      keywords="hardscaping company, landscape construction, Structured hardscapes LLC, professional excavators, retaining wall experts"
    />
    <PageHeader
      title="About Us"
      subtitle="Our Story"
      image="https://images.unsplash.com/photo-1557429287-b2e26467fc2b?q=80&w=2000&auto=format&fit=crop&quot"
    />
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: `url('./images/grid.png')`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px'
      }}></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="prose prose-sm md:prose-lg prose-stone mx-auto">
          {/* Unternehmen */}
          <div className="flex flex-col items-center mb-8 md:mb-12">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-gold-400 to-earth-800 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <img
                src={img25}
                alt="Our Team"
                className="relative w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-white shadow-2xl"
              />
            </div>
            <div className="mt-4 md:mt-6 text-center">
              <h4 className="text-xl md:text-2xl font-serif text-earth-900">Structured hardscapes LLC</h4>
              <p className="text-gold-500 text-xs md:text-sm font-bold uppercase tracking-widest">Hardscaping & Construction</p>
            </div>
          </div>

          <h3 className="text-2xl md:text-3xl font-serif text-earth-900 mb-4 md:mb-6 text-center">Excellence in Hardscaping & Construction</h3>
          <p className="leading-loose text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
            Structured hardscapes LLC is your expert partner for heavy-duty construction and complete landscape transformations. We specialize in hardscaping, structural retaining walls, custom patios, excavation, site grading, and tree removal.
          </p>
          <p className="leading-loose text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
            Every project receives personalized attention and a commitment to excellence. We use heavy machinery to clear land effectively and install tiered block systems to maximize your usable yard space. If you're interested in any of our services, give us a call or text at 425-870-9414 for availability and a free quote!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-8 md:py-12 text-center border-y border-gray-200 my-8 md:my-12">
            <div>
              <span className="block text-2xl md:text-4xl font-serif text-gold-500 mb-1 md:mb-2">8+</span>
              <span className="text-xs uppercase tracking-widest text-gray-500">Years of Experience</span>
            </div>
            <div>
              <span className="block text-2xl md:text-4xl font-serif text-gold-500 mb-1 md:mb-2">100+</span>
              <span className="text-xs uppercase tracking-widest text-gray-500">Projects Completed</span>
            </div>
            <div>
              <span className="block text-2xl md:text-4xl font-serif text-gold-500 mb-1 md:mb-2">100%</span>
              <span className="text-xs uppercase tracking-widest text-gray-500">Customer Satisfaction</span>
            </div>
          </div>

          {/* Kontaktbereich */}
          <div className="bg-stone-50 p-6 md:p-8 rounded-lg mt-8 md:mt-12">
            <h4 className="text-xl font-serif text-earth-900 mb-4 text-center">Contact</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
              <div>
                <Phone className="w-6 h-6 text-gold-500 mx-auto mb-2" />
                <a href="tel:+17205303933" className="text-earth-900 hover:text-gold-500 transition-colors font-bold">+1 425-870-9414</a>
              </div>
              <div>
                <Send className="w-6 h-6 text-gold-500 mx-auto mb-2" />
                <a href="mailto:brett@structuredhardscapes.com" className="text-earth-900 hover:text-gold-500 transition-colors">brett@structuredhardscapes.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <InteractiveMap />
  </>
);

const ContactPage = () => (
  <>
    <PageMeta
      title="Contact & Free Quote – Structured hardscapes LLC"
      description="Contact us for a free quote! Phone: +1 425-870-9414. We're happy to discuss your hardscaping and construction project."
      keywords="contact hardscaper, free quote construction, Structured hardscapes LLC contact"
    />
    <PageHeader
      title="Contact"
      subtitle="Get In Touch"
      image="https://images.unsplash.com/photo-1557429287-b2e26467fc2b?q=80&w=2000&auto=format&fit=crop&quot"
    />

    {/* Detaillierter Kontaktbereich */}
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {/* Kontaktinformationen */}
          <div>
            <RevealOnScroll>
              <SectionTitle subtitle="contact us" title="Your Request" align="left" />
            </RevealOnScroll>

            <div className="space-y-6 md:space-y-8">
              <div className="flex items-start">
                <MapPin className="text-gold-500 mt-1 mr-4 shrink-0" size={24} />
                <div>
                  <h4 className="font-serif text-lg text-earth-900 mb-2">Our Service Area</h4>
                  <p className="text-gray-600">Serving Snohomish County & Surrounding Areas<br />Snohomish, Lake Stevens, Monroe, Everett, Marysville</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="text-gold-500 mt-1 mr-4 shrink-0" size={24} />
                <div>
                  <h4 className="font-serif text-lg text-earth-900 mb-2">Phone</h4>
                  <a href="tel:+14258709414" className="text-earth-900 hover:text-gold-500 transition-colors font-bold text-lg">+1 425-870-9414</a>
                  <p className="text-gray-600 text-sm mt-1">Call or text for a free quote!</p>
                </div>
              </div>

              <div className="flex items-start">
                <Send className="text-gold-500 mt-1 mr-4 shrink-0" size={24} />
                <div>
                  <h4 className="font-serif text-lg text-earth-900 mb-2">Email</h4>
                  <a href="mailto:brett@structuredhardscapes.com" className="text-earth-900 hover:text-gold-500 transition-colors">brett@structuredhardscapes.com</a>
                </div>
              </div>

              {/* Soziale Medien */}
              <div className="pt-6">
                <h4 className="font-serif text-lg text-earth-900 mb-4">Follow us</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/profile.php?id=61587935346085"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-earth-900 text-white p-3 rounded-full hover:bg-gold-500 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>

                </div>
              </div>
            </div>
          </div>

          {/* Kontaktformular */}
          <div>
            <RevealOnScroll delay={200}>
              <ContactForm />
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>

    <InteractiveMap />
  </>
);

// Blog List Page
const BlogListPage = () => (
  <>
    <SEOHead
      title="Blog & Guides – Landscaping Tips | Structured hardscapes LLC"
      description="Valuable tips on landscape construction, retaining walls, and hardscaping from your local experts. ✓ Expert Advice ✓ Project Showcases ✓ Professional Quality."
      keywords="Hardscaping tips, retaining wall guide, landscape construction blog, excavation advice, patio design ideas"
    />
    <PageHeader
      title="Blog & Guides"
      subtitle="Tips & Insights"
      image="https://images.unsplash.com/photo-1557429287-b2e26467fc2b?q=80&w=2000&auto=format&fit=crop"
    />
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: `url('./images/grid.png')`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px'
      }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <SectionTitle subtitle="From the Field" title="Our Project Stories" />
        </RevealOnScroll>

        {/* Galerie Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.slice(0, 3).map((post, i) => (
            <RevealOnScroll key={post.id} delay={i * 100}>
              <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 cursor-default">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={String(post.image)}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Removed title overlay - images only */}
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  </>
);

// Individual Blog Post Page
const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);

  const toggleQuestion = (index: number) => {
    setOpenQuestions(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-earth-900 mb-4">Blog Post Not Found</h1>
          <Link to="/blog" className="text-gold-500 hover:text-gold-600 font-bold">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${post.title} – Landscaping Blog | Structured hardscapes LLC`}
        description={post.excerpt}
        keywords={`${post.title}, Landscaping Tips, Hardscaping Guide, Snohomish County, ${post.slug}`}
        ogImage={`https://www.luan-allround-service.de${post.image}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt,
          "image": `https://www.luan-allround-service.de${post.image}`,
          "datePublished": post.date,
          "author": {
            "@type": "Organization",
            "name": "Structured hardscapes LLC"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Structured hardscapes LLC",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.luan-allround-service.de/images/logo.png"
            }
          }
        }}
      />
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] min-h-[400px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${post.image}")` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="max-w-4xl text-center">
            <span className="block text-gold-500 font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-4 animate-[fadeInUp_0.8s_ease-out_forwards]">
              Blog & Guides
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-6 animate-[fadeInUp_1s_ease-out_forwards] leading-tight">
              {post.title}
            </h1>
            <p className="text-gray-200 text-lg md:text-xl animate-[fadeInUp_1.2s_ease-out_forwards]">
              {post.excerpt}
            </p>
          </div>
        </div>
      </div>

      {/* Before/After Slider - Only for garden transformation post */}
      {post.slug === 'vorher-nachher-garten-transformation' && (
        <div className="py-12 md:py-16 bg-stone-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <RevealOnScroll>
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-serif text-earth-900 mb-4">
                  Transformation Comparison
                </h2>
                <p className="text-gray-600 text-lg">
                  Drag the slider to see the dramatic change
                </p>
              </div>
            </RevealOnScroll>

          </div>
        </div>
      )}

      {/* Blog Content */}
      <article className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Story Section */}
          <RevealOnScroll>
            <div className="prose prose-lg max-w-none mb-12">
              {post.story.map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-6 text-base md:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </RevealOnScroll>

          {/* Tips Section */}
          <RevealOnScroll delay={200}>
            <div className="my-16 md:my-20">
              <h2 className="text-3xl md:text-4xl font-serif text-earth-900 mb-8 flex items-center">
                <Leaf className="mr-4 text-gold-500" size={32} />
                Tipps & Tricks
              </h2>
              <div className="space-y-6">
                {post.tips.map((tip, index) => (
                  <div key={index} className="bg-stone-50 p-6 md:p-8 border-l-4 border-gold-500 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-serif text-earth-900 mb-3 flex items-center">
                      <CheckCircle className="mr-3 text-gold-500" size={20} />
                      {tip.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed pl-8">
                      {tip.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Q&A Section */}
          <RevealOnScroll delay={400}>
            <div className="my-16 md:my-20">
              <h2 className="text-3xl md:text-4xl font-serif text-earth-900 mb-8 flex items-center">
                <Quote className="mr-4 text-gold-500" size={32} />
                Häufig gestellte Fragen
              </h2>
              <div className="space-y-4">
                {post.qa.map((item, index) => {
                  const isOpen = openQuestions.includes(index);

                  return (
                    <div key={index} className="border border-stone-200 rounded-lg overflow-hidden hover:border-gold-500 transition-colors">
                      <button
                        onClick={() => toggleQuestion(index)}
                        className="w-full text-left p-6 bg-white hover:bg-stone-50 transition-colors flex items-center justify-between group"
                      >
                        <h3 className="text-lg md:text-xl font-bold text-earth-900 pr-4 group-hover:text-gold-600 transition-colors">
                          Q: {item.question}
                        </h3>
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center text-white transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
                      >
                        <div className="p-6 pt-0 bg-stone-50">
                          <p className="text-gray-700 leading-relaxed pl-6 border-l-2 border-gold-500">
                            <strong className="text-gold-600">A:</strong> {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </RevealOnScroll>

          {/* Call to Action */}
          <RevealOnScroll delay={600}>
            <div className="mt-16 md:mt-20 p-8 md:p-12 bg-earth-900 text-white text-center rounded-lg">
              <h3 className="text-2xl md:text-3xl font-serif mb-4">Have questions or want to start a project?</h3>
              <p className="text-gray-300 mb-6 md:mb-8">
                As your local hardscaping expert in Snohomish County, I am here to help with advice and action.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="tel:+14258709414" className="inline-flex items-center px-8 py-4 bg-gold-500 hover:bg-gold-600 text-earth-900 font-bold uppercase tracking-widest transition-colors">
                  <Phone className="mr-2" size={20} />
                  +1 425-870-9414
                </a>
                <Link to={NavigationLinks.CONTACT} className="inline-flex items-center px-8 py-4 border-2 border-white hover:bg-white hover:text-earth-900 font-bold uppercase tracking-widest transition-colors">
                  Contact Us
                </Link>
              </div>
              <p className="mt-6 text-sm text-gray-400">
                Structured hardscapes LLC<br />
                Snohomish County, WA
              </p>
            </div>
          </RevealOnScroll>

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Link to="/blog" className="inline-flex items-center text-gold-500 hover:text-gold-600 font-bold uppercase tracking-widest text-sm transition-colors">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </article>
    </>
  );
};

const FullGalleryPage = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // SEO effect
  useEffect(() => {
    document.title = "Gallery – Our Work in Pictures | Structured hardscapes LLC";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', "Browse through our image gallery: Retaining walls, garden design, before-after pictures and more from Snohomish County and surroundings.");
  }, []);

  const allGalleryImages: ProjectImage[] = [
    { id: '1', url: img1, title: '' },
    { id: '2', url: img2, title: '' },
    { id: '3', url: img3, title: '' },
    { id: '4', url: img4, title: '' },
    { id: '5', url: img5, title: ' ' },
    { id: '6', url: img6, title: '' },
    { id: '7', url: img7, title: '' },
    { id: '8', url: img8, title: '' },
    { id: '9', url: img9, title: '' },
    { id: '10', url: img10, title: ' ' },
    { id: '11', url: img11, title: '' },
    { id: '12', url: img12, title: '' },
  ];

  // Display only 16 images initially, or all if expanded
  const displayedImages = isExpanded ? allGalleryImages : allGalleryImages.slice(0, 16);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;

      if (e.key === 'ArrowLeft' && selectedImageIndex > 0) {
        setSelectedImageIndex(selectedImageIndex - 1);
      } else if (e.key === 'ArrowRight' && selectedImageIndex < allGalleryImages.length - 1) {
        setSelectedImageIndex(selectedImageIndex + 1);
      } else if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, allGalleryImages.length]);

  // Touch swipe support for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (selectedImageIndex === null) return;

    if (isLeftSwipe && selectedImageIndex < allGalleryImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
    if (isRightSwipe && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  return (
    <>
      <PageHeader
        title="Our Gallery"
        subtitle="Elegant projects"
        image="https://images.unsplash.com/photo-1557429287-b2e26467fc2b?q=80&w=2000&auto=format&fit=crop&quot"
      />

      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        {/* Grid Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: `url('./images/grid.png')`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px'
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealOnScroll>
            <SectionTitle subtitle="full portfolio" title="20+ Premium Landscaping Projects" align="center" />
          </RevealOnScroll>

          {/* Masonry-Style Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-12">
            {displayedImages.map((img, index) => (
              <RevealOnScroll key={img.id} delay={index * 30}>
                <div
                  className="group relative overflow-hidden aspect-square cursor-pointer rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={String(img.url)}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-earth-900/90 via-earth-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-end p-6">
                    <h4 className="text-white font-serif font-bold text-lg text-center mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img.title}</h4>
                    <button className="px-4 py-2 bg-gold-500 hover:bg-gold-600 text-earth-900 font-bold uppercase text-xs tracking-widest rounded-full transition-all transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-500">
                      View
                    </button>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Show More Button */}
          {!isExpanded && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setIsExpanded(true)}
                className="px-8 md:px-12 py-4 md:py-5 bg-gold-500 hover:bg-gold-600 text-earth-900 font-bold uppercase tracking-widest rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
              >
                See more
              </button>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-20 md:mt-28 p-8 md:p-12 bg-stone-50 border-l-4 border-gold-500 rounded-lg">
            <div className="max-w-3xl">
              <h3 className="text-2xl md:text-3xl font-serif text-earth-900 mb-4">Get Inspired</h3>
              <p className="text-gray-600 text-base md:text-lg mb-6 leading-relaxed">
                Every project in this gallery showcases our commitment to quality craftsmanship and beautiful design. From custom pavers and hardscaping to lush plant installations and professional concrete work – discover the possibilities for transforming your outdoor space in Denver and surrounding areas.
              </p>
              <Link to={NavigationLinks.CONTACT} className="inline-block px-8 py-3 bg-earth-900 text-white font-bold uppercase tracking-widest hover:bg-gold-500 hover:text-earth-900 transition-colors rounded-lg">
                Request A Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal with Navigation */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImageIndex(null)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Main Image */}
            <img
              src={String(allGalleryImages[selectedImageIndex].url)}
              alt={allGalleryImages[selectedImageIndex].title}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Close Button */}
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-4 right-4 text-white text-4xl hover:text-gold-500 transition-colors bg-black/50 rounded-full w-12 h-12 flex items-center justify-center z-10"
              aria-label="Close"
            >
              ×
            </button>

            {/* Previous Button */}
            {selectedImageIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex(selectedImageIndex - 1);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gold-500 transition-colors bg-black/50 rounded-full w-14 h-14 flex items-center justify-center z-10"
                aria-label="Previous Image"
              >
                ‹
              </button>
            )}

            {/* Next Button */}
            {selectedImageIndex < allGalleryImages.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex(selectedImageIndex + 1);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gold-500 transition-colors bg-black/50 rounded-full w-14 h-14 flex items-center justify-center z-10"
                aria-label="Next Image"
              >
                ›
              </button>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
              {selectedImageIndex + 1} / {allGalleryImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Component to handle scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Component for SEO Metadata
const PageMeta: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  useEffect(() => {
    document.title = title;
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
  }, [title, description]);
  return null;
};

// Location Page Router Component
const LocationPageRouter = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const location = getLocationBySlug(citySlug || '');

  // Track location page view
  // useEffect(() => {
  //   if (location) {
  //     analytics.trackLocationView(location.city);
  //   }
  // }, [location]);

  if (!location) {
    return <Navigate to="/" replace />;
  }

  return <LocationPage location={location} />;
};

const App = () => {
  // Initialize Lenis smooth scroll on app mount
  useEffect(() => {
    // analytics.init(); // Commented out - analytics module not available

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ScrollToTop />

      <div className="flex flex-col min-h-screen overflow-x-hidden font-sans text-earth-900 selection:bg-gold-500 selection:text-white bg-stone-50">
        <style>{`
          html.lenis, html.lenis body {
            height: auto;
          }
          .lenis.lenis-smooth {
            scroll-behavior: auto !important;
          }
          .lenis.lenis-smooth [data-lenis-prevent] {
            overscroll-behavior: contain;
          }
          .lenis.lenis-stopped {
            overflow: hidden;
          }
          .lenis.lenis-scrolling iframe {
            pointer-events: none;
          }
        `}</style>
        <AnimationStyles />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path={NavigationLinks.HOME} element={<HomePage />} />
            <Route path={NavigationLinks.SERVICES} element={<ServicesPage />} />
            <Route path={NavigationLinks.PROJECTS} element={<ProjectsPage />} />
            <Route path={NavigationLinks.GALLERY} element={<FullGalleryPage />} />
            {/* Blog section temporarily disabled */}
            {/* <Route path={NavigationLinks.BLOG} element={<BlogListPage />} /> */}
            {/* <Route path="/blog/:slug" element={<BlogPostPage />} /> */}
            <Route path={NavigationLinks.ABOUT} element={<AboutPage />} />
            <Route path={NavigationLinks.CONTACT} element={<ContactPage />} />
            {/* Location-specific landing pages for SEO */}
            <Route path="/standorte/:citySlug" element={<LocationPageRouter />} />
          </Routes>
        </main>
        <Footer />

        {/* Global Phone Button & CTA */}
        <div className="fixed bottom-6 right-6 z-50 flex items-center justify-end pointer-events-none">
          {/* CTA Text with Arrow - visible on all devices */}
          <div className="flex items-center mr-3 md:mr-4 pointer-events-auto animate-[fadeIn_0.5s_ease-out_2s_forwards] opacity-0">
            <div className="bg-white px-3 py-2 md:px-4 md:py-3 rounded-lg shadow-xl relative">
              <span className="text-earth-900 font-bold text-xs md:text-sm whitespace-nowrap">Have questions? Call us!</span>
              {/* Arrow pointing to the button */}
              <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-l-[8px] border-l-white border-b-[6px] border-b-transparent"></div>
            </div>
          </div>

          <a
            href="tel:+14258709414"
            className="bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform pointer-events-auto relative group"
            aria-label="Call Us"
          >
            <img src={img26} alt="Call Us" className="w-10 h-10 relative z-10 animate-wiggle" />
            {/* Pulse Animation */}
            <div className="absolute inset-0 rounded-full bg-gold-400 opacity-20 animate-ping"></div>
          </a>
        </div>
      </div>
    </Router>
  );
};

export default App;