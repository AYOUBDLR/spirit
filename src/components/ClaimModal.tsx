import React, { useState, useEffect } from 'react';
import { 
  X, Check, ArrowRight, ShieldCheck, Mail, Sparkles, 
  ExternalLink, Copy, CheckCircle, Clock, Gift, Lock, RefreshCw, AlertCircle
} from 'lucide-react';
import voucherImage from '../assets/images/spirit_christmas_store_750_1794623550854.jpg';

interface ClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStep?: number;
}

export const ClaimModal: React.FC<ClaimModalProps> = ({ isOpen, onClose, initialStep = 1 }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTier, setSelectedTier] = useState<number>(750);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [emailError, setEmailError] = useState('');

  // Offer wall progress
  const [completedOffers, setCompletedOffers] = useState<number[]>([]);
  const [activeQuizStep, setActiveQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [isVerifyingApp, setIsVerifyingApp] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Countdown timer for claimed voucher
  const [timeLeft, setTimeLeft] = useState(86400); // 24 hours

  useEffect(() => {
    if (isOpen) {
      if (initialStep === 2 && email) {
        setCurrentStep(2);
      } else {
        // Keep current or reset
      }
    }
  }, [isOpen, initialStep]);

  useEffect(() => {
    if (currentStep === 3) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentStep]);

  if (!isOpen) return null;

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setEmailError('');
    setCurrentStep(2);
  };

  const requiredOffersCount = selectedTier === 100 ? 1 : selectedTier === 250 ? 2 : 3;

  const handleToggleOffer = (offerId: number) => {
    if (completedOffers.includes(offerId)) return;
    setCompletedOffers([...completedOffers, offerId]);
  };

  const handleQuizAnswer = (answer: string) => {
    const updated = [...quizAnswers, answer];
    setQuizAnswers(updated);
    if (updated.length >= 3) {
      handleToggleOffer(1);
    } else {
      setActiveQuizStep(activeQuizStep + 1);
    }
  };

  const handleAppVerification = () => {
    setIsVerifyingApp(true);
    setTimeout(() => {
      setIsVerifyingApp(false);
      handleToggleOffer(2);
    }, 1500);
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(`SPIRIT-${selectedTier}-HALO-${Math.floor(1000 + Math.random() * 9000)}`);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-[#14101e] border border-orange-500/40 rounded-[26px] p-5 sm:p-7 shadow-2xl text-white my-8 overflow-hidden"
        style={{
          boxShadow: '0 0 60px -10px rgba(255, 98, 0, 0.35)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#201830] border border-[#3b2b5c] text-neutral-300 hover:text-white hover:bg-[#2c2244] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Breadcrumb / Steps Tracker */}
        <div className="flex items-center justify-between border-b border-[#291e3e] pb-4 mb-5 pr-8">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-500 text-black text-xs font-black flex items-center justify-center">
              {currentStep}
            </span>
            <span className="text-sm font-bold text-orange-400">
              {currentStep === 1 && 'Step 1: Select Tier & Email'}
              {currentStep === 2 && 'Step 2: Complete Simple Offers'}
              {currentStep === 3 && 'Step 3: Claim Your Discount Voucher'}
            </span>
          </div>
          <span className="text-xs text-neutral-400">
            {currentStep}/3
          </span>
        </div>

        {/* STEP 1: SELECT TIER & EMAIL */}
        {currentStep === 1 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Claim Your Spirit Halloween Discount
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm mt-1">
                Select your voucher reward amount and enter where you'd like your voucher code delivered.
              </p>
            </div>

            {/* Voucher Tier Selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                Select Voucher Value:
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { value: 100, label: '$100', offers: '1 Deal required' },
                  { value: 250, label: '$250', offers: '2 Deals required', popular: true },
                  { value: 750, label: '$750', offers: '3 Deals required', best: true },
                ].map((tier) => (
                  <button
                    key={tier.value}
                    type="button"
                    onClick={() => setSelectedTier(tier.value)}
                    className={`relative p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      selectedTier === tier.value
                        ? 'bg-orange-500/15 border-orange-500 shadow-md shadow-orange-950/50'
                        : 'bg-[#1b1528] border-[#31244a] hover:border-orange-500/50 text-neutral-300'
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-orange-500 text-black font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Popular
                      </span>
                    )}
                    {tier.best && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-purple-500 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Max Value
                      </span>
                    )}
                    <div className="text-xl font-black text-white">{tier.label}</div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">{tier.offers}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleEmailSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Full Name (Optional for voucher certificate)
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-4 py-3 bg-[#191326] border border-[#35274f] focus:border-orange-500 rounded-xl text-white text-sm outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Email Address <span className="text-orange-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                    placeholder="Enter your best email address..."
                    className="w-full pl-10 pr-4 py-3 bg-[#191326] border border-[#35274f] focus:border-orange-500 rounded-xl text-white text-sm outline-none transition-colors"
                  />
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
                {emailError && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {emailError}
                  </p>
                )}
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="terms-agree"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 accent-orange-500 rounded cursor-pointer"
                />
                <label htmlFor="terms-agree" className="text-[12px] text-neutral-400 leading-tight cursor-pointer">
                  I agree to the promotional program rules and confirm I am eligible to participate in Spirit Halloween offer matching.
                </label>
              </div>

              <button
                type="submit"
                disabled={!agreeTerms}
                className="w-full mt-3 py-3.5 px-6 bg-[#ff6200] hover:bg-[#ff7114] disabled:opacity-50 text-white font-extrabold text-sm tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 transition-all button-glow cursor-pointer"
              >
                <span>CONTINUE TO OFFERS</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 256-Bit SSL Encrypted
                </span>
                <span>•</span>
                <span>Zero Spam Guarantee</span>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: COMPLETE SIMPLE OFFERS */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Unlock Your ${selectedTier} Discount
                </h3>
                <span className="text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full font-bold">
                  {completedOffers.length} of {requiredOffersCount} Complete
                </span>
              </div>
              <p className="text-neutral-400 text-xs sm:text-sm mt-1">
                Complete {requiredOffersCount} simple sponsor tasks below to generate your unique voucher code for <strong className="text-white">{email}</strong>.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#201830] h-2.5 rounded-full overflow-hidden border border-[#3b2b5c]">
              <div 
                className="bg-gradient-to-r from-orange-500 to-amber-400 h-full transition-all duration-500 ease-out"
                style={{ width: `${Math.min(100, (completedOffers.length / requiredOffersCount) * 100)}%` }}
              />
            </div>

            {/* Task 1: Spooky Persona Quiz */}
            <div className={`p-4 rounded-2xl border transition-all ${
              completedOffers.includes(1) 
                ? 'bg-emerald-950/20 border-emerald-500/40' 
                : 'bg-[#181324] border-[#342650]'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎃</span>
                  <h4 className="font-bold text-sm text-white">
                    Task 1: Spirit Halloween Costume Quiz
                  </h4>
                </div>
                {completedOffers.includes(1) ? (
                  <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold bg-emerald-500/20 px-2.5 py-1 rounded-full">
                    <Check className="w-3.5 h-3.5 stroke-[3]" /> Completed
                  </span>
                ) : (
                  <span className="text-xs text-orange-400 font-semibold bg-orange-500/10 px-2.5 py-0.5 rounded-full">
                    30 seconds
                  </span>
                )}
              </div>

              {!completedOffers.includes(1) ? (
                <div className="mt-3 bg-[#110d1a] p-3 rounded-xl border border-[#2b1f42]">
                  {activeQuizStep === 0 && (
                    <div>
                      <p className="text-xs text-neutral-300 font-medium mb-2.5">
                        Q1 of 3: What's your top Halloween costume theme this year?
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {['Classic Monsters / Vampires', 'Pop Culture / Villains', 'Funny / Group Theme', 'Animatronic Props'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleQuizAnswer(opt)}
                            className="px-2.5 py-2 text-xs font-medium rounded-lg bg-[#1f1730] hover:bg-orange-500/20 hover:border-orange-500/50 border border-[#372658] text-neutral-200 hover:text-white transition-colors text-left"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeQuizStep === 1 && (
                    <div>
                      <p className="text-xs text-neutral-300 font-medium mb-2.5">
                        Q2 of 3: Where do you plan to celebrate Halloween?
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {['Haunted House / Party', 'Trick or Treating', 'Hosting at Home', 'Halloween Movie Night'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleQuizAnswer(opt)}
                            className="px-2.5 py-2 text-xs font-medium rounded-lg bg-[#1f1730] hover:bg-orange-500/20 hover:border-orange-500/50 border border-[#372658] text-neutral-200 hover:text-white transition-colors text-left"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeQuizStep === 2 && (
                    <div>
                      <p className="text-xs text-neutral-300 font-medium mb-2.5">
                        Q3 of 3: Are you shopping online or at a local Spirit Halloween store?
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {['Local Spirit Store', 'SpiritHalloween.com Online', 'Both In-Store & Online', 'Just browsing'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleQuizAnswer(opt)}
                            className="px-2.5 py-2 text-xs font-medium rounded-lg bg-[#1f1730] hover:bg-orange-500/20 hover:border-orange-500/50 border border-[#372658] text-neutral-200 hover:text-white transition-colors text-left"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-xs text-neutral-400">
                  Costume persona registered! Answers submitted for voucher qualification.
                </p>
              )}
            </div>

            {/* Task 2: Sponsor App Verification */}
            <div className={`p-4 rounded-2xl border transition-all ${
              completedOffers.includes(2) 
                ? 'bg-emerald-950/20 border-emerald-500/40' 
                : 'bg-[#181324] border-[#342650]'
            }`}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📱</span>
                  <h4 className="font-bold text-sm text-white">
                    Task 2: Sponsor Spooky App Review
                  </h4>
                </div>
                {completedOffers.includes(2) ? (
                  <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold bg-emerald-500/20 px-2.5 py-1 rounded-full">
                    <Check className="w-3.5 h-3.5 stroke-[3]" /> Completed
                  </span>
                ) : (
                  <span className="text-xs text-orange-400 font-semibold bg-orange-500/10 px-2.5 py-0.5 rounded-full">
                    1 Click
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400 mb-3">
                Review the featured Halloween Soundboard & Animatronics controller.
              </p>

              {!completedOffers.includes(2) && (
                <button
                  type="button"
                  disabled={isVerifyingApp}
                  onClick={handleAppVerification}
                  className="w-full py-2.5 px-4 bg-[#231a38] hover:bg-orange-500/20 border border-orange-500/40 text-orange-300 hover:text-orange-200 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {isVerifyingApp ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-orange-400" />
                      <span>Verifying interaction...</span>
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Interact & Verify Sponsor Offer</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Task 3: Email Confirmation & Shipping Preference */}
            <div className={`p-4 rounded-2xl border transition-all ${
              completedOffers.includes(3) 
                ? 'bg-emerald-950/20 border-emerald-500/40' 
                : 'bg-[#181324] border-[#342650]'
            }`}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📧</span>
                  <h4 className="font-bold text-sm text-white">
                    Task 3: Confirm Delivery to {email}
                  </h4>
                </div>
                {completedOffers.includes(3) ? (
                  <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold bg-emerald-500/20 px-2.5 py-1 rounded-full">
                    <Check className="w-3.5 h-3.5 stroke-[3]" /> Completed
                  </span>
                ) : (
                  <span className="text-xs text-orange-400 font-semibold bg-orange-500/10 px-2.5 py-0.5 rounded-full">
                    Instant
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400 mb-3">
                Confirm your receipt email to lock in your voucher allocation before timer expires.
              </p>

              {!completedOffers.includes(3) && (
                <button
                  type="button"
                  onClick={() => handleToggleOffer(3)}
                  className="w-full py-2.5 px-4 bg-[#231a38] hover:bg-orange-500/20 border border-orange-500/40 text-orange-300 hover:text-orange-200 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Confirm Email & Lock Code</span>
                </button>
              )}
            </div>

            {/* Finish Action Button */}
            <button
              type="button"
              disabled={completedOffers.length < requiredOffersCount}
              onClick={() => setCurrentStep(3)}
              className="w-full py-4 px-6 bg-[#ff6200] hover:bg-[#ff7114] disabled:opacity-40 disabled:hover:bg-[#ff6200] text-white font-extrabold text-sm tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 transition-all button-glow cursor-pointer"
            >
              <Gift className="w-4 h-4" />
              <span>REVEAL MY ${selectedTier} VOUCHER CODE NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 3: VOUCHER UNLOCKED & CODE REVEAL */}
        {currentStep === 3 && (
          <div className="space-y-5 text-center">
            {/* Header Celebration */}
            <div>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-orange-500/20 border border-orange-500 text-orange-400 mb-2">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-white">
                Promotion Successfully Unlocked!
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm mt-1">
                Your <strong className="text-orange-400">${selectedTier} Spirit Halloween Discount Voucher</strong> is active.
              </p>
            </div>

            {/* Digital Voucher Mockup */}
            <div className="relative bg-gradient-to-br from-[#211636] to-[#130d21] border-2 border-orange-500 rounded-2xl p-4 sm:p-5 shadow-2xl text-left overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-orange-400 tracking-wider uppercase">
                    Official Promotion Pass
                  </span>
                  <div className="font-creepster text-2xl sm:text-3xl text-orange-500 tracking-wider">
                    SPIRIT HALLOWEEN
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl sm:text-3xl font-black text-white">${selectedTier}</div>
                  <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Verified Live</div>
                </div>
              </div>

              {/* Recipient info */}
              <div className="mt-3 pt-3 border-t border-purple-900/40 flex items-center justify-between text-xs text-neutral-300">
                <span>Issued to: <strong className="text-white">{fullName || email.split('@')[0]}</strong></span>
                <span className="text-neutral-400">{new Date().toLocaleDateString()}</span>
              </div>

              {/* Unique Voucher Code Box */}
              <div className="mt-4 p-3 bg-black/60 rounded-xl border border-orange-500/40 flex items-center justify-between gap-2">
                <div className="font-mono text-sm sm:text-base font-bold text-orange-400 tracking-wider select-all truncate">
                  SPIRIT-{selectedTier}-HLWN-9872
                </div>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Barcode Simulation */}
              <div className="mt-4 bg-white p-2.5 rounded-lg flex flex-col items-center justify-center">
                <div className="flex items-center justify-center gap-[2px] h-10 w-full overflow-hidden">
                  {[4,2,6,1,3,5,2,4,1,6,3,2,5,1,4,2,6,3,1,5,4,2,6,1,3,4,2,5,1,6,2,4,3,1,5,2,4].map((w, idx) => (
                    <div 
                      key={idx} 
                      className="bg-black h-full"
                      style={{ width: `${w}px` }}
                    />
                  ))}
                </div>
                <div className="font-mono text-[10px] text-neutral-800 tracking-widest mt-1">
                  *98402-SPIRIT-HLWN-{selectedTier}*
                </div>
              </div>
            </div>

            {/* Countdown Expiry */}
            <div className="flex items-center justify-center gap-2 text-xs text-neutral-300">
              <Clock className="w-4 h-4 text-orange-400" />
              <span>Voucher valid for: <strong className="text-orange-400 font-mono font-bold">{formatTime(timeLeft)}</strong></span>
            </div>

            {/* Instructions */}
            <div className="bg-[#181226] p-3.5 rounded-xl border border-[#342650] text-left text-xs text-neutral-300 space-y-1.5">
              <p className="font-bold text-white flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                How to Redeem:
              </p>
              <ul className="list-disc list-inside space-y-1 text-neutral-400 pl-1">
                <li><strong className="text-neutral-300">In-Store:</strong> Show this digital barcode or code at any Spirit Halloween checkout counter.</li>
                <li><strong className="text-neutral-300">Online:</strong> Paste coupon code in promo box during checkout at SpiritHalloween.com.</li>
              </ul>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 px-6 bg-[#261d38] hover:bg-[#32264a] text-neutral-200 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Done & Return to Homepage
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
