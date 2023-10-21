import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { RestResponse } from "../../dto/response.dto";
import { MongoIdPipe } from "../../pipes/mongoid.pipe";
import { Role } from "../auth/dto/role.enum";
import { Public } from "../auth/guards/public.guard";
import { Roles } from "../auth/roles.enum";
import { ArticlesService } from "./articles.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { FilterArticleDto } from "./dto/filter-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";

@ApiTags("Articles")
@Controller("articles")
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {
  }

  @Get("list")
  @Public()
  async findAll(): Promise<RestResponse> {
    const didFind = await this.articlesService.findAll();

    return {
      success: true,
      data: didFind,
      message: "Successfully loaded articles",
    };

  }

  @Get("info")
  @Public()
  async findOne(
    @Query("id", MongoIdPipe) id: string): Promise<RestResponse> {

    const didFind = await this.articlesService.findOne(id);

    return {
      success: true,
      data: didFind,
      message: "Successfully loaded article"
    };

  }


  @Post("filter")
  @Public()
  async filter(
    @Body() filterArticleDto: FilterArticleDto
  ): Promise<RestResponse> {

    const didFilter = await this.articlesService.filter(filterArticleDto);

    return {
      success: true,
      data: didFilter,
      message: "Successfully filtered articles"
    };

  }


  @Public()
  @ApiQuery({ name: "categoryId", required: true, type: String })
  @ApiQuery({ name: "subCategoryId", required: false, type: String })
  @Post("by_category")
  async findArticlesByCategoryAndSubcategory(
    @Query("categoryId", MongoIdPipe,) categoryId: string, 
    @Query("subCategoryId", new MongoIdPipe(false)) subCategoryId: string
  ): Promise<RestResponse> {

    const didFind = await this.articlesService.findArticlesByCategoryAndSubcategory(
      categoryId,
      subCategoryId
    );

    return {
      success: true,
      data: didFind,
      message: "Successfully filtered articles"
    };

  }

  @Post("create")
  @ApiBearerAuth()
  @Roles(Role.Admin)

  async create(@Body() createArticleDto: CreateArticleDto): Promise<RestResponse> {
    // return this.articlesService.create(createArticleDto);

    const didCreate = await this.articlesService.create(createArticleDto);

    return {
      success: true,
      data: null,
      message: "Successfully created article"
    };

  }

  @Post("update")
  @ApiBearerAuth()
  @Roles(Role.Admin)
  async update(@Body() updateArticleDto: UpdateArticleDto): Promise<RestResponse> {
    // const didUpdate = await this.articlesService.update(updateArticleDto.id, updateArticleDto);
    await this.articlesService.update(updateArticleDto.id, updateArticleDto);

    return {
      success: true,
      data: null,
      message: "Successfully updated article"
    };

  }

  @Post("delete")
  @ApiBearerAuth()
  @Roles(Role.Admin)
  async remove(@Query("id", MongoIdPipe) id: string): Promise<RestResponse> {
    const didRemove = await this.articlesService.remove(id);

    return {
      success: true,
      data: null,
      message: "Successfully deleted article"
    };
  }
}
