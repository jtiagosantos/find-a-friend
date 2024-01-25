import { twMerge } from 'tailwind-merge';
import type { FC, ComponentProps } from 'react';

export const Button: FC<ComponentProps<'button'>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={twMerge(
        'bg-[#0D3B66] w-full rounded-[20px] py-5 text-[#ffffff] text-[20px] font-extrabold',
        className,
      )}
      {...props}>
      {children}
    </button>
  );
};
