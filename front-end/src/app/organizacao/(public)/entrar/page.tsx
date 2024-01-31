'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitHandler } from 'react-hook-form';

import { OrganizationService } from '@/infra/services/organization.service';
import { InvalidCredentialsError } from '@/infra/services/errors/invalid-credentials.error';

import { useToast } from '@/shared/components/ui/use-toast';

import { InputField } from '@/shared/components/input-field';
import { Button } from '@/shared/components/button';

import { authenticateSchema, AuthenticateData } from './authenticate.schema';

const organizationService = new OrganizationService();

export default function SignInPage() {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AuthenticateData>({
    resolver: zodResolver(authenticateSchema),
  });
  const { mutate: signInOrganization } = useMutation({
    mutationFn: (data: AuthenticateData) => {
      return organizationService.authenticate(data);
    },
    onError: (error) => {
      if (error instanceof InvalidCredentialsError) {
        setError('email', { message: 'Credencial inválida' });
        setError('password', { message: 'Credencial inválida' });
      } else {
        toast({
          title: '❌ Falha na autenticação da organização',
          description: 'Houve um erro inesperado na autenticação organização :(',
        });
      }
    },
    onSuccess: () => {
      router.push('/organizacao/pets');
    },
  });

  const handleSignIn: SubmitHandler<AuthenticateData> = (data) => {
    signInOrganization(data);
  };

  return (
    <>
      <h1 className="font-bold text-[54px] text-[#0D3B66] mb-[100px]">Boas-vindas!</h1>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <InputField.Root>
          <InputField.Label htmlFor="email">Email</InputField.Label>
          <InputField.Text type="email" id="email" {...register('email')} />
          {errors.email && <InputField.Error>{errors.email.message}</InputField.Error>}
        </InputField.Root>
        <InputField.Root className="mt-4">
          <InputField.Label htmlFor="password">Senha</InputField.Label>
          <InputField.SecurityText
            id="password"
            className="pr-14"
            {...register('password')}
          />
          {errors.password && (
            <InputField.Error>{errors.password.message}</InputField.Error>
          )}
        </InputField.Root>
        <div className="mt-[60px] flex flex-col gap-5">
          <Button isLoading={isSubmitting}>Login</Button>
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
