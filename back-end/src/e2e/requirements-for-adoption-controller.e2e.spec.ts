import { Test } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { RequirementForAdoptionModule } from 'src/@core/requirement-for-adoption/requirement-for-adoption.module';
import { OrganizationModule } from 'src/@core/organization/organization.module';
import { createAndAuthenticateUser } from './helpers/create-and-authenticate-user.helper';

suite('RequirementsForAdoption Controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [RequirementForAdoptionModule, OrganizationModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('[PUT] /requirements-for-adoption/pet/:id', () => {
    it('must be able to update the pet photos', async () => {
      const { token } = await createAndAuthenticateUser(app);

      await request(app.getHttpServer())
        .post('/pets/register')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Lulu',
          about: "It's a so cute dog. On cold days, she likes to sleep",
          age: 2,
          species: 'DOG',
          energy: 2,
          size: 'SMALL',
          dependenceLevel: 'MEDIUM',
          photos: ['https://example.png'],
          requirementsForAdoption: [],
          isAvailable: true,
        });

      const response = await request(app.getHttpServer())
        .get('/pets/organization')
        .set('Authorization', `Bearer ${token}`);

      const { id: petId } = response.body[0];

      const putResponse = await request(app.getHttpServer())
        .put(`/requirements-for-adoption/pet/${petId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          requirementsForAdoption: ['The environment needs to be clean'],
        });

      expect(putResponse.statusCode).toEqual(HttpStatus.NO_CONTENT);

      const petResponse = await request(app.getHttpServer()).get(`/pets/${petId}`);

      expect(petResponse.body.requirementsForAdoption).toEqual([
        { id: expect.any(String), requirement: 'The environment needs to be clean' },
      ]);
    });

    it('must not be able to update the pet photos with wrong values on the fiels', async () => {
      const { token } = await createAndAuthenticateUser(app);

      const response = await request(app.getHttpServer())
        .get('/pets/organization')
        .set('Authorization', `Bearer ${token}`);

      const { id: petId } = response.body[0];

      await request(app.getHttpServer())
        .put(`/requirements-for-adoption/pet/${petId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          requirementsForAdoption: [2],
        })
        .expect({
          message: ['Each element of the array must be a string'],
          error: 'Bad Request',
          statusCode: HttpStatus.BAD_REQUEST,
        });

      await request(app.getHttpServer())
        .put(`/requirements-for-adoption/pet/${petId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          requirementsForAdoption: [''],
        })
        .expect({
          message: ['Each element of the array must be not an empty string'],
          error: 'Bad Request',
          statusCode: HttpStatus.BAD_REQUEST,
        });
    });

    it('must not be able to update the pet photos for an inexistent pet', async () => {
      const { token } = await createAndAuthenticateUser(app);

      const putResponse = await request(app.getHttpServer())
        .put('/requirements-for-adoption/pet/inexistent-id')
        .set('Authorization', `Bearer ${token}`)
        .send({
          requirementsForAdoption: ['The environment needs to be clean'],
        });

      expect(putResponse.statusCode).toEqual(HttpStatus.NOT_FOUND);
      expect(putResponse.body.message).toEqual('Pet not found');
    });
  });
});
