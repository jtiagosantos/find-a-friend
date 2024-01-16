import { Module } from '@nestjs/common';
import { OrganizationModule } from './@core/organization/organization.module';
import { PetModule } from './@core/pet/pet.module';
import { PhotoModule } from './@core/photo/photo.module';
import { RequirementForAdoptionModule } from './@core/requirement-for-adoption/requirement-for-adoption.module';

@Module({
  imports: [OrganizationModule, PetModule, PhotoModule, RequirementForAdoptionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
