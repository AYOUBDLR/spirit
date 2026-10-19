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
    <div className="min-h-screen bg-[#0b0813] text-white flex flex-col justify-between selection:bg-orange-500 selection:text-white relative">
      {/* Ambient background fog & particles */}
      <SpookyBackground />

      {/* Main Content Container - centered card feed matching screenshots */}
      <main className="relative z-10 w-full max-w-[480px] sm:max-w-[510px] mx-auto px-4 pt-6 sm:pt-10 pb-12 flex-1 flex flex-col">
        
        {/* Top Header Section */}
        <header className="mb-4 sm:mb-5">
          {/* Main Title: Today's top PROMOTION */}
          <div className="flex items-center justify-center text-center flex-wrap gap-x-2">
            <h1 className="text-2xl sm:text-[32px] font-black tracking-tight text-white inline-flex items-center gap-2">
              <span>Today's top</span>
              <span className="font-creepster text-[#ff6200] text-3xl sm:text-[38px] tracking-wider uppercase drop-shadow-[0_2px_12px_rgba(255,98,0,0.5)]">
                PROMOTION
              </span>
            </h1>
          </div>

          {/* Subheader: 1 offer live & Updated today */}
          <div className="flex items-center justify-between text-xs sm:text-[13px] text-[#9a91ad] font-medium mt-2 px-1">
            <div className="flex items-center gap-1.5">
              <span>1 offer live</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ff6200] inline-block animate-pulse shadow-[0_0_8px_#ff6200]" />
              <span>Updated today</span>
            </div>
          </div>
        </header>

        {/* Featured Card matching Screenshot 1 */}
        <section aria-label="Featured Spirit Halloween Promotion">
          <HalloweenPromotionCard />
        </section>

        {/* How It Works Section matching Screenshot 2 */}
        <section aria-label="How It Works Guide">
          <HowItWorksSteps />
        </section>

        {/* Bottom Legal Links & Disclaimers */}
        <footer className="mt-8 pt-4 pb-2 text-center text-xs text-[#827a94] space-y-3">
          {/* Links Row matching Screenshot 2 */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-[13px]">
            <button
              onClick={() => setActiveLegalModal('privacy')}
              className="text-[#9e96b3] hover:text-orange-400 transition-colors underline-offset-4 hover:underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-[#493d62]" aria-hidden="true">·</span>
            <button
              onClick={() => setActiveLegalModal('terms')}
              className="text-[#9e96b3] hover:text-orange-400 transition-colors underline-offset-4 hover:underline cursor-pointer"
            >
              Terms
            </button>
            <span className="text-[#493d62]" aria-hidden="true">·</span>
            <button
              onClick={() => setActiveLegalModal('affiliate')}
              className="text-[#9e96b3] hover:text-orange-400 transition-colors underline-offset-4 hover:underline cursor-pointer"
            >
              Affiliate Disclosure
            </button>
          </div>

          {/* Independent Trademark Notice */}
          <p className="text-[11px] text-[#69617d] leading-normal max-w-sm mx-auto">
            Independent promotional directory. Spirit Halloween® is a registered trademark of Spencer Gifts LLC.
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
