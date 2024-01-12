import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import { RegisterPetService } from './services/register-pet.service';
import { GetPetService } from './services/get-pet.service';
import { PrismaModule } from 'src/services/database/prisma.module';
import { AuthModule } from 'src/services/auth/auth.module';

@Module({
  controllers: [PetController],
  providers: [RegisterPetService, GetPetService],
  imports: [PrismaModule, AuthModule],
})
export class PetModule {}
