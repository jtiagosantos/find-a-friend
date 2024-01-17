import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../services/database/prisma.service';
import { FindPetsByOrganizationInput } from '../inputs/find-pets-by-organization.input';

@Injectable()
export class FindPetsByOrganizationService {
  constructor(private readonly prismaService: PrismaService) {}

  public async execute(input: FindPetsByOrganizationInput) {
    const pets = await this.prismaService.pet.findMany({
      select: {
        id: true,
        name: true,
        about: true,
        age: true,
        species: true,
        energy: true,
        size: true,
        dependenceLevel: true,
        photos: {
          select: {
            id: true,
            source: true,
          },
        },
        requirementsForAdoption: {
          select: {
            id: true,
            requirement: true,
          },
        },
      },
      where: {
        organizationId: input.organizationId,
      },
    });

    return pets;
  }
}
