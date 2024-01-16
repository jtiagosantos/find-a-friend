import { Body, Controller, HttpCode, Param, Put, UseGuards } from '@nestjs/common';
import { UpdatePetRequirementsForAdoptionDTO } from './dtos/update-pet-requirements-for-adoption.dto';
import { GetPetService } from '../pet/services/get-pet.service';
import { UpdatePetRequirementsForAdoptionService } from './services/update-pet-requirements-for-adoption.service';
import { Organization } from '../organization/decorators/organization.decorator';
import { OrganizationData } from '../organization/types/organization-data.type';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { PetNotFoundException } from '../pet/exceptions/pet-not-found.exception';
import { PermissionDeniedException } from './exceptions/permission-denied.exception';

@Controller('requirements-for-adoption')
export class RequirementForAdoptionController {
  constructor(
    private readonly getPetService: GetPetService,
    private readonly updatePetRequirementsForAdoptionService: UpdatePetRequirementsForAdoptionService,
  ) {}

  @UseGuards(AuthGuard)
  @Put('/pet/:petId')
  @HttpCode(204)
  public async update(
    @Organization() organization: OrganizationData,
    @Param('petId') petId: string,
    @Body() body: UpdatePetRequirementsForAdoptionDTO,
  ) {
    const pet = await this.getPetService.execute({ id: petId });

    if (!pet) {
      throw new PetNotFoundException();
    }

    if (pet.organizationId !== organization.id) {
      throw new PermissionDeniedException();
    }

    this.updatePetRequirementsForAdoptionService.execute({
      petId,
      requirementsForAdoption: body.requirementsForAdoption,
    });
  }
}
