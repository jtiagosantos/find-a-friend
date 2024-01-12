import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/database/prisma.service';
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
        organization: input.organization,
      },
    });

    return pet;
  }
}
