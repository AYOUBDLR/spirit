import React from 'react';
import { ArrowRight, Sparkles, Tag, ShieldCheck } from 'lucide-react';
import voucherImage from '../assets/images/spirit_christmas_store_750_1794623550854.jpg';

interface HalloweenPromotionCardProps {
  onContinue?: () => void;
}

export const HalloweenPromotionCard: React.FC<HalloweenPromotionCardProps> = () => {
  return (
    <div className="relative group">
      {/* Outer Festive Holiday Glow Halo */}
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600/35 via-amber-500/30 to-emerald-600/25 rounded-[28px] blur-xl opacity-85 group-hover:opacity-100 transition duration-500" />

      {/* Main Dark Card Container */}
      <div className="relative bg-[#101722] border border-red-500/35 rounded-[24px] p-3.5 sm:p-4.5 shadow-2xl transition-all duration-300">
        
        {/* Featured Visual Asset */}
        <div className="relative w-full aspect-[16/9] rounded-[18px] overflow-hidden bg-[#131d2b] border border-emerald-900/40 group-hover:border-red-500/40 transition-colors">
          <img
            src={voucherImage}
            alt="Spirit Christmas $750 Discount"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                const fallback = parent.querySelector('.img-fallback');
                if (fallback) fallback.classList.remove('hidden');
              }
            }}
          />

          {/* Styled CSS Fallback in case of asset loading anomaly */}
          <div className="img-fallback hidden absolute inset-0 bg-gradient-to-br from-red-950 via-[#101c18] to-black flex flex-col items-center justify-center p-6 text-center">
            <span className="font-christmas text-4xl text-red-500 tracking-wider">SPIRIT CHRISTMAS</span>
            <span className="text-2xl font-bold text-amber-300 mt-1">$750 DISCOUNT</span>
            <span className="text-xs text-emerald-300/80 mt-2">Available In-Store & Online</span>
          </div>

          {/* Subtle bottom gradient vignette inside image frame */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#101722]/80 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Card Content Section */}
        <div className="pt-4 pb-2 px-1 sm:px-2 space-y-3.5">
          {/* Main Headline */}
          <div className="space-y-1.5">
            <span className="text-xs sm:text-[13px] font-bold text-amber-400 tracking-wider uppercase block">
              You May Be Eligible For A
            </span>
            <h2 className="text-2xl sm:text-[26px] font-extrabold text-white tracking-tight leading-snug">
              $750 Spirit Christmas Discount
            </h2>
            <p className="text-[#a4b1c2] text-sm sm:text-[15px] font-normal leading-relaxed">
              You have the chance to claim a Spirit Christmas holiday discount voucher worth up to $750.
            </p>
          </div>

          {/* Terms requirement text */}
          <p className="text-xs text-[#738294] tracking-wide">
            Terms and eligibility requirements apply.
          </p>

          {/* Large Primary Action Button */}
          <a
            href="https://linkthem.net/?offer_id=5566&aff_id=144361"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-2 py-4 px-6 bg-gradient-to-r from-[#dc2626] to-[#ea580c] hover:from-[#ef4444] hover:to-[#f97316] active:from-[#b91c1c] active:to-[#c2410c] text-white font-extrabold text-base tracking-wider uppercase rounded-2xl flex items-center justify-center gap-2.5 transition-all duration-200 button-glow active:scale-[0.99] shadow-lg shadow-red-950/60 cursor-pointer text-center no-underline"
          >
            <span>CONTINUE</span>
            <ArrowRight className="w-5 h-5 stroke-[2.75]" />
          </a>
        </div>

      </div>
    </div>
  );
};
