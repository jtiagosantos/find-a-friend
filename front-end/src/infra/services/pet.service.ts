import axios from 'axios';
import type { OutputFindPetsDTO } from './dtos/output-find-pets.dto';

export class PetService {
  private httpClient = axios.create({ baseURL: '/api' });

  public async findByOrganization(): Promise<OutputFindPetsDTO> {
    const { data: pets } = await this.httpClient.get('/organization/pet/find');

    return pets;
  }
}
