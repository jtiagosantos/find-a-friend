import { IsString, IsNotEmpty } from 'class-validator';

export class PreSignURLDTO {
  @IsString()
  @IsNotEmpty({ message: 'key must be not an empty string' })
  key: string;

  @IsString()
  @IsNotEmpty({ message: 'contentType must be not an empty string' })
  contentType: string;
}
