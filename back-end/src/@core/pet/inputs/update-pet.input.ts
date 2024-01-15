import { DependenceLevel } from '../enums/dependence-level.enum';
import { Size } from '../enums/size.enum';
import { Species } from '../enums/species.enum';

export interface UpdatePetInput {
  id: string;
  name?: string;
  about?: string;
  age?: number;
  species?: Species;
  energy?: number;
  size?: Size;
  dependenceLevel?: DependenceLevel;
  isAvailable?: boolean;
}
