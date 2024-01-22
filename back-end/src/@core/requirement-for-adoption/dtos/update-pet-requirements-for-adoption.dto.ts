import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UpdatePetRequirementsForAdoptionDTO {
  @IsArray()
  @IsString({ each: true, message: 'Each element of the array must be a string' })
  @IsNotEmpty({
    each: true,
    message: 'Each element of the array must be not an empty string',
  })
  requirementsForAdoption: Array<string>;
}
