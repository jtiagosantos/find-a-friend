import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UpdatePetPhotosDTO } from './dtos/update-pet-photos.dto';
import { PreSignURLDTO } from './dtos/pre-sign-url.dto';
import { GetPetService } from '../pet/services/get-pet.service';
import { UpdatePetPhotosService } from './services/update-pet-photos.service';
import { AWSS3Service } from '../../services/aws-s3/aws-s3.service';
import { Organization } from '../organization/decorators/organization.decorator';
import { OrganizationData } from '../organization/types/organization-data.type';
import { AuthGuard } from '../../services/auth/auth.guard';
import { PetNotFoundException } from '../pet/exceptions/pet-not-found.exception';
import { PermissionDeniedException } from './exceptions/permission-denied.exception';

@Controller('photos')
export class PhotoController {
  constructor(
    private readonly getPetService: GetPetService,
    private readonly updatePetPhotosService: UpdatePetPhotosService,
    private readonly awsS3Service: AWSS3Service,
  ) {}

  @UseGuards(AuthGuard)
  @Put('/pet/:petId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async update(
    @Organization() organization: OrganizationData,
    @Param('petId') petId: string,
    @Body() body: UpdatePetPhotosDTO,
  ) {
    const pet = await this.getPetService.execute({ id: petId });

    if (!pet) {
      throw new PetNotFoundException();
    }

    if (pet.organizationId !== organization.id) {
      throw new PermissionDeniedException();
    }

    await this.updatePetPhotosService.execute({ petId, photos: body.photos });
  }

  @UseGuards(AuthGuard)
  @Post('/upload/url')
  @HttpCode(HttpStatus.CREATED)
  public async preSignURL(@Body() body: PreSignURLDTO) {
    const url = await this.awsS3Service.preSignURL(body);

    return {
      url,
    };
  }
}
