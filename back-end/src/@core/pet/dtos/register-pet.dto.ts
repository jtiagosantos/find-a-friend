import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsNumber,
  Min,
  Max,
  IsEnum,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { Species } from '../enums/species.enum';
import { Size } from '../enums/size.enum';
import { DependenceLevel } from '../enums/dependence-level.enum';

export class RegisterPetDTO {
  @IsString()
  @IsNotEmpty({ message: 'name must be not an empty field' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'about must be not an empty field' })
  @MinLength(20, { message: 'about must be at least tewnty characters' })
  about: string;

  @IsNumber()
  @Min(0, { message: 'age must be greater than or equal to zero' })
  @Max(20, { message: 'age must be less than or equal to twenty' })
  age: number;

  @IsEnum(Species, { message: 'species must be DOG or CAT' })
  species: Species;

  @IsNumber()
  @Min(1, { message: 'energy must be greater than or equal to one' })
  @Max(5, { message: 'energy must be less than or equal to five' })
  energy: number;

  @IsEnum(Size, { message: 'size must be SMALL or MEDIUM or LARGE' })
  size: Size;

  @IsEnum(DependenceLevel, { message: 'dependenceLevel must be LOW or MEDIUM or HIGHT' })
  dependenceLevel: DependenceLevel;

  @IsArray()
  @ArrayNotEmpty({ message: 'photos must be at least one element' })
  @IsString({ each: true, message: 'Each element of the array must be a string' })
  photos: Array<string>;

  @IsArray()
  @IsString({ each: true, message: 'Each element of the array must be a string' })
  requirementsForAdoption: Array<string>;
}
