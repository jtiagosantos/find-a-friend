import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../services/database/prisma.service';
import { RegisterPetInput } from '../inputs/register-pet.input';

@Injectable()
export class RegisterPetService {
  constructor(private readonly prismaService: PrismaService) {}

  public async execute(input: RegisterPetInput) {
    await this.prismaService.pet.create({
      data: {
        name: input.name,
        about: input.about,
        age: input.age,
        species: input.species,
        energy: input.energy,
        size: input.size,
        dependenceLevel: input.dependenceLevel,
        photos: {
          createMany: {
            data: input.photos.map((source) => ({ source })),
          },
        },
        requirementsForAdoption: {
          createMany: {
            data: input.requirementsForAdoption.map((requirement) => ({ requirement })),
          },
        },
        isAvailable: input.isAvailable,
        organizationId: input.organizationId,
      },
    });
  }
}
