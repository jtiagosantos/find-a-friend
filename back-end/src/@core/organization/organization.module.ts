import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { RegisterOrganizationService } from './services/register-organization.service';
import { GetOrganizationService } from './services/get-organization.service';
import { HashingModule } from 'src/services/hashing/hashing.module';
import { PrismaModule } from 'src/services/database/prisma.module';

@Module({
  controllers: [OrganizationController],
  providers: [RegisterOrganizationService, GetOrganizationService],
  imports: [HashingModule, PrismaModule],
})
export class OrganizationModule {}
