import { Body, Controller, Post } from '@nestjs/common';
import { RegisterOrganizationDTO } from './dtos/register-organization.dto';
import { RegisterOrganizationService } from './services/register-organization.service';
import { GetOrganizationService } from './services/get-organization.service';
import { OrganizationAlreadyExistsException } from './exceptions/organization-already-exists.exception';
import { HashingService } from 'src/services/hashing/hashing.service';

@Controller('organization')
export class OrganizationController {
  constructor(
    private readonly registerOrganizationService: RegisterOrganizationService,
    private readonly getOrganizationService: GetOrganizationService,
    private readonly hashingService: HashingService,
  ) {}

  @Post('/register')
  async register(@Body() body: RegisterOrganizationDTO) {
    const organizationExists = await this.getOrganizationService.execute({
      email: body.email,
    });

    if (organizationExists) {
      throw new OrganizationAlreadyExistsException();
    }

    await this.registerOrganizationService.execute({
      ...body,
      password: this.hashingService.hash(body.password),
    });
  }
}
