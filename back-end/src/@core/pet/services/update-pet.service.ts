import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../services/database/prisma.service';
import { UpdatePetInput } from '../inputs/update-pet.input';

@Injectable()
export class UpdatePetService {
  constructor(private readonly prismaService: PrismaService) {}

  public async execute(input: UpdatePetInput) {
    await this.prismaService.pet.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
        about: input.about,
        age: input.age,
        species: input.species,
        energy: input.energy,
        size: input.size,
        dependenceLevel: input.dependenceLevel,
        isAvailable: input.isAvailable,
      },
    });
  }
}
