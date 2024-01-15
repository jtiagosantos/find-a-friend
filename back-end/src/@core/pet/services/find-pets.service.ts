import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/database/prisma.service';
import { FindPetsInput } from '../inputs/find-pets.inputs';

@Injectable()
export class FindPetsService {
  constructor(private readonly prismaService: PrismaService) {}

  public async execute({ filters = {} }: FindPetsInput) {
    const { age, energy, species, size, dependenceLevel, city } = filters;

    const pets = await this.prismaService.pet.findMany({
      select: {
        name: true,
        about: true,
        age: true,
        species: true,
        energy: true,
        size: true,
        dependenceLevel: true,
        photos: true,
        requirementsForAdoption: true,
      },
      where: {
        age,
        energy,
        species,
        size,
        dependenceLevel,
        organization: {
          city,
        },
      },
    });

    return pets;
  }
}
