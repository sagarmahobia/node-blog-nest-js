import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './entities/comment.entity';
import { async } from 'rxjs';
@Injectable()
export class CommentsService {

  constructor(
    @InjectModel("Comment") private readonly commentModel: Model<CommentDocument>
  ) { }

  async create(createCommentDto: CreateCommentDto) {
    await this.commentModel.create(createCommentDto);
  }

  async findAll() {
    return await this.commentModel.find().exec();
  }

  async findOne(id: string) {
    let comment = await this.commentModel.findOne({ _id: id }).exec();

    if (!comment) {
      throw new NotFoundException(`Comment #${id} not found`);
    }
    return comment;
  }

  async findByArticle(id: string) {
    let comments = this.commentModel.find({ article: id }).exec();

    if (!comments) {
      throw new NotFoundException(`Comment #${id} not found`);
    }
    return comments;

  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentModel.findOne({ _id: id }).exec();
    if (!comment) {
      throw new NotFoundException(`Comment #${id} not found`);
    }
    Object.assign(comment, updateCommentDto);
    comment.save();
  }

  async remove(id: number) {
    const comment = await this.commentModel.findOne({ _id: id }).exec()
    if (!comment) {
      throw new NotFoundException(`Comment #${id} not found`);
    }
    return comment.deleteOne();
  }
}
