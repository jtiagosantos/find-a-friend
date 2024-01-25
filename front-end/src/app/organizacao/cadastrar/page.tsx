import Link from 'next/link';

import { InputField } from '@/shared/components/input-field';
import { Button } from '@/shared/components/button';

export default function SignUpPage() {
  return (
    <>
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
    </>
  );
}
