import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../services/database/prisma.service';
import { UpdatePetRequirementsForAdoptionInput } from '../inputs/update-pet-requirements-for-adoption.input';

@Injectable()
export class UpdatePetRequirementsForAdoptionService {
  constructor(private readonly prismaService: PrismaService) {}

  public async execute(input: UpdatePetRequirementsForAdoptionInput) {
    await this.prismaService.$transaction([
      this.prismaService.requirementsForAdoption.deleteMany({
        where: {
          petId: input.petId,
        },
      }),
      this.prismaService.requirementsForAdoption.createMany({
        data: input.requirementsForAdoption.map((requirement) => ({
          petId: input.petId,
          requirement,
        })),
      }),
    ]);
  }
}
