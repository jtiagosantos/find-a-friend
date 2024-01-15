import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/database/prisma.service';
import { FindPetsByOrganizationInput } from '../inputs/find-pets-by-organization.input';

@Injectable()
export class FindPetsByOrganizationService {
  constructor(private readonly prismaService: PrismaService) {}

  public async execute(input: FindPetsByOrganizationInput) {
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
        organizationId: input.organizationId,
      },
    });

    return pets;
  }
}
