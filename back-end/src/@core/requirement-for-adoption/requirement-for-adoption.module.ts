import { Module } from '@nestjs/common';
import { RequirementForAdoptionController } from './requirement-for-adoption.controller';
import { UpdatePetRequirementsForAdoptionService } from './services/update-pet-requirements-for-adoption.service';
import { PetModule } from '../pet/pet.module';
import { AuthModule } from 'src/services/auth/auth.module';
import { PrismaModule } from 'src/services/database/prisma.module';

@Module({
  controllers: [RequirementForAdoptionController],
  providers: [UpdatePetRequirementsForAdoptionService],
  imports: [PrismaModule, AuthModule, PetModule],
})
export class RequirementForAdoptionModule {}
