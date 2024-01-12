import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  private saltOrRounds = 10;

  public hash(password: string) {
    const hash = bcrypt.hashSync(password, this.saltOrRounds);

    return hash;
  }

  public compare(password: string, hash: string) {
    const isMatch = bcrypt.compareSync(password, hash);

    return isMatch;
  }
}
