import Image from 'next/image';

import LogoImage from '@/shared/assets/images/logo.svg';
import DogsImage from '@/shared/assets/images/dogs.png';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="py-[80px] pl-[112px] flex gap-[136px]">
      <div
        className={`
        bg-[#F15156] 
        rounded-[20px] 
        max-w-[480px] 
        w-full 
        max-h-[620px]
        flex 
        flex-col 
        justify-center 
        items-center 
        gap-[260px] 
        pt-[106px] 
        pb-16
      `}>
        <span>
          <LogoImage />
        </span>
        <Image src={DogsImage.src} width={386} height={195} alt="cachorros" />
      </div>
      <div className="max-w-[488px] w-full">{children}</div>
    </main>
  );
}
