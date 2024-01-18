import { Test } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PhotoModule } from 'src/@core/photo/photo.module';
import { OrganizationModule } from 'src/@core/organization/organization.module';
import { createAndAuthenticateUser } from './helpers/create-and-authenticate-user.helper';

suite('Photo Controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PhotoModule, OrganizationModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('[PUT] /photos/pet/:id', () => {
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
        .put(`/photos/pet/${petId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          photos: ['https://image-1.png', 'https://image-2.png', 'https://image-3.png'],
        });

      expect(putResponse.statusCode).toEqual(HttpStatus.NO_CONTENT);

      const petResponse = await request(app.getHttpServer()).get(`/pets/${petId}`);

      expect(petResponse.body.photos).toEqual([
        { id: expect.any(String), source: 'https://image-1.png' },
        { id: expect.any(String), source: 'https://image-2.png' },
        { id: expect.any(String), source: 'https://image-3.png' },
      ]);
    });

    it('must not be able to update the pet photos with wrong values on the fiels', async () => {
      const { token } = await createAndAuthenticateUser(app);

      const response = await request(app.getHttpServer())
        .get('/pets/organization')
        .set('Authorization', `Bearer ${token}`);

      const { id: petId } = response.body[0];

      await request(app.getHttpServer())
        .put(`/photos/pet/${petId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          photos: [],
        })
        .expect({
          message: ['photos must be at least one element'],
          error: 'Bad Request',
          statusCode: HttpStatus.BAD_REQUEST,
        });

      await request(app.getHttpServer())
        .put(`/photos/pet/${petId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          photos: [2],
        })
        .expect({
          message: ['Each element of the array must be a string'],
          error: 'Bad Request',
          statusCode: HttpStatus.BAD_REQUEST,
        });

      await request(app.getHttpServer())
        .put(`/photos/pet/${petId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          photos: [''],
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
        .put('/photos/pet/inexistent-id')
        .set('Authorization', `Bearer ${token}`)
        .send({
          photos: ['https://image-1.png', 'https://image-2.png', 'https://image-3.png'],
        });

      expect(putResponse.statusCode).toEqual(HttpStatus.NOT_FOUND);
      expect(putResponse.body.message).toEqual('Pet not found');
    });
  });
});
