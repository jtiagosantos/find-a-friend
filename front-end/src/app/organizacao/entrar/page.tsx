import Link from 'next/link';

import { InputField } from '@/shared/components/input-field';
import { Button } from '@/shared/components/button';

export default function SignInPage() {
  return (
    <>
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
            href="/organizacao/cadastrar"
            className="text-[#0D3B66] text-[20px] font-extrabold py-5 w-full bg-[#F5F8FA] rounded-[20px] text-center">
            Cadastrar minha organização
          </Link>
        </div>
      </form>
    </>
  );
}
