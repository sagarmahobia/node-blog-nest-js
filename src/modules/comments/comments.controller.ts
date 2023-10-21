import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/pipes/mongoid.pipe';
import { Roles } from '../auth/roles.enum';
import { Role } from '../auth/dto/role.enum';
import { Public } from '../auth/guards/public.guard';

@ApiTags("Comments")
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post("create")
  @ApiBearerAuth()
  @Roles(Role.Admin)
  async create(@Body() createCommentDto: CreateCommentDto) {
   
   
    //todo check if article exists
   
    let comment = await this.commentsService.create(createCommentDto);

    return {
      success: true,
      message: "Successfully created comment"
    };

  }

  @Get("list")
  @Public()
  async findAll() {
    let all = await this.commentsService.findAll();

    return {
      success: true,
      data: all,
      message: "Successfully loaded comments"
    };
  }

  @Get('info/:id')
  @Public()
  async findOne(@Param('id', MongoIdPipe) id: string) {
    let didFind = await this.commentsService.findOne(id);

    return {
      success: true,
      data: didFind,
      message: "Successfully loaded comment"
    };

  }

  @Get('article/:id')
  @Public()
  async findByArticle(@Param('id', MongoIdPipe) id: string) {
    let didFind = await this.commentsService.findByArticle(id);

    return {
      success: true,
      data: didFind,
      message: "Successfully loaded comments"
    };

  }

  @Post('update/:id')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  async update(@Param('id', MongoIdPipe) id: string, @Body() updateCommentDto: UpdateCommentDto) {
    await this.commentsService.update(id, updateCommentDto);

    return {
      success: true,
      message: "Successfully updated comment"
    };

  }

  @Get('remove/:id')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  async remove(@Param('id', MongoIdPipe) id: string) {


    await this.commentsService.remove(+id);

    return {
      success: true,
      message: "Successfully deleted comment"
    };

  }
}
