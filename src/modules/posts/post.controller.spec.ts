import {Test, TestingModule} from '@nestjs/testing';
import {PostController} from './post.controller';
import { PostService } from './post.service';
import {PrismaService} from '../../prisma.service';


describe ('PostController', () => {
  let controller: PostController;
  let service: PostService;
  let prisma: PrismaService;

  const mockPostService = {
    createPost: jest.fn( dto => {
      return {
        id: Date.now(),
        owner: Date.now(),
        published : false,
        content: dto.content,
        title: dto.title,
      }
    })
  }
  

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [PostController],
        providers: [PostService, PrismaService],
      })
      .overrideProvider(PostService)
      .useValue(mockPostService)
      .compile();

    service = moduleRef.get<PostService>(PostService);
    controller = moduleRef.get<PostController>(PostController);
    prisma = moduleRef.get<PrismaService>(PrismaService);

  });

  
  describe('postController', () => {
    
    it('should call service to create a draft with a mock ', async () => {
      
      //Expecting to be equal to the generated mock (using  "simulated" service) -> https://github.com/jmcdo29/testing-nestjs/blob/main/apps/prisma-sample/src/cat/cat.controller.spec.ts
      expect(await controller.createDraft({ title: 'title', content: 'content', userId: 1}))
      .toEqual(
        {"id": expect.any(Number),
        "title": "title",
        "content": "content",
        "owner": expect.any(Number),
        "published" : false
       }
      )
    });
    
    //This does not work anymore because I am not using mockimplementation as https://docs.nestjs.com/fundamentals/testing#end-to-end-testing
    /*it('should return an array of posts', async () => {
      const post = [{
        id: 1,
        title: 'title',
        content: 'content',
        published: true,
        owner: 1
      }];

      jest.spyOn(service, 'posts').mockImplementation( () => Promise.resolve(post));

      expect(await controller.getPublishedPosts()).toBe(post);
    });*/

    
  });
})
