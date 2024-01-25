import { twMerge } from 'tailwind-merge';
import { forwardRef } from 'react';
import type { ComponentProps } from 'react';

export const InputFieldText = forwardRef<HTMLInputElement, ComponentProps<'input'>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
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
    );
  },
);
