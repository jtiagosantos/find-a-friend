import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../services/database/prisma.service';
import { RegisterOrganizationInput } from '../inputs/register-organization.input';

@Injectable()
export class RegisterOrganizationService {
  constructor(private readonly prismaService: PrismaService) {}

  public async execute(input: RegisterOrganizationInput) {
    await this.prismaService.organization.create({
      data: {
        ownerName: input.ownerName,
        name: input.name,
        email: input.email,
        passwordHash: input.password,
        phoneNumber: input.phoneNumber,
        address: input.address,
        zipCode: input.zipCode,
        city: input.city,
        state: input.state,
      },
    });
  }
}
