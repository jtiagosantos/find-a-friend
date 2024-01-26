import { z } from 'zod';

export const registerSchema = z.object({
  ownerName: z.string().min(1, { message: 'Campo obrigatório' }),
  name: z.string().min(1, { message: 'Campo obrigatório' }),
  email: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .email({ message: 'E-mail inválido' }),
  password: z.string().min(6, { message: 'Minímo de 6 caracteres' }),
  phoneNumber: z
    .string()
    .min(15, { message: 'Número inválido' })
    .refine((value) => value.replace(/[^0-9]/g, '')),
  zipCode: z
    .string()
    .min(9, { message: 'CEP inválido' })
    .refine((value) => value.replace(/[^0-9]/g, '')),
  city: z.string().min(1, { message: 'Campo obrigatório' }),
  state: z.string().min(1, { message: 'Campo obrigatório' }),
  address: z.string().min(1, { message: 'Campo obrigatório' }),
});

export type RegisterData = z.infer<typeof registerSchema>;
