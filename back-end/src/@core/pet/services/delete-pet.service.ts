import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../services/database/prisma.service';
import { DeletePetInput } from '../inputs/delete-pet.input';

@Injectable()
export class DeletePetService {
  constructor(private readonly prismaService: PrismaService) {}

  public async execute(input: DeletePetInput) {
    await this.prismaService.pet.delete({
      where: {
        id: input.id,
      },
    });
  }
}
