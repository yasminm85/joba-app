'use client';

import React from 'react';
import { AnimatePresence } from 'motion/react';
import LandingPage from '@/components/views/LandingPage';
import AuthModal from '@/components/common/AuthModal';
import MainPage from '@/components/views/MainPage';
import { useAuthContext } from '@/context/AuthContext';
import { useJobs } from '@/hooks/useJobs';

export default function Home() {
  const { user, authLoading, isModalOpen } = useAuthContext();

  const jobProps = useJobs(user);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FFEFE3] flex items-center justify-center text-xs font-bold uppercase tracking-widest text-[#2D2321]/60">
        Load Page
      </div>
    );
  }

  if (user) {
    return <MainPage {...jobProps} />;
  }

  return (
    <>
      <LandingPage />

      <AnimatePresence>{isModalOpen && <AuthModal />}</AnimatePresence>
    </>
  );
}
