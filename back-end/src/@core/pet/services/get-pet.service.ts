import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../services/database/prisma.service';
import { GetPetInput } from '../inputs/get-pet.input';

@Injectable()
export class GetPetService {
  constructor(private readonly prismaService: PrismaService) {}

  public async execute(input: GetPetInput) {
    const pet = await this.prismaService.pet.findUnique({
      where: {
        id: input.id,
      },
      include: {
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
        organization: !!input.organization,
      },
    });

    return pet;
  }
}
