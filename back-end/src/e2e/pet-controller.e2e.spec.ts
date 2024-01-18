import { Test } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PetModule } from 'src/@core/pet/pet.module';
import { OrganizationModule } from 'src/@core/organization/organization.module';
import { createAndAuthenticateUser } from './helpers/create-and-authenticate-user.helper';

suite('Pet Controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PetModule, OrganizationModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('[POST] /register', () => {
    it('must be able to register a pet', async () => {
      const { token } = await createAndAuthenticateUser(app);

      const response = await request(app.getHttpServer())
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
          photos: ['https://example.png', 'https://example2.png'],
          requirementsForAdoption: [],
          isAvailable: true,
        });

      expect(response.statusCode).toEqual(HttpStatus.CREATED);
    });

    it('must not be able to register a pet with pending fields', async () => {
      const { token } = await createAndAuthenticateUser(app);

      const response = await request(app.getHttpServer())
        .post('/pets/register')
        .set('Authorization', `Bearer ${token}`)
        .send({});

      expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
      expect(response.body.message).toEqual([
        'name must be not an empty field',
        'name must be a string',
        'about must be at least tewnty characters',
        'about must be not an empty field',
        'about must be a string',
        'age must be less than or equal to twenty',
        'age must be greater than or equal to zero',
        'age must be a number conforming to the specified constraints',
        'species must be DOG or CAT',
        'energy must be less than or equal to five',
        'energy must be greater than or equal to one',
        'energy must be a number conforming to the specified constraints',
        'size must be SMALL or MEDIUM or LARGE',
        'dependenceLevel must be LOW or MEDIUM or HIGHT',
        'Each string of the array must be no empty',
        'Each element of the array must be a string',
        'photos must be at least one element',
        'photos must be an array',
        'Each element of the array must be a string',
        'requirementsForAdoption must be an array',
        'isAvailable must be a boolean value',
      ]);
    });

    it('must not be able to register a pet without authentication', async () => {
      const response = await request(app.getHttpServer())
        .post('/pets/register')
        .send({
          name: 'Lulu',
          about: "It's a so cute dog. On cold days, she likes to sleep",
          age: 2,
          species: 'DOG',
          energy: 2,
          size: 'SMALL',
          dependenceLevel: 'MEDIUM',
          photos: ['https://example.png', 'https://example2.png'],
          requirementsForAdoption: [],
          isAvailable: true,
        });

      expect(response.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
      expect(response.body.message).toEqual('Unauthorized access');
    });

    it('must not be able to update a pet with wrong values on the fields', async () => {
      const { token } = await createAndAuthenticateUser(app);

      const putResponse = await request(app.getHttpServer())
        .post('/pets/register')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: '',
          about: 'Short description',
          age: -1,
          species: 'TURTLE',
          energy: 0,
          size: 'ANYTHING',
          dependenceLevel: 'ANYTHING',
          isAvailable: null,
          photos: [],
          requirementsForAdoption: null,
        });

      expect(putResponse.statusCode).toEqual(HttpStatus.BAD_REQUEST);
      expect(putResponse.body.message).toEqual([
        'name must be not an empty field',
        'about must be at least tewnty characters',
        'age must be greater than or equal to zero',
        'species must be DOG or CAT',
        'energy must be greater than or equal to one',
        'size must be SMALL or MEDIUM or LARGE',
        'dependenceLevel must be LOW or MEDIUM or HIGHT',
        'photos must be at least one element',
        'Each element of the array must be a string',
        'requirementsForAdoption must be an array',
        'isAvailable must be a boolean value',
      ]);
    });
  });

  describe('[GET] /organization', () => {
    it('must be able to find the pets from an organization', async () => {
      const { token } = await createAndAuthenticateUser(app);

      const response = await request(app.getHttpServer())
        .get('/pets/organization')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body[0]).toEqual({
        id: expect.any(String),
        name: 'Lulu',
        about: "It's a so cute dog. On cold days, she likes to sleep",
        age: 2,
        species: 'DOG',
        energy: 2,
        size: 'SMALL',
        dependenceLevel: 'MEDIUM',
        photos: [
          {
            id: expect.any(String),
            source: 'https://example.png',
          },
          {
            id: expect.any(String),
            source: 'https://example2.png',
          },
        ],
        requirementsForAdoption: [],
      });
    });

    it('must not be able to find the pets from an organization without authentication', async () => {
      const response = await request(app.getHttpServer()).get('/pets/organization');

      expect(response.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
      expect(response.body.message).toEqual('Unauthorized access');
    });
  });

  describe('[GET] /:id', () => {
    it('must be able to get a pet by id', async () => {
      const { token } = await createAndAuthenticateUser(app);

      const response = await request(app.getHttpServer())
        .get('/pets/organization')
        .set('Authorization', `Bearer ${token}`);

      const { id: petId } = response.body[0];

      const petResponse = await request(app.getHttpServer()).get(`/pets/${petId}`);

      expect(petResponse.statusCode).toEqual(HttpStatus.OK);
      expect(petResponse.body).toEqual({
        id: expect.any(String),
        name: 'Lulu',
        about: "It's a so cute dog. On cold days, she likes to sleep",
        age: 2,
        species: 'DOG',
        energy: 2,
        size: 'SMALL',
        dependenceLevel: 'MEDIUM',
        isAvailable: true,
        photos: [
          { id: expect.any(String), source: 'https://example.png' },
          { id: expect.any(String), source: 'https://example2.png' },
        ],
        requirementsForAdoption: [],
      });
    });

    it('must be able to get a pet by id and the organization by query param', async () => {
      const { token } = await createAndAuthenticateUser(app);

      const response = await request(app.getHttpServer())
        .get('/pets/organization')
        .set('Authorization', `Bearer ${token}`);

      const { id: petId } = response.body[0];

      const petResponse = await request(app.getHttpServer()).get(
        `/pets/${petId}?organization=1`,
      );

      expect(petResponse.statusCode).toEqual(HttpStatus.OK);
      expect(petResponse.body).toEqual({
        id: expect.any(String),
        name: 'Lulu',
        about: "It's a so cute dog. On cold days, she likes to sleep",
        age: 2,
        species: 'DOG',
        energy: 2,
        size: 'SMALL',
        dependenceLevel: 'MEDIUM',
        isAvailable: true,
        photos: [
          { id: expect.any(String), source: 'https://example.png' },
          { id: expect.any(String), source: 'https://example2.png' },
        ],
        requirementsForAdoption: [],
        organization: {
          id: expect.any(String),
          ownerName: 'John Doe',
          name: 'MyPet',
          email: 'johndoe@example.com',
          passwordHash: expect.any(String),
          phoneNumber: '99999999999',
          address: 'Rua da Felicidade',
          zipCode: '99999999',
          city: 'gotham',
          state: 'none',
        },
      });
    });

    it('must not be able to get a pet by an inexistent id', async () => {
      const response = await request(app.getHttpServer()).get('/pets/inexistent-id');

      expect(response.statusCode).toEqual(HttpStatus.NOT_FOUND);
    });
  });

  describe('[PUT] /:id', () => {
    it('must be able to update a pet', async () => {
      const { token } = await createAndAuthenticateUser(app);

      const response = await request(app.getHttpServer())
        .get('/pets/organization')
        .set('Authorization', `Bearer ${token}`);

      const { id: petId } = response.body[0];

      const putResponse = await request(app.getHttpServer())
        .put(`/pets/${petId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Rex',
          about: "It's a amazing dog. He likes to play at the park a lot",
          age: 5,
          species: 'CAT',
          energy: 5,
          size: 'MEDIUM',
          dependenceLevel: 'MEDIUM',
        });

      expect(putResponse.statusCode).toEqual(HttpStatus.NO_CONTENT);

      const petResponse = await request(app.getHttpServer()).get(`/pets/${petId}`);

      expect(petResponse.body).toEqual(
        expect.objectContaining({
          name: 'Rex',
          about: "It's a amazing dog. He likes to play at the park a lot",
          age: 5,
          species: 'CAT',
          energy: 5,
          size: 'MEDIUM',
          dependenceLevel: 'MEDIUM',
        }),
      );
    });

    it('must not be able to update a pet by an inexistent id', async () => {
      const { token } = await createAndAuthenticateUser(app);

      const putResponse = await request(app.getHttpServer())
        .put('/pets/inexistent-id')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Rex',
          about: "It's a amazing dog. He likes to play at the park a lot",
          age: 5,
          species: 'DOG',
          energy: 5,
          size: 'MEDIUM',
          dependenceLevel: 'MEDIUM',
        });

      expect(putResponse.statusCode).toEqual(HttpStatus.NOT_FOUND);
    });

    it('must not be able to update a pet without an authentication', async () => {
      const putResponse = await request(app.getHttpServer()).put('/pets/any-id').send({
        name: 'Rex',
        about: "It's a amazing dog. He likes to play at the park a lot",
        age: 5,
        species: 'DOG',
        energy: 5,
        size: 'MEDIUM',
        dependenceLevel: 'MEDIUM',
      });

      expect(putResponse.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
    });

    it('must not be able to update a pet with wrong values on the fields', async () => {
      const { token } = await createAndAuthenticateUser(app);

      const response = await request(app.getHttpServer())
        .get('/pets/organization')
        .set('Authorization', `Bearer ${token}`);

      const { id: petId } = response.body[0];

      const putResponse = await request(app.getHttpServer())
        .put(`/pets/${petId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: '',
          about: 'Short description',
          age: -1,
          species: 'TURTLE',
          energy: 0,
          size: 'ANYTHING',
          dependenceLevel: 'ANYTHING',
          isAvailable: null,
        });

      expect(putResponse.statusCode).toEqual(HttpStatus.BAD_REQUEST);
      expect(putResponse.body.message).toEqual([
        'name must be not an empty field',
        'about must be at least tewnty characters',
        'age must be greater than or equal to zero',
        'species must be DOG or CAT',
        'energy must be greater than or equal to one',
        'size must be SMALL or MEDIUM or LARGE',
        'dependenceLevel must be LOW or MEDIUM or HIGHT',
        'isAvailable must be a boolean',
      ]);
    });
  });

  describe('[DELETE] /:id', () => {
    it('must be able to delete a pet', async () => {
      const { token } = await createAndAuthenticateUser(app);

      const response = await request(app.getHttpServer())
        .get('/pets/organization')
        .set('Authorization', `Bearer ${token}`);

      const { id: petId } = response.body[0];

      const deleteResponse = await request(app.getHttpServer())
        .delete(`/pets/${petId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(deleteResponse.statusCode).toEqual(HttpStatus.NO_CONTENT);

      const petResponse = await request(app.getHttpServer()).get(`/pets/${petId}`);

      expect(petResponse.statusCode).toEqual(HttpStatus.NOT_FOUND);
    });

    it('must not be able to delete a pet by an inexistent id', async () => {
      const { token } = await createAndAuthenticateUser(app);

      const petResponse = await request(app.getHttpServer())
        .delete('/pets/inexistent-id')
        .set('Authorization', `Bearer ${token}`);

      expect(petResponse.statusCode).toEqual(HttpStatus.NOT_FOUND);
    });

    it('must not be able to delete a pet without an authentication', async () => {
      const petResponse = await request(app.getHttpServer()).delete('/pets/any-id');

      expect(petResponse.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('[GET] /', () => {
    it('must be able to find pets', async () => {
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
          photos: ['https://example.png', 'https://example2.png'],
          requirementsForAdoption: [],
          isAvailable: true,
        });

      await request(app.getHttpServer())
        .post('/pets/register')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Rex',
          about: "It's a amazing dog. He likes to play at the park a lot",
          age: 5,
          species: 'CAT',
          energy: 5,
          size: 'MEDIUM',
          dependenceLevel: 'MEDIUM',
          photos: ['https://example.png'],
          requirementsForAdoption: ["You'll need to take it to the park every day"],
          isAvailable: true,
        });

      const response = await request(app.getHttpServer()).get('/pets');

      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body).toEqual([
        {
          id: expect.any(String),
          name: 'Lulu',
          about: "It's a so cute dog. On cold days, she likes to sleep",
          age: 2,
          species: 'DOG',
          energy: 2,
          size: 'SMALL',
          dependenceLevel: 'MEDIUM',
          photos: [
            {
              id: expect.any(String),
              source: 'https://example.png',
            },
            {
              id: expect.any(String),
              source: 'https://example2.png',
            },
          ],
          requirementsForAdoption: [],
        },
        {
          id: expect.any(String),
          name: 'Rex',
          about: "It's a amazing dog. He likes to play at the park a lot",
          age: 5,
          species: 'CAT',
          energy: 5,
          size: 'MEDIUM',
          dependenceLevel: 'MEDIUM',
          photos: [
            {
              id: expect.any(String),
              source: 'https://example.png',
            },
          ],
          requirementsForAdoption: [
            {
              id: expect.any(String),
              requirement: "You'll need to take it to the park every day",
            },
          ],
        },
      ]);
    });

    it('must be able to find pets with applied filters', async () => {
      const response = await request(app.getHttpServer()).get(
        '/pets?species=DOG&age=2&energy=2&size=SMALL&dependenceLevel=MEDIUM&city=Gotham',
      );

      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body[0]).toEqual({
        id: expect.any(String),
        name: 'Lulu',
        about: "It's a so cute dog. On cold days, she likes to sleep",
        age: 2,
        species: 'DOG',
        energy: 2,
        size: 'SMALL',
        dependenceLevel: 'MEDIUM',
        photos: [
          {
            id: expect.any(String),
            source: 'https://example.png',
          },
          {
            id: expect.any(String),
            source: 'https://example2.png',
          },
        ],
        requirementsForAdoption: [],
      });

      const petResponse = await request(app.getHttpServer()).get(
        '/pets?species=CAT&age=5',
      );

      expect(petResponse.statusCode).toEqual(HttpStatus.OK);
      expect(petResponse.body[0]).toEqual({
        id: expect.any(String),
        name: 'Rex',
        about: "It's a amazing dog. He likes to play at the park a lot",
        age: 5,
        species: 'CAT',
        energy: 5,
        size: 'MEDIUM',
        dependenceLevel: 'MEDIUM',
        photos: [
          {
            id: expect.any(String),
            source: 'https://example.png',
          },
        ],
        requirementsForAdoption: [
          {
            id: expect.any(String),
            requirement: "You'll need to take it to the park every day",
          },
        ],
      });
    });

    it('must not be able to find pets with wrong values on the fields', async () => {
      const response = await request(app.getHttpServer()).get(
        '/pets?species=TURTLE&age=-1&energy=0&size=ANYTHING&dependenceLevel=ANYTHING',
      );

      expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
      expect(response.body.message).toEqual([
        'energy query params must be greater than or equal to one',
        'species query param must be DOG or CAT',
        'size query params must be SMALL or MEDIUM or LARGE',
        'dependenceLevel must be LOW or MEDIUM or HIGHT',
      ]);
    });
  });
});
