import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { UpdatePetPhotosService } from './services/update-pet-photos.service';
import { PrismaModule } from '../../services/database/prisma.module';
import { AuthModule } from '../../services/auth/auth.module';
import { PetModule } from '../pet/pet.module';

@Module({
  controllers: [PhotoController],
  providers: [UpdatePetPhotosService],
  imports: [PrismaModule, AuthModule, PetModule],
})
export class PhotoModule {}
