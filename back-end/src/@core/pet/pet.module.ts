import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import { RegisterPetService } from './services/register-pet.service';
import { GetPetService } from './services/get-pet.service';
import { FindPetsService } from './services/find-pets.service';
import { DeletePetService } from './services/delete-pet.service';
import { FindPetsByOrganizationService } from './services/find-pets-by-organization.service';
import { UpdatePetService } from './services/update-pet.service';
import { PrismaModule } from '../../services/database/prisma.module';
import { AuthModule } from '../../services/auth/auth.module';

@Module({
  controllers: [PetController],
  providers: [
    RegisterPetService,
    GetPetService,
    FindPetsService,
    FindPetsByOrganizationService,
    DeletePetService,
    UpdatePetService,
  ],
  imports: [PrismaModule, AuthModule],
  exports: [GetPetService],
})
export class PetModule {}
