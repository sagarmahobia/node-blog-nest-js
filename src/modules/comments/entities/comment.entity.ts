import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Article } from 'src/modules/articles/entities/article.entity';
export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop(
    {
      required: true,
      type: String,
    }
  )
  content: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Article.name,
    required: true
  })
  article: Article;

  @Prop(
    {
      type: String,
      required: true
    }
  )
  name: string;

  @Prop(
    {
      type: String,
      required: true
    }
  )
  email: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);