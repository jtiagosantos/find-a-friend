import { DependenceLevel } from '../enums/dependence-level.enum';
import { Size } from '../enums/size.enum';
import { Species } from '../enums/species.enum';

export interface FindPetsInput {
  filters?: {
    age?: number;
    energy?: number;
    species?: Species;
    size?: Size;
    dependenceLevel?: DependenceLevel;
    city?: string;
  };
}
