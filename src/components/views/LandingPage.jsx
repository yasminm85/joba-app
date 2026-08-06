import React, { useState, useRef } from 'react';
import { LogIn, ArrowRight, Briefcase, Sparkles, Layers } from 'lucide-react';
import { useAuthContext } from '@/context/AuthContext';
import Image from 'next/image';
import joba from '../../../public/joba.svg';
import AuthModal from '@/components/common/AuthModal';
import Footer from '../layout/Footer';
import ScanToCardAnimation from '../animations/ScanCardAnimation';
import { useLandingAnimations } from '@/hooks/useLandingAnimations';

const ABOUT_FEATURES = [
  {
    icon: Briefcase,
    bgClass: 'bg-[#FF84BA]/10 text-[#FF84BA]',
    title: 'Shape Your Raw Text',
    desc: 'Transform raw text into structured database entries automatically',
  },
  {
    icon: Sparkles,
    bgClass: 'bg-[#99C2FF]/15 text-[#44ACFF]',
    title: 'Multi Input Support',
    desc: 'Extract text from screenshots and convert it into structured database entries',
  },
  {
    icon: Layers,
    bgClass: 'bg-amber-100 text-amber-600',
    title: 'Integrate With Google Calendar',
    desc: 'Easily schedule and sync interview dates with Google Calendar integration',
  },
];

const WORK_STEPS = [
  {
    step: '1',
    numClass: 'bg-[#FF84BA] text-white',
    title: 'Upload Poster or Text',
    desc: 'Upload a poster or paste text—Joba automatically scans and structures your job applications',
  },
  {
    step: '2',
    numClass: 'bg-[#99C2FF] text-[#44ACFF]',
    title: 'AI Integrations',
    desc: 'Joba automatically scans technical skills, job locations, and other key details',
  },
  {
    step: '3',
    numClass: 'bg-[#FFDF82] text-amber-500',
    title: 'Save and Organize',
    desc: 'Refine job details, customize test schedules, sync with your calendar, and get regular application status updates',
  },
];

export default function LandingPage() {
  const { openAuth } = useAuthContext();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const howItWorksRef = useRef(null);

  useLandingAnimations({ heroRef, aboutRef, howItWorksRef });

  const handleOpenModal = (mode = 'login') => {
    openAuth(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FFEFE3] text-[#2D2321] font-sans selection:bg-[#FF84BA] selection:text-white flex flex-col">
      <header className="w-full bg-[#FF84BA] border-b border-black/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1 bg-white rounded-xl shadow-sm border border-black/5 flex items-center justify-center">
              <Image src={joba} alt="Joba Logo" className="h-9 w-auto object-contain rounded-lg" />
            </div>
          </div>

          <button
            onClick={() => handleOpenModal('login')}
            className="px-4.5 py-2 bg-white hover:bg-gray-50 border border-black/5 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-2 cursor-pointer">
            <LogIn className="w-3.5 h-3.5 text-[#FF84BA]" />
            <span>Login</span>
          </button>
        </div>
      </header>

      <section ref={heroRef} className="bg-[#FFEFE3] py-16 md:py-24 border-b border-black/5">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <h1 className="hero-heading text-4xl md:text-6xl font-black tracking-tight leading-[1.05] uppercase text-[#2D2321]">
              Scan Jobs , <br />
              <span className="text-[#FF84BA]">Shape</span> Your Career
            </h1>

            <p className="hero-copy text-sm md:text-base font-medium text-gray-600 leading-relaxed max-w-xl">
              Turn job screenshots or raw text into a structured application database in seconds
            </p>

            <div className="hero-cta pt-4">
              <button
                onClick={() => handleOpenModal('register')}
                className="px-8 py-4.5 bg-[#FF84BA] hover:bg-[#FF84BA]/95 hover:scale-[1.02] active:scale-98 text-white rounded-2xl font-bold text-sm uppercase tracking-wider shadow-md transition-all flex items-center gap-3 cursor-pointer">
                <span>Start Your Track</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
          <div className="hero-visual lg:col-span-5 flex justify-center lg:justify-end">
            <ScanToCardAnimation />
          </div>
        </div>
      </section>

      <section ref={aboutRef} className="bg-[#FFDF82] py-20 text-[#2D2321] border-b border-black/5">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="about-heading text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight leading-none mt-2">
              Why You Should Try Joba?
            </h2>
            <p className="text-xs md:text-sm font-medium text-[#2D2321]/70 leading-relaxed">
              An innovative platform to simplify job tracking and monitor your entire application process in one smart dashboard
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ABOUT_FEATURES.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="about-card bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-black/5 shadow-sm space-y-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${feat.bgClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800">{feat.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section ref={howItWorksRef} className="bg-[#FF84BA] py-20 text-[#2D2321] flex-1">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="steps-heading text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white leading-none mt-2">
              How It Works?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WORK_STEPS.map((item, idx) => (
              <div key={idx} className="step-card bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-black/5 shadow-sm space-y-4">
                <div className={`step-number w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${item.numClass}`}>
                  {item.step}
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800">{item.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}