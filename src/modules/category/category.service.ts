import { Inject, Injectable } from "@nestjs/common";
import { Category } from "./entities/category.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { NotFoundError } from "rxjs";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>
  ) {
  }

  async findAllParentCategories(): Promise<Category[]> {
    return await this.categoryModel.find({ parent: null }).exec();
  }

  async findOneCategory(id: string): Promise<Category> {
    return await this.categoryModel.findOne({ _id: id }).exec();
  }

  async findSubCategories(id: string): Promise<Category[]> {
    return await this.categoryModel.find({ parent: id }).exec();
  }

  async create(category: CreateCategoryDto): Promise<Category> {
    return this.categoryModel.create(category);
  }

  async update(category: UpdateCategoryDto) {

    let cat = await this.categoryModel.findOne({ _id: category.id }).exec();
    if (cat == null) {
      throw new NotFoundError("Category not found");
    }

    return await cat.updateOne(category).exec();
  }

  async delete(id: string) {
    let cat = await this.categoryModel.findOne({ _id: id }).exec();
    if (cat == null) {
      throw new NotFoundError("Category not found");
    }

    await this.categoryModel.deleteMany({ parent: id }).exec();
    return cat.deleteOne();

  }

//   async addParent(id: string, parentId: string) {
//     let cat = await this.categoryModel.findOne({ _id: id }).exec();
//     let parent = await this.categoryModel.findOne({ _id: parentId }).exec();
//     if (parent != null) {
//       cat.parent = parent;
//       return await cat.save();
//     }
//     throw new NotFoundError("Parent not found");
// 
//   }
// 
//   async removeParent(id: string, parent: string) {
// 
//     let cat = await this.categoryModel.findOne({ _id: id }).exec();
//     if (cat == null) {
//       throw new NotFoundError("Category not found");
//     }
// 
//     cat.parent = null;
//     return await cat.save();
//   }




}
