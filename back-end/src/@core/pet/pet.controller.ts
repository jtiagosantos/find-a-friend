import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RegisterPetDTO } from './dtos/register-pet.dto';
import { RegisterPetService } from './services/register-pet.service';
import { Organization } from '../organization/decorators/organization.decorator';
import { OrganizationData } from '../organization/types/organization-data.type';
import { AuthGuard } from 'src/services/auth/auth.guard';

@Controller('pet')
export class PetController {
  constructor(private readonly registerPetService: RegisterPetService) {}

  @UseGuards(AuthGuard)
  @Post('/register')
  public async register(
    @Body() body: RegisterPetDTO,
    @Organization() organization: OrganizationData,
  ) {
    await this.registerPetService.execute({
      ...body,
      organizationId: organization.id,
    });
  }
}
