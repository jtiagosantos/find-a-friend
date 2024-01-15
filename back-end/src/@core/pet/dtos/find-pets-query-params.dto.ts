import { IsOptional, IsEnum, Min, Max, Validate, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { NumberStringValidator } from '../validators/number-string.validator';
import { Species } from '../enums/species.enum';
import { Size } from '../enums/size.enum';
import { DependenceLevel } from '../enums/dependence-level.enum';

export class FindPetsQueryParamsDTO {
  @IsOptional()
  @Validate(NumberStringValidator)
  @Transform(({ value }) => Number(value))
  age?: number;

  @IsOptional()
  @Min(1, { message: 'energy query params must be greater than or equal to one' })
  @Max(5, { message: 'energy query params must be less than or equal to five' })
  @Validate(NumberStringValidator)
  @Transform(({ value }) => Number(value))
  energy: number;

  @IsOptional()
  @IsEnum(Species, { message: 'species query param must be DOG or CAT' })
  species?: Species;

  @IsOptional()
  @IsEnum(Size, { message: 'size query params must be SMALL or MEDIUM or LARGE' })
  size: Size;

  @IsOptional()
  @IsEnum(DependenceLevel, { message: 'dependenceLevel must be LOW or MEDIUM or HIGHT' })
  dependenceLevel: DependenceLevel;

  @IsOptional()
  @IsString()
  city?: string;
}
