import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateTokenInput } from './inputs/create-token.input';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public createToken(input: CreateTokenInput) {
    const token = this.jwtService.sign(input);

    return token;
  }

  public verifyToken(token: string) {
    const payload = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET_KEY,
    });

    return payload;
  }
}
