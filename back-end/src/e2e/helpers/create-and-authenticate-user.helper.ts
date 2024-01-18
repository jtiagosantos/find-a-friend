import { INestApplication } from '@nestjs/common';
import request from 'supertest';

export const createAndAuthenticateUser = async (app: INestApplication) => {
  await request(app.getHttpServer()).post('/organization/register').send({
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

  const response = await request(app.getHttpServer())
    .post('/organization/authenticate')
    .send({
      email: 'johndoe@example.com',
      password: '123456',
    });

  const { token } = response.body;

  return {
    token,
  };
};
