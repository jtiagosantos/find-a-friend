import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UpdatePetRequirementsForAdoptionDTO {
  @IsArray()
  @IsString({ each: true, message: 'Each element of the array must be a string' })
  @IsNotEmpty({ each: true, message: 'Each string of the array must be no empty' })
  requirementsForAdoption: Array<string>;
}
