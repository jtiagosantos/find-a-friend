import axios, { AxiosError } from 'axios';
import type { InputRegisterOrganizationDTO } from './dtos/input-register-organization.dto';
import { ErrorMessages } from './enums/error-messages.enum';
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists.error';

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
}
