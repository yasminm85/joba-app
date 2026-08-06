import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useLandingAnimations({ heroRef, aboutRef, howItWorksRef }) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .from('.hero-heading', { y: 40, opacity: 0, duration: 0.9 })
        .from('.hero-copy', { y: 24, opacity: 0, duration: 0.7 }, '-=0.5')
        .from('.hero-cta', { y: 16, opacity: 0, duration: 0.6 }, '-=0.4')
        .from('.hero-visual', { x: 40, opacity: 0, duration: 0.9 }, '-=0.7');

      gsap.from('.about-heading', {
        scrollTrigger: { trigger: aboutRef.current, start: 'top 75%' },
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
      });

      gsap.from('.about-card', {
        scrollTrigger: { trigger: aboutRef.current, start: 'top 65%' },
        y: 50, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
      });

      // Animasi How It Works Section saat di-scroll
      gsap.from('.steps-heading', {
        scrollTrigger: { trigger: howItWorksRef.current, start: 'top 75%' },
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
      });

      gsap.from('.step-card', {
        scrollTrigger: { trigger: howItWorksRef.current, start: 'top 65%' },
        y: 50, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
      });

      gsap.from('.step-number', {
        scrollTrigger: { trigger: howItWorksRef.current, start: 'top 60%' },
        scale: 0, opacity: 0, duration: 0.5, stagger: 0.15, delay: 0.2, ease: 'back.out(2)',
      });
    });

    return () => ctx.revert();
  }, [heroRef, aboutRef, howItWorksRef]);
}