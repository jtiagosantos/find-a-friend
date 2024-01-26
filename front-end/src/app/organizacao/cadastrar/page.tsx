'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitHandler } from 'react-hook-form';

import { OrganizationService } from '@/infra/services/organization.service';
import { AddressService } from '@/infra/services/address.service';
import { OrganizationAlreadyExistsError } from '@/infra/services/errors/organization-already-exists.error';

import { mask } from '@/shared/helpers/mask';

import { useToast } from '@/shared/components/ui/use-toast';

import { InputField } from '@/shared/components/input-field';
import { Button } from '@/shared/components/button';

import { registerSchema, RegisterData } from './register.schema';

const organizationService = new OrganizationService();
const addressService = new AddressService();

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });
  const { mutate: registerOrganization, isPending } = useMutation({
    mutationFn: (data: RegisterData) => {
      return organizationService.register(data);
    },
    onError: (error) => {
      if (error instanceof OrganizationAlreadyExistsError) {
        toast({
          title: '❌ Falha ao cadastrar a organização',
          description: 'O e-mail informado já está cadastrado :(',
        });
      } else {
        toast({
          title: '❌ Falha ao cadastrar a organização',
          description: 'Houve um erro inesperado no cadastro da organização :(',
        });
      }
    },
    onSuccess: () => {
      toast({
        title: '✅ Organização cadastrada com sucesso',
        description: 'Agora faça login para acessar a sua conta :)',
      });
      router.push('/organizacao/entrar');
    },
  });
  const { mutate: getAddressByZipCode } = useMutation({
    mutationFn: (zipCode: string) => {
      return addressService.getAddressByZipCode({ zipCode });
    },
    onError: () => {
      setError('zipCode', { message: 'CEP inválido' });
      setValue('city', '');
      setValue('state', '');
      setValue('address', '');
    },
    onSuccess: ({ city, state, address }) => {
      clearErrors('zipCode');
      setValue('city', city);
      setValue('state', state);
      setValue('address', address);
    },
  });

  const watchFields = watch(['zipCode', 'phoneNumber']);

  const handleSignUp: SubmitHandler<RegisterData> = (data) => {
    registerOrganization(data);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const [zipCode] = watchFields;

    if (zipCode !== '') {
      timeoutId = setTimeout(() => {
        getAddressByZipCode(zipCode);
      }, 750);
    } else {
      clearErrors('zipCode');
      setValue('city', '');
      setValue('state', '');
      setValue('address', '');
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [watchFields[0]]);

  return (
    <>
      <h1 className="font-bold text-[54px] text-[#0D3B66] mb-[70px]">
        Cadastre sua organização
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleSignUp)}>
        <InputField.Root>
          <InputField.Label htmlFor="ownerName">Nome do Responsável</InputField.Label>
          <InputField.Text type="text" id="ownerName" {...register('ownerName')} />
          {errors.ownerName && (
            <InputField.Error>{errors.ownerName.message}</InputField.Error>
          )}
        </InputField.Root>
        <InputField.Root>
          <InputField.Label htmlFor="name">Nome da Organização</InputField.Label>
          <InputField.Text type="text" id="name" {...register('name')} />
          {errors.name && <InputField.Error>{errors.name.message}</InputField.Error>}
        </InputField.Root>
        <InputField.Root>
          <InputField.Label htmlFor="email">Email</InputField.Label>
          <InputField.Text type="email" id="email" {...register('email')} />
          {errors.email && <InputField.Error>{errors.email.message}</InputField.Error>}
        </InputField.Root>
        <InputField.Root>
          <InputField.Label htmlFor="zipCode">CEP</InputField.Label>
          <InputField.Text
            type="text"
            id="zipCode"
            {...register('zipCode')}
            value={mask.zipCodeMask(watchFields[0] ?? '')}
          />
          {errors.zipCode && (
            <InputField.Error>{errors.zipCode.message}</InputField.Error>
          )}
        </InputField.Root>
        <InputField.Root>
          <InputField.Label htmlFor="city">Cidade</InputField.Label>
          <InputField.Text type="text" id="city" {...register('city')} />
          {errors.city && <InputField.Error>{errors.city.message}</InputField.Error>}
        </InputField.Root>
        <InputField.Root>
          <InputField.Label htmlFor="state">Estado</InputField.Label>
          <InputField.Text type="text" id="state" {...register('state')} />
          {errors.state && <InputField.Error>{errors.state.message}</InputField.Error>}
        </InputField.Root>
        <InputField.Root>
          <InputField.Label htmlFor="address">Endereço</InputField.Label>
          <InputField.Text type="text" id="address" {...register('address')} />
          {errors.address && (
            <InputField.Error>{errors.address.message}</InputField.Error>
          )}
        </InputField.Root>
        <InputField.Root>
          <InputField.Label htmlFor="whatsapp">Whatsapp</InputField.Label>
          <InputField.Text
            type="text"
            id="whatsapp"
            {...register('phoneNumber')}
            value={mask.phoneMask(watchFields[1] ?? '')}
          />
          {errors.phoneNumber && (
            <InputField.Error>{errors.phoneNumber.message}</InputField.Error>
          )}
        </InputField.Root>
        <InputField.Root>
          <InputField.Label htmlFor="password">Senha</InputField.Label>
          <InputField.SecurityText id="password" {...register('password')} />
          {errors.password && (
            <InputField.Error>{errors.password.message}</InputField.Error>
          )}
        </InputField.Root>
        <div className="mt-[32px] flex flex-col gap-5">
          <Button type="submit" isLoading={isPending}>
            Cadastrar
          </Button>
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
