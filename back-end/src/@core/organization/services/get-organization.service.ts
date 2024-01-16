import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../services/database/prisma.service';
import { GetOrganizationInput } from '../inputs/get-organization.input';

@Injectable()
export class GetOrganizationService {
  constructor(private readonly prismaService: PrismaService) {}

  public async execute(input: GetOrganizationInput) {
    const organization = await this.prismaService.organization.findUnique({
      where: {
        email: input.email,
      },
    });

    return organization;
  }
}
