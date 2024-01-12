import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class AuthenticateOrganizationDTO {
  @IsString()
  @IsNotEmpty({ message: 'email must be not an empty field' })
  @IsEmail({ message: 'email must be a valid email' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'password must be not an empty field' })
  password: string;
}
