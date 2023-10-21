import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Category } from "../../category/entities/category.schema";
import * as mongoose from "mongoose";
import { Media } from "../../media/entities/media.entity";

@Schema(
  {
    timestamps: true
    , toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
      }
    },
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
      }
    }
  }
)
export class Article {
  @Prop({
    required: true,
    index: "text"
  })
  title: string;

  @Prop({
    required: true
  })
  shortDescription: string;

  @Prop({
      required: true
    }
  )
  description: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Category.name
  })
  category: Category;

  @Prop({
    required: true,
    type: [mongoose.Schema.Types.ObjectId],
    ref: Category.name
  })
  subCategories: Category[];

  //media: Media[];

  @Prop({
    required: true,
    type: [mongoose.Schema.Types.ObjectId],
    ref: Media.name
  })
  media: Media[];


  @Prop({
    required: true,
    type: [String],
  })
  tags: String[];

}


export const ArticleSchema = SchemaFactory.createForClass(Article);
