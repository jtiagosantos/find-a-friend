import { twMerge } from 'tailwind-merge';
import { ThreeDots } from 'react-loader-spinner';
import type { FC, ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'> & {
  isLoading?: boolean;
};

export const Button: FC<ButtonProps> = ({
  className,
  children,
  isLoading = false,
  ...props
}) => {
  return (
    <button
      disabled={isLoading}
      className={twMerge(
        `
          bg-[#0D3B66] 
          w-full 
          rounded-[20px] 
          py-5 
          text-[#ffffff] 
          text-[20px] 
          font-extrabold 
          flex 
          items-center 
          justify-center 
          disabled:opacity-60
        `,
        className,
      )}
      {...props}>
      {isLoading ? (
        <ThreeDots
          height="30"
          width="40"
          radius="9"
          color="#fff"
          ariaLabel="three-dots-loading"
          visible={true}
        />
      ) : (
        <>{children}</>
      )}
    </button>
  );
};
