/* 
* Nest & Third party imports
*/
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

/* 
* custom imports
*/
import { AppModule } from './../src/app.module';


describe('AppController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  
  //ping unit test method
  it('/ping controller return json', () => {
    return request(app.getHttpServer())
      .get('/ping')
      .expect(200)
      .expect('Content-type', /json/)
  });

});
