import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../services/database/prisma.service';
import { UpdatePetPhotosInput } from '../inputs/update-pet-photos.input';

@Injectable()
export class UpdatePetPhotosService {
  constructor(private readonly prismaService: PrismaService) {}

  public async execute(input: UpdatePetPhotosInput) {
    await this.prismaService.$transaction([
      this.prismaService.petPhoto.deleteMany({
        where: {
          petId: input.petId,
        },
      }),
      this.prismaService.petPhoto.createMany({
        data: input.photos.map((source) => ({
          petId: input.petId,
          source,
        })),
      }),
    ]);
  }
}
