import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ping (GET)', () => {
    return request(app.getHttpServer())
      .get('/ping')
      .expect(200)
      .expect((res) => {
        expect(res).toBeDefined();
        expect(res.body).toEqual({ msg: 'pong' });
      });
  });
});
