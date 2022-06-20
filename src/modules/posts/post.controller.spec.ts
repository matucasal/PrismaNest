import {Test, TestingModule} from '@nestjs/testing';
import {PostController} from './post.controller';
import { PostService } from './post.service';
import {PrismaService} from '../../prisma.service';


describe ('PostController', () => {
  let controller: PostController;
  let service: PostService;
  

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [PostController],
        providers: [PostService, PrismaService],
      }).compile();

    service = moduleRef.get<PostService>(PostService);
    controller = moduleRef.get<PostController>(PostController);
  });

  
  describe('getAllPublishedPosts', () => {
    it('should return an array of posts', async () => {
      const post = [{
        id: 1,
        title: 'title',
        content: 'content',
        published: true,
        owner: 1
      }];

      jest.spyOn(service, 'posts').mockImplementation( () => Promise.resolve(post));

      expect(await controller.getPublishedPosts()).toBe(post);
    });
  });
})
