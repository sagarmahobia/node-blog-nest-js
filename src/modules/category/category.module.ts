import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { DatabaseModule } from "../database/database.module";
// import { categoryProviders } from "./category.provider";
import { CategoryController } from "./category.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { CategorySchema } from "./entities/category.schema";

@Module({
  providers: [CategoryService],
  imports: [DatabaseModule, MongooseModule.forFeature([{ name: "Category", schema: CategorySchema }])],
  controllers: [CategoryController],
  exports: [CategoryService]
})
export class CategoryModule {
}


