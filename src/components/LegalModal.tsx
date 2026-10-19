import React from 'react';
import { X, ShieldAlert, FileText, Lock } from 'lucide-react';

export type LegalDocType = 'privacy' | 'terms' | 'affiliate';

interface LegalModalProps {
  type: LegalDocType | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const contentMap = {
    privacy: {
      title: 'Privacy Policy',
      icon: Lock,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
          <p>
            <strong>Last Updated: October 2026</strong>
          </p>
          <p>
            This Privacy Policy describes how promotional information is collected, used, and shared when visitors access this seasonal voucher discovery portal.
          </p>
          <h4 className="font-bold text-white text-base">1. Information We Collect</h4>
          <p>
            When you participate in voucher redemption promotions, we may request your voluntary contact email, name, and promotional task interaction feedback to facilitate delivery of promotional discount codes and rewards.
          </p>
          <h4 className="font-bold text-white text-base">2. How We Use Information</h4>
          <p>
            Information collected is strictly utilized to deliver qualified discount vouchers, verify eligible offer completion, prevent fraud or duplicate code generation, and improve promotional matching relevance.
          </p>
          <h4 className="font-bold text-white text-base">3. Data Protection</h4>
          <p>
            We implement industry-standard 256-bit encryption safeguards to protect submitted user information from unauthorized access or alteration. We do not sell your personal identifying data to unauthorized third parties.
          </p>
        </div>
      ),
    },
    terms: {
      title: 'Terms & Conditions',
      icon: FileText,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
          <p>
            <strong>Effective Date: October 2026</strong>
          </p>
          <p>
            By viewing and engaging with this promotional portal, you acknowledge and agree to comply with the terms and conditions outlined herein.
          </p>
          <h4 className="font-bold text-white text-base">1. Promotion Eligibility</h4>
          <p>
            Participants must be 18 years of age or older and legal residents of eligible jurisdictions. Promotions are subject to product and seasonal inventory availability.
          </p>
          <h4 className="font-bold text-white text-base">2. Offer Completion Requirements</h4>
          <p>
            Discount vouchers and codes between $100 and $500 require successful completion of the specified number of sponsor activities (e.g., surveys, app reviews, or promotional partner signups) within the allotted timeframe.
          </p>
          <h4 className="font-bold text-white text-base">3. Trademark Notice</h4>
          <p>
            Spirit Halloween and all associated logos, characters, and trademarks are the registered property of Spencer Gifts LLC. This promotional showcase is an independent affiliate matching service and is not operated, directly sponsored, or endorsed by Spirit Halloween.
          </p>
        </div>
      ),
    },
    affiliate: {
      title: 'Affiliate Disclosure',
      icon: ShieldAlert,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
          <p>
            <strong>Material Connection Disclosure</strong>
          </p>
          <p>
            In compliance with FTC guidelines, please be informed that this website operates as an independent promotional discovery and affiliate matching service.
          </p>
          <h4 className="font-bold text-white text-base">1. Compensation Notice</h4>
          <p>
            We may receive affiliate commissions, referral fees, or compensation from third-party sponsors or advertising partners when visitors interact with offers, complete survey qualifications, or click sponsor links featured on this site.
          </p>
          <h4 className="font-bold text-white text-base">2. Editorial & Offer Independence</h4>
          <p>
            While compensation helps maintain and provide access to promotional reward tools, we strive to showcase verified and functional seasonal savings opportunities. Always review individual third-party offer terms prior to completing sponsor activities.
          </p>
        </div>
      ),
    },
  };

  const selected = contentMap[type];
  const Icon = selected.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#14101e] border border-orange-500/30 rounded-[24px] p-6 sm:p-7 shadow-2xl text-white my-8 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#291e3e]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <Icon className="w-4 h-4" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {selected.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#201830] border border-[#3b2b5c] text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto py-5 pr-1 space-y-4 text-neutral-300">
          {selected.body}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#291e3e] flex justify-end">
          <button
            onClick={onClose}
            className="py-2.5 px-5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
