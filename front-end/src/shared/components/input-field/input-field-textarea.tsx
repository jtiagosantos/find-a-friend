import { twMerge } from 'tailwind-merge';
import { forwardRef } from 'react';
import type { ComponentProps } from 'react';

export const InputFieldTextarea = forwardRef<
  HTMLTextAreaElement,
  ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={twMerge(
        `
          border-[1px] 
          border-[#D3E2E5] 
          text-[#0D3B66]  
          text-[18px] 
          w-full 
          h-[120px]
          p-[16px]
          rounded-[10px] 
          outline-[#0D3B66]
          bg-[#F5F8FA]
          resize-none
      `,
        className,
      )}
      {...props}
    />
  );
});
