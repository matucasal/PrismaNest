import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Post as PostModel } from '@prisma/client';
import { ACGuard, UseRoles,RolesBuilder, InjectRolesBuilder } from 'nest-access-control';

@Controller()
export class PostController {
  constructor(
    private readonly postService: PostService,
    @InjectRolesBuilder() private readonly roleBuilder: RolesBuilder
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('post/:id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postService.post({ id: Number(id) });
  }

  @UseGuards(JwtAuthGuard)
  @Get('feed')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { published: true },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('filtered-posts/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post('post')
  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'post',
    action: 'create',
    possession: 'own',
  })
  async createDraft(
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostModel> {
    const { title, content, authorEmail } = createPostDto;
    return this.postService.createPost({
      title,
      content,
      user: {
        connect: { email: authorEmail },
      },
    });
  }

  @Put('publish/:id')
  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'post',
    action: 'update',
    possession: 'own',
  })
  async publishPost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id: Number(id) },
      data: { published: true },
    });
  }

  @Delete('post/:id')
  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'post',
    action: 'delete',
    possession: 'own',
  })
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: Number(id) });
  }
}