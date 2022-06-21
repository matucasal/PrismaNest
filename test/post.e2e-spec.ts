
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { PostModule } from '../src/modules/posts/post.module';
import { PostService } from '../src/modules/posts/post.service';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../src/guards/jwt-auth.guard';

describe('Cats', () => {
  let app: INestApplication;
  let postService = { findAll: () => ['test'] };
  let authToken: JwtAuthGuard;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PostModule,JwtAuthGuard],
    })
      .overrideProvider(PostService)
      .useValue(postService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

 

  
  /*
  it(`/GET cats`, () => {
    return request(app.getHttpServer())
      .get('/feed')
      .expect(200)
      .expect({
        data: postService.findAll(),
      });
  });*/

  afterAll(async () => {
    await app.close();
  });
});