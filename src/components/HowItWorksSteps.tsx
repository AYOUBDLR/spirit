import React from 'react';
import { Navigation, ClipboardList, ListChecks, CheckCircle2 } from 'lucide-react';

interface HowItWorksStepsProps {
  onStepClick?: (stepNumber: number) => void;
}

export const HowItWorksSteps: React.FC<HowItWorksStepsProps> = () => {
  const steps = [
    {
      num: 1,
      title: 'Tap the button continue',
      description: 'Click on the button above to get started',
      icon: Navigation,
      iconRotate: 'rotate-45',
    },
    {
      num: 2,
      title: 'Enter your email address',
      description: 'To receive your discount code on your email',
      icon: ClipboardList,
      iconRotate: '',
    },
    {
      num: 3,
      title: 'Complete 2–3 simple offers',
      description: 'The more you do, the more you earn',
      icon: ListChecks,
      iconRotate: '',
    },
  ];

  return (
    <div className="w-full mt-7 space-y-3.5">
      {/* Section Header */}
      <div className="flex items-center gap-2 px-1">
        <h3 className="text-xl sm:text-[22px] font-bold text-white tracking-tight flex items-center gap-2">
          How It Works <span className="text-xl select-none">🎃</span>
        </h3>
      </div>

      {/* Step Cards List */}
      <div className="space-y-3">
        {steps.map((step) => {
          const IconComponent = step.icon;
          return (
            <div
              key={step.num}
              className="relative bg-[#13101c] border border-[#261f38] rounded-[20px] p-3.5 sm:p-4 flex items-center justify-between gap-3.5 shadow-md shadow-black/40"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Purple Icon Container with warm amber icon */}
                <div className="w-12 h-12 rounded-[14px] bg-[#221836] border border-[#372658] flex items-center justify-center shrink-0 text-[#f5a623]">
                  <IconComponent className={`w-5 h-5 ${step.iconRotate} stroke-[2.2]`} />
                </div>

                {/* Text Content */}
                <div className="min-w-0">
                  <h4 className="text-[15px] sm:text-base font-bold text-white leading-snug truncate">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#938ba3] leading-relaxed truncate">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Solid Orange Step Badge */}
              <div className="w-8 h-8 rounded-full bg-[#ff6200] text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-sm shadow-orange-950/60 select-none">
                {step.num}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
