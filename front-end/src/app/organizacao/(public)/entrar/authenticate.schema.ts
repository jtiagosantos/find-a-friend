import { z } from 'zod';

export const authenticateSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .email({ message: 'E-mail inválido' }),
  password: z.string().min(1, { message: 'Campo obrigatório' }),
});

export type AuthenticateData = z.infer<typeof authenticateSchema>;
