import axios, { AxiosError } from 'axios';
import { setCookie } from 'cookies-next';
import type { InputRegisterOrganizationDTO } from './dtos/input-register-organization.dto';
import type { InputAuthenticateDTO } from './dtos/input-authenticate.dto';
import { ErrorMessages } from './enums/error-messages.enum';
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists.error';
import { InvalidCredentialsError } from './errors/invalid-credentials.error';
import { COOKIES_NAME, TIME } from '@/shared/constants';

export class OrganizationService {
  private httpClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  });

  public async register(input: InputRegisterOrganizationDTO) {
    try {
      await this.httpClient.post('/organization/register', {
        ownerName: input.ownerName,
        name: input.name,
        email: input.email,
        password: input.password,
        phoneNumber: input.phoneNumber,
        zipCode: input.zipCode,
        address: input.address,
        city: input.city,
        state: input.state,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (
          error?.response?.data?.message === ErrorMessages.ORGANIZATION_ALREADY_EXISTS
        ) {
          throw new OrganizationAlreadyExistsError();
        }

        throw error;
      }

      throw error;
    }
  }

  public async authenticate(input: InputAuthenticateDTO) {
    try {
      const { data } = await this.httpClient.post('/organization/authenticate', {
        email: input.email,
        password: input.password,
      });

      setCookie(COOKIES_NAME.TOKEN, data.token, {
        path: '/organization',
        maxAge: TIME.SEVEN_DAYS,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.response?.data?.message === ErrorMessages.INVALID_CREDENTIALS) {
          throw new InvalidCredentialsError();
        }

        throw error;
      }

      throw error;
    }
  }
}
