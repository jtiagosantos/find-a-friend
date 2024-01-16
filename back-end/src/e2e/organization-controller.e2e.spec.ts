import { Test } from '@nestjs/testing';
import { describe, it, beforeAll, expect } from 'vitest';
import request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { OrganizationModule } from 'src/@core/organization/organization.module';

describe('Organization Controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [OrganizationModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.init();
  });

  describe('[POST] /register', () => {
    it('must be able to register an organization', async () => {
      const response = await request(app.getHttpServer())
        .post('/organization/register')
        .send({
          ownerName: 'John Doe',
          name: 'MyPet',
          email: 'johndoe@example.com',
          password: '123456',
          phoneNumber: '99999999999',
          address: 'Rua da Felicidade',
          zipCode: '99999999',
          city: 'Gotham',
          state: 'None',
        });

      expect(response.statusCode).toEqual(201);
    });
  });
});
