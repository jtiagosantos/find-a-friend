import { IsString, IsNotEmpty, IsEmail, MinLength, IsPhoneNumber } from 'class-validator';

export class RegisterOrganizationDTO {
  @IsString()
  @IsNotEmpty({ message: 'ownerName must be not an empty field' })
  ownerName: string;

  @IsString()
  @IsNotEmpty({ message: 'name must be not an empty field' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'email must be not an empty field' })
  @IsEmail({ message: 'email must be a valid email' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'password must be not an empty field' })
  @MinLength(6, { message: 'password must be at least six digits' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'phoneNumber must be not an empty field' })
  @IsPhoneNumber('BR', { message: 'phoneNumber must be a valid phone number' })
  phoneNumber: string;

  @IsString()
  @IsNotEmpty({ message: 'address must be not an empty field' })
  address: string;

  @IsString()
  @IsNotEmpty({ message: 'zipCode must be not an empty field' })
  zipCode: string;

  @IsString()
  @IsNotEmpty({ message: 'city must be not an empty field' })
  city: string;

  @IsString()
  @IsNotEmpty({ message: 'state must be not an empty field' })
  state: string;
}
