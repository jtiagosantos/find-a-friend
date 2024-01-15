import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsNumber,
  Min,
  Max,
  IsEnum,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { Species } from '../enums/species.enum';
import { Size } from '../enums/size.enum';
import { DependenceLevel } from '../enums/dependence-level.enum';

export class UpdatePetDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'name must be not an empty field' })
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'about must be not an empty field' })
  @MinLength(20, { message: 'about must be at least tewnty characters' })
  about: string;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'age must be greater than or equal to zero' })
  @Max(20, { message: 'age must be less than or equal to twenty' })
  age: number;

  @IsOptional()
  @IsEnum(Species, { message: 'species must be DOG or CAT' })
  species: Species;

  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'energy must be greater than or equal to one' })
  @Max(5, { message: 'energy must be less than or equal to five' })
  energy: number;

  @IsOptional()
  @IsEnum(Size, { message: 'size must be SMALL or MEDIUM or LARGE' })
  size: Size;

  @IsOptional()
  @IsEnum(DependenceLevel, { message: 'dependenceLevel must be LOW or MEDIUM or HIGHT' })
  dependenceLevel: DependenceLevel;

  @IsOptional()
  @IsBoolean()
  isAvailable: boolean;
}
