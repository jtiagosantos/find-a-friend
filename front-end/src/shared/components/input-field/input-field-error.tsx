import { twMerge } from 'tailwind-merge';
import type { ComponentProps, FC } from 'react';

export const InputFieldError: FC<ComponentProps<'span'>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <span
      className={twMerge('text-[#F15156] font-medium text-sm -mt-[6px]', className)}
      {...props}>
      {children}
    </span>
  );
};
