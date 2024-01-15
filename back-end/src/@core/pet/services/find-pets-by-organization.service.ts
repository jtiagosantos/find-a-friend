import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/database/prisma.service';
import { FindPetsByOrganizationInput } from '../inputs/find-pets-by-organization.input';

@Injectable()
export class FindPetsByOrganizationService {
  constructor(private readonly prismaService: PrismaService) {}

  public async execute(input: FindPetsByOrganizationInput) {
    const pets = await this.prismaService.pet.findMany({
      where: {
        organizationId: input.organizationId,
      },
    });

    return pets;
  }
}
