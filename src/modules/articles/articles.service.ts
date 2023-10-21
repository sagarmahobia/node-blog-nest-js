import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Article } from "./entities/article.entity";
import { Model } from "mongoose";
import { FilterArticleDto } from "./dto/filter-article.dto";
import { CategoryService } from "../category/category.service";

@Injectable()
export class ArticlesService {

  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
    private readonly categoryService: CategoryService
  ) {
  }

  async create(article: CreateArticleDto): Promise<Article> {
    return await this.articleModel.create(article);
  }

  async findAll(): Promise<Article[]> {
    return await this.articleModel.find().populate("category").populate("subCategories").populate("tags").populate("media").exec();

  }

  async findOne(id: string): Promise<Article> {

    let article = await this.articleModel.findOne({ _id: id }).populate("category").populate("subCategories").populate("tags").populate("media").exec();

    if (article == null) {
      throw new NotFoundException("Article not found");
    }

    return article;

  }

  async filter(
    filterArticleDto: FilterArticleDto
  ) {

    const { category, subCategories, tags, search } = filterArticleDto;
    let query = {};
    
    if (search != null && search.length > 0) {
           
      var orQuery = [];
 
      orQuery.push({ title: { $regex: search, $options: "i" } });
      orQuery.push({ shortDescription: { $regex: search, $options: "i" } });
      orQuery.push({ description: { $regex: search, $options: "i" } });
      orQuery.push({ tags: { $regex: search, $options: "i" } });

      query["$or"] = orQuery;

    }

    if (category != null) {
      query["category"] = category;
    }

    if (subCategories != null && subCategories.length > 0) {

      query["subCategories"] = { $in: subCategories };

    }

    if (tags != null && tags.length > 0) {
      query["tags"] = { $in: tags };
    }

    return this.articleModel.find(query).populate("category").populate("subCategories").populate("tags").populate("media").exec();
    
  }


  async findArticlesByCategoryAndSubcategory(categoryId: string, subCategoryId: string) {
    let articles = [];

    var query = {};

    if (subCategoryId == null || subCategoryId.length == 0) {
      query = { category: categoryId };
    }
    else {
      query = {
        $and: [
          { category: categoryId },
          {
            subCategories: {
              $in: [subCategoryId]
            }
          }
        ]
      }
    }
    return this.articleModel.find(query).populate("category").populate("subCategories").populate("tags").populate("media").exec();
  }





  async update(id: string, updateArticleDto: UpdateArticleDto) {

    let article = await this.articleModel.findOne({ _id: id });

    if (!article) {
      throw new NotFoundException("Article not found");
    }

    Object.assign(article, updateArticleDto);

    return article. save();

  }

  async remove(id: string) {
    let article = await this.articleModel.findOne({ _id: id });

    if (article == null) {
      throw new NotFoundException("Article not found");
    } else {
      return await this.articleModel.deleteOne(
        { _id: id }
      ).exec();
    }


  }

  async removeTagFromArticles(id: string) {
    await this.articleModel.updateMany({ tags: id }, { $pull: { tags: id } }).exec();
  }
}
