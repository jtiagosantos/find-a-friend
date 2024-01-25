import Image from 'next/image';
import Link from 'next/link';

import { InputField } from '@/shared/components/input-field';
import { Button } from '@/shared/components/button';

import LogoImage from '@/shared/assets/images/logo.svg';
import DogsImage from '@/shared/assets/images/dogs.png';

export default function SignUpPage() {
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
      <div className="max-w-[488px] w-full">
        <h1 className="font-bold text-[54px] text-[#0D3B66] mb-[70px]">
          Cadastre sua organização{' '}
        </h1>
        <form className="flex flex-col gap-4">
          <InputField.Root>
            <InputField.Label htmlFor="ownerName">Nome do Responsável</InputField.Label>
            <InputField.Text type="text" id="ownerName" />
          </InputField.Root>
          <InputField.Root>
            <InputField.Label htmlFor="name">Nome da Organização</InputField.Label>
            <InputField.Text type="text" id="name" />
          </InputField.Root>
          <InputField.Root>
            <InputField.Label htmlFor="email">Email</InputField.Label>
            <InputField.Text type="email" id="email" />
          </InputField.Root>
          <InputField.Root>
            <InputField.Label htmlFor="zipCode">CEP</InputField.Label>
            <InputField.Text type="text" id="zipCode" />
          </InputField.Root>
          <InputField.Root>
            <InputField.Label htmlFor="city">Cidade</InputField.Label>
            <InputField.Text type="text" id="city" />
          </InputField.Root>
          <InputField.Root>
            <InputField.Label htmlFor="state">Estado</InputField.Label>
            <InputField.Text type="text" id="state" />
          </InputField.Root>
          <InputField.Root>
            <InputField.Label htmlFor="address">Endereço</InputField.Label>
            <InputField.Text type="text" id="address" />
          </InputField.Root>
          <InputField.Root>
            <InputField.Label htmlFor="whatsapp">Whatsapp</InputField.Label>
            <InputField.Text type="text" id="whatsapp" />
          </InputField.Root>
          <InputField.Root>
            <InputField.Label htmlFor="password">Senha</InputField.Label>
            <InputField.SecurityText id="password" className="pr-14" />
          </InputField.Root>
          <InputField.Root>
            <InputField.Label htmlFor="confirmPassword">Confirmar Senha</InputField.Label>
            <InputField.SecurityText id="confirmPassword" className="pr-14" />
          </InputField.Root>
          <div className="mt-[32px] flex flex-col gap-5">
            <Button>Cadastrar</Button>
            <Link
              href="/organizacao/entrar"
              className="text-[#0D3B66] text-[20px] font-extrabold w-full text-center underline mt-5">
              Já possui conta?
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
