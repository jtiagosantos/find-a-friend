import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterOrganizationDTO } from './dtos/register-organization.dto';
import { AuthenticateOrganizationDTO } from './dtos/authenticate-organization.dto';
import { RegisterOrganizationService } from './services/register-organization.service';
import { GetOrganizationService } from './services/get-organization.service';
import { HashingService } from '../../services/hashing/hashing.service';
import { AuthService } from '../../services/auth/auth.service';
import { OrganizationAlreadyExistsException } from './exceptions/organization-already-exists.exception';
import { InvalidCredentialsException } from './exceptions/invalid-credentials.exception';

@Controller('organization')
export class OrganizationController {
  constructor(
    private readonly registerOrganizationService: RegisterOrganizationService,
    private readonly getOrganizationService: GetOrganizationService,
    private readonly hashingService: HashingService,
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  public async register(@Body() body: RegisterOrganizationDTO) {
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

  @Post('/authenticate')
  @HttpCode(HttpStatus.OK)
  public async authenticate(@Body() body: AuthenticateOrganizationDTO) {
    const organization = await this.getOrganizationService.execute({ email: body.email });

    if (!organization) {
      throw new InvalidCredentialsException();
    }

    const doesPasswordsMatch = this.hashingService.compare(
      body.password,
      organization.passwordHash,
    );

    if (!doesPasswordsMatch) {
      throw new InvalidCredentialsException();
    }

    const token = this.authService.createToken({ sub: organization.id });

    return {
      token,
    };
  }
}
