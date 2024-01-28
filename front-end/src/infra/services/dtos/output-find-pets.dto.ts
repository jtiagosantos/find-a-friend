import { DependenceLevel } from '../enums/dependence-level.enum';
import { Size } from '../enums/size.enum';
import { Species } from '../enums/species.enum';

export type OutputFindPetsDTO = Array<{
  id: string;
  name: string;
  about: string;
  age: number;
  species: Species;
  energy: number;
  size: Size;
  dependenceLevel: DependenceLevel;
  photos: Array<Photo>;
  requirementsForAdoption: Array<RequirementsForAdoption>;
}>;

type Photo = {
  id: string;
  source: string;
};

type RequirementsForAdoption = {
  id: string;
  requirement: string;
};
