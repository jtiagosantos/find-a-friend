import { Test } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { OrganizationModule } from 'src/@core/organization/organization.module';

suite('Organization Controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [OrganizationModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
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

      expect(response.statusCode).toEqual(HttpStatus.CREATED);
    });

    it('must not be able to register an organization with an existing email already', async () => {
      const response = await request(app.getHttpServer())
        .post('/organization/register')
        .send({
          ownerName: 'Ada Lovelace',
          name: 'LovePets',
          email: 'johndoe@example.com',
          password: '123456',
          phoneNumber: '99999999999',
          address: 'Rua da Conquista',
          zipCode: '99999999',
          city: 'Gotham',
          state: 'Null',
        });

      expect(response.statusCode).toEqual(HttpStatus.CONFLICT);
    });

    it('must not be able to register an organization with pending fields', async () => {
      const response = await request(app.getHttpServer())
        .post('/organization/register')
        .send({});

      expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
      expect(response.body.message).toEqual([
        'ownerName must be not an empty field',
        'ownerName must be a string',
        'name must be not an empty field',
        'name must be a string',
        'email must be an email',
        'email must be not an empty field',
        'email must be a string',
        'password must be at least six digits',
        'password must be not an empty field',
        'password must be a string',
        'phoneNumber must be a valid phone number',
        'phoneNumber must be not an empty field',
        'phoneNumber must be a string',
        'address must be not an empty field',
        'address must be a string',
        'zipCode must be not an empty field',
        'zipCode must be a string',
        'city must be not an empty field',
        'city must be a string',
        'state must be not an empty field',
        'state must be a string',
      ]);
    });
  });

  describe('[POST] /authenticate', () => {
    it('must be able to authenticate an organization', async () => {
      const response = await request(app.getHttpServer())
        .post('/organization/authenticate')
        .send({
          email: 'johndoe@example.com',
          password: '123456',
        });

      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          token: expect.any(String),
        }),
      );
    });

    it('must not be able to authenticate an organization with pending fields', async () => {
      const response = await request(app.getHttpServer())
        .post('/organization/authenticate')
        .send({});

      expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
      expect(response.body.message).toEqual([
        'email must be an email',
        'email must be not an empty field',
        'email must be a string',
        'password must be not an empty field',
        'password must be a string',
      ]);
    });

    it('must not be able to authenticate an organization with an inexistent email', async () => {
      const response = await request(app.getHttpServer())
        .post('/organization/authenticate')
        .send({
          email: 'adalovelace@domain.com',
          password: '123456',
        });

      expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
      expect(response.body.message).toEqual('Invalid credentials');
    });

    it('must not be able to authenticate an organization with invalid password', async () => {
      const response = await request(app.getHttpServer())
        .post('/organization/authenticate')
        .send({
          email: 'johndoe@example.com',
          password: 'wrong-password',
        });

      expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
      expect(response.body.message).toEqual('Invalid credentials');
    });
  });
});
