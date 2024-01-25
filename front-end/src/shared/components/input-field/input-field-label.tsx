import { twMerge } from 'tailwind-merge';
import type { ComponentProps, FC } from 'react';

export const InputFieldLabel: FC<ComponentProps<'label'>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <label
      className={twMerge('font-semibold text-base text-[#0D3B66]', className)}
      {...props}>
      {children}
    </label>
  );
};
