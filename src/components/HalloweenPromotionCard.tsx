import React from 'react';
import { ArrowRight, Sparkles, Tag, ShieldCheck } from 'lucide-react';
import voucherImage from '../assets/images/spirit_halloween_store_500_1792396229574.jpg';

interface HalloweenPromotionCardProps {
  onContinue?: () => void;
}

export const HalloweenPromotionCard: React.FC<HalloweenPromotionCardProps> = () => {
  return (
    <div className="relative group">
      {/* Outer Glow Halo matching Screenshot 1 */}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/30 via-orange-500/25 to-purple-600/20 rounded-[28px] blur-xl opacity-80 group-hover:opacity-100 transition duration-500" />

      {/* Main Dark Card Container */}
      <div className="relative bg-[#120f1a] border border-orange-500/30 rounded-[24px] p-3.5 sm:p-4.5 shadow-2xl transition-all duration-300">
        
        {/* Featured Visual Asset */}
        <div className="relative w-full aspect-[16/9] rounded-[18px] overflow-hidden bg-[#1a1426] border border-purple-900/30 group-hover:border-orange-500/40 transition-colors">
          <img
            src={voucherImage}
            alt="Spirit Halloween $500 Discount"
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
          <div className="img-fallback hidden absolute inset-0 bg-gradient-to-br from-purple-950 via-[#181126] to-black flex flex-col items-center justify-center p-6 text-center">
            <span className="font-creepster text-4xl text-orange-500 tracking-wider">SPIRIT HALLOWEEN</span>
            <span className="text-2xl font-bold text-white mt-1">$500 DISCOUNT</span>
            <span className="text-xs text-orange-300/80 mt-2">Available In-Store & Online</span>
          </div>

          {/* Subtle bottom gradient vignette inside image frame */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#120f1a]/80 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Card Content Section */}
        <div className="pt-4 pb-2 px-1 sm:px-2 space-y-3.5">
          {/* Main Headline */}
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-[26px] font-extrabold text-white tracking-tight leading-snug">
              $500 Spirit Halloween Discount
            </h2>
            <p className="text-[#a09baa] text-sm sm:text-[15px] font-normal leading-relaxed">
              Spirit Halloween discount voucher worth up to $500
            </p>
          </div>

          {/* Terms requirement text */}
          <p className="text-xs text-[#716982] tracking-wide">
            Terms and eligibility requirements apply.
          </p>

          {/* Large Primary Action Button */}
          <a
            href="https://linkthem.net/aff_c?offer_id=3280&aff_id=144361"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-2 py-4 px-6 bg-[#ff6200] hover:bg-[#ff7114] active:bg-[#e85800] text-white font-extrabold text-base tracking-wider uppercase rounded-2xl flex items-center justify-center gap-2.5 transition-all duration-200 button-glow active:scale-[0.99] shadow-lg shadow-orange-950/50 cursor-pointer text-center no-underline"
          >
            <span>CONTINUE</span>
            <ArrowRight className="w-5 h-5 stroke-[2.75]" />
          </a>
        </div>

      </div>
    </div>
  );
};
