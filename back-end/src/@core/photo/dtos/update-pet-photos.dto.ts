import { ArrayNotEmpty, IsArray, IsString, IsNotEmpty } from 'class-validator';

export class UpdatePetPhotosDTO {
  @IsArray()
  @ArrayNotEmpty({ message: 'photos must be at least one element' })
  @IsString({ each: true, message: 'Each element of the array must be a string' })
  @IsNotEmpty({
    each: true,
    message: 'Each element of the array must be not an empty string',
  })
  photos: Array<string>;
}
