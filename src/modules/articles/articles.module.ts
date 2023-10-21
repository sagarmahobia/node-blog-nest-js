import { Module } from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { ArticlesController } from "./articles.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ArticleSchema } from "./entities/article.entity";
import { CategoryService } from "../category/category.service";
import { CategoryModule } from "../category/category.module";

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
  imports: [
    MongooseModule.forFeature([{ name: "Article", schema: ArticleSchema }]),
    CategoryModule
  ],
  exports: [ArticlesService]
})
export class ArticlesModule {
}
