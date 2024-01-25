import Image from 'next/image';
import Link from 'next/link';

import { InputField } from '@/shared/components/input-field';
import { Button } from '@/shared/components/button';

import LogoImage from '@/shared/assets/images/logo.svg';
import DogsImage from '@/shared/assets/images/dogs.png';

export default function SignInPage() {
  return (
    <main className="py-[80px] pl-[112px] flex gap-[136px]">
      <div
        className={`
        bg-[#F15156] 
        rounded-[20px] 
        max-w-[480px] 
        w-full 
        flex 
        flex-col 
        justify-center 
        items-center 
        gap-[260px] 
        pt-[106px] 
        pb-10
      `}>
        <LogoImage />
        <Image src={DogsImage.src} width={386} height={195} alt="cachorros" />
      </div>
      <div className="max-w-[488px] w-full">
        <h1 className="font-bold text-[54px] text-[#0D3B66] mb-[100px]">Boas-vindas!</h1>
        <form>
          <InputField.Root>
            <InputField.Label htmlFor="email">Email</InputField.Label>
            <InputField.Text type="email" id="email" />
          </InputField.Root>
          <InputField.Root className="mt-4">
            <InputField.Label htmlFor="password">Senha</InputField.Label>
            <InputField.SecurityText id="password" className="pr-14" />
          </InputField.Root>
          <div className="mt-[60px] flex flex-col gap-5">
            <Button>Login</Button>
            <Link
              href="/cadastrar"
              className="text-[#0D3B66] text-[20px] font-extrabold py-5 w-full bg-[#F5F8FA] rounded-[20px] text-center">
              Cadastrar minha organização
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
