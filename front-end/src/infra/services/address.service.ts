import axios from 'axios';
import type { InputFindAddressByZipCode } from './dtos/input-find-address-by-zip-code.dto';
import type { OutputFindAddressByZipCode } from './dtos/output-find-address-by-zip-code.dto';

export class AddressService {
  private httpClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_VIA_CEP,
  });

  public async getAddressByZipCode(
    input: InputFindAddressByZipCode,
  ): Promise<OutputFindAddressByZipCode> {
    const { data } = await this.httpClient.get(`/${input.zipCode}/json/`);

    return {
      city: data.localidade,
      state: data.uf,
      address: data.logradouro,
    };
  }
}
