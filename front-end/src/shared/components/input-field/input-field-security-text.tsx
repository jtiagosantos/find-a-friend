'use client';

import { twMerge } from 'tailwind-merge';
import { forwardRef, useState } from 'react';
import type { ComponentProps } from 'react';

import EyeIcon from '@/shared/assets/icons/eye.svg';
import EyeSlashIcon from '@/shared/assets/icons/eye-slash.svg';

export const InputFieldSecurityText = forwardRef<
  HTMLInputElement,
  ComponentProps<'input'>
>(({ className, ...props }, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisible = () => setIsVisible((prevState) => !prevState);

  return (
    <div className="relative">
      <input
        ref={ref}
        type={isVisible ? 'text' : 'password'}
        className={twMerge(
          `
            border-[1px] 
            border-[#D3E2E5] 
            text-[#0D3B66]  
            text-[18px] 
            w-full 
            p-[16px]
            rounded-[10px] 
            outline-[#0D3B66]
            bg-[#F5F8FA]
        `,
          className,
        )}
        {...props}
      />
      <button
        type="button"
        onClick={toggleVisible}
        className="absolute right-[20px] top-[14px]">
        {isVisible ? <EyeSlashIcon /> : <EyeIcon />}
      </button>
    </div>
  );
});
