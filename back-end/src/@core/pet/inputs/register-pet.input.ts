import { DependenceLevel } from '../enums/dependence-level.enum';
import { Size } from '../enums/size.enum';
import { Species } from '../enums/species.enum';

export interface RegisterPetInput {
  name: string;
  about: string;
  age: number;
  species: Species;
  energy: number;
  size: Size;
  dependenceLevel: DependenceLevel;
  photos: Array<string>;
  requirementsForAdoption: Array<string>;
  organizationId: string;
}
