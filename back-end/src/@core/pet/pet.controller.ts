import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RegisterPetDTO } from './dtos/register-pet.dto';
import { FindPetsQueryParamsDTO } from './dtos/find-pets-query-params.dto';
import { UpdatePetDTO } from './dtos/update-pet.dto';
import { RegisterPetService } from './services/register-pet.service';
import { GetPetService } from './services/get-pet.service';
import { FindPetsService } from './services/find-pets.service';
import { FindPetsByOrganizationService } from './services/find-pets-by-organization.service';
import { DeletePetService } from './services/delete-pet.service';
import { UpdatePetService } from './services/update-pet.service';
import { Organization } from '../organization/decorators/organization.decorator';
import { OrganizationData } from '../organization/types/organization-data.type';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { PetNotFoundException } from './exceptions/pet-not-found.exception';
import { PermissionDeniedException } from './exceptions/permission-denied.exception';

@Controller('pets')
export class PetController {
  constructor(
    private readonly registerPetService: RegisterPetService,
    private readonly getPetService: GetPetService,
    private readonly findPetsService: FindPetsService,
    private readonly findPetsByOrganization: FindPetsByOrganizationService,
    private readonly deletePetService: DeletePetService,
    private readonly updatePetService: UpdatePetService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('/register')
  @HttpCode(201)
  public async register(
    @Body() body: RegisterPetDTO,
    @Organization() organization: OrganizationData,
  ) {
    await this.registerPetService.execute({
      ...body,
      organizationId: organization.id,
    });
  }

  @UseGuards(AuthGuard)
  @Get('/organization')
  @HttpCode(200)
  public async findByOrganization(@Organization() organization: OrganizationData) {
    const pets = await this.findPetsByOrganization.execute({
      organizationId: organization.id,
    });

    return pets;
  }

  @Get(':id')
  @HttpCode(200)
  public async getPet(
    @Param('id') id: string,
    @Query('organization') organization: string,
  ) {
    const organizationQueryParam = organization ? Number(organization) === 1 : false;

    const pet = await this.getPetService.execute({
      id,
      organization: organizationQueryParam,
    });

    if (!pet) {
      throw new PetNotFoundException();
    }

    return {
      ...pet,
      organizationId: undefined,
    };
  }

  @Get('/')
  @HttpCode(200)
  public async find(@Query() queryParams: FindPetsQueryParamsDTO) {
    const pets = await this.findPetsService.execute({
      filters: {
        age: queryParams.age,
        energy: queryParams.energy,
        species: queryParams.species,
        size: queryParams.size,
        dependenceLevel: queryParams.dependenceLevel,
        city: queryParams.city,
      },
    });

    return pets;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(204)
  public async delete(
    @Param('id') id: string,
    @Organization() organization: OrganizationData,
  ) {
    const pet = await this.getPetService.execute({ id });

    if (!pet) {
      throw new PetNotFoundException();
    }

    if (pet.organizationId !== organization.id) {
      throw new PermissionDeniedException();
    }

    await this.deletePetService.execute({ id });
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @HttpCode(204)
  public async update(
    @Body() body: UpdatePetDTO,
    @Param('id') id: string,
    @Organization() organization: OrganizationData,
  ) {
    const pet = await this.getPetService.execute({ id });

    if (!pet) {
      throw new PetNotFoundException();
    }

    if (pet.organizationId !== organization.id) {
      throw new PermissionDeniedException();
    }

    await this.updatePetService.execute({
      id,
      ...body,
    });
  }
}
