/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HalloweenPromotionCard } from './components/HalloweenPromotionCard';
import { HowItWorksSteps } from './components/HowItWorksSteps';
import { ClaimModal } from './components/ClaimModal';
import { LegalModal, LegalDocType } from './components/LegalModal';
import { SpookyBackground } from './components/SpookyBackground';

export default function App() {
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [claimInitialStep, setClaimInitialStep] = useState(1);
  const [activeLegalModal, setActiveLegalModal] = useState<LegalDocType | null>(null);

  const handleOpenClaim = (step: number = 1) => {
    setClaimInitialStep(step);
    setIsClaimModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0b1017] text-white flex flex-col justify-between selection:bg-red-600 selection:text-white relative">
      {/* Ambient background fog & snow particles */}
      <SpookyBackground />

      {/* Main Content Container - centered card feed matching screenshots */}
      <main className="relative z-10 w-full max-w-[480px] sm:max-w-[510px] mx-auto px-4 pt-6 sm:pt-10 pb-12 flex-1 flex flex-col">
        
        {/* Top Header Section */}
        <header className="mb-4 sm:mb-5">
          {/* Main Title: Today's top PROMOTION */}
          <div className="flex items-center justify-center text-center flex-wrap gap-x-2">
            <h1 className="text-2xl sm:text-[32px] font-black tracking-tight text-white inline-flex items-center gap-2">
              <span>Today's top</span>
              <span className="font-christmas text-[#dc2626] text-3xl sm:text-[40px] tracking-wider uppercase drop-shadow-[0_2px_14px_rgba(220,38,38,0.6)]">
                PROMOTION
              </span>
            </h1>
          </div>

          {/* Subheader: 1 offer live & Updated today */}
          <div className="flex items-center justify-between text-xs sm:text-[13px] text-[#8e9faf] font-medium mt-2 px-1">
            <div className="flex items-center gap-1.5">
              <span>1 offer live</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#dc2626] inline-block animate-pulse shadow-[0_0_8px_#dc2626]" />
              <span>Updated today</span>
            </div>
          </div>
        </header>

        {/* How It Works Section before Claim */}
        <section aria-label="How It Works Guide" className="mb-6">
          <HowItWorksSteps />
        </section>

        {/* Featured Claim Card */}
        <section aria-label="Featured Spirit Christmas Promotion">
          <HalloweenPromotionCard />
        </section>

        {/* Bottom Legal Links & Disclaimers */}
        <footer className="mt-8 pt-4 pb-2 text-center text-xs text-[#718296] space-y-3">
          {/* Links Row matching Screenshot 2 */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-[13px]">
            <button
              onClick={() => setActiveLegalModal('privacy')}
              className="text-[#98a8bc] hover:text-red-400 transition-colors underline-offset-4 hover:underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-[#32455e]" aria-hidden="true">·</span>
            <button
              onClick={() => setActiveLegalModal('terms')}
              className="text-[#98a8bc] hover:text-red-400 transition-colors underline-offset-4 hover:underline cursor-pointer"
            >
              Terms
            </button>
            <span className="text-[#32455e]" aria-hidden="true">·</span>
            <button
              onClick={() => setActiveLegalModal('affiliate')}
              className="text-[#98a8bc] hover:text-red-400 transition-colors underline-offset-4 hover:underline cursor-pointer"
            >
              Affiliate Disclosure
            </button>
          </div>

          {/* Independent Trademark Notice */}
          <p className="text-[11px] text-[#55677d] leading-normal max-w-sm mx-auto">
            Independent promotional directory. Spirit Christmas™ and Spirit Halloween® are registered trademarks of Spencer Gifts LLC.
          </p>
        </footer>

      </main>

      {/* Interactive Voucher Claim & Reward Flow Modal */}
      <ClaimModal
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
        initialStep={claimInitialStep}
      />

      {/* Legal & Compliance Modal */}
      <LegalModal
        type={activeLegalModal}
        onClose={() => setActiveLegalModal(null)}
      />
    </div>
  );
}
