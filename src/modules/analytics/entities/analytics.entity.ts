import { Prop } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Article } from "../../articles/entities/article.entity";

export class Analytics {

  @Prop(
    {
      type: mongoose.Schema.Types.ObjectId
    }
  )
  readonly article: Article;


  //views
  @Prop(
    {
      type: Number
    }
  )
  views: number;

  //createdAt
  @Prop(
    {
      type: Date
    }
  )
  readonly createdAt: Date;


}
