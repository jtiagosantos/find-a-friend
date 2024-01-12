import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { PrismaService } from 'src/services/database/prisma.service';
import { RegisterOrganizationService } from './services/register-organization.service';
import { GetOrganizationService } from './services/get-organization.service';
import { HashingModule } from 'src/services/hashing/hashing.module';

@Module({
  controllers: [OrganizationController],
  providers: [PrismaService, RegisterOrganizationService, GetOrganizationService],
  imports: [HashingModule],
})
export class OrganizationModule {}
