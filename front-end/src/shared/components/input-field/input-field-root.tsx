import { twMerge } from 'tailwind-merge';
import type { ComponentProps, FC } from 'react';

export const InputFieldRoot: FC<ComponentProps<'div'>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={twMerge('flex flex-col gap-2', className)} {...props}>
      {children}
    </div>
  );
};
