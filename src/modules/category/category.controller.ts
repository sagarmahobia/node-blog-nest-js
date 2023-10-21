import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { RestResponse } from "../../dto/response.dto";
import { Roles } from "../auth/roles.enum";
import { Role } from "../auth/dto/role.enum";
import { Public } from "../auth/guards/public.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { MongoIdPipe } from "../../pipes/mongoid.pipe";
import { NotFoundError } from "rxjs";

@ApiTags("Categories")
@Controller("category")
export class CategoryController {

  constructor(
    private readonly categoryService: CategoryService
  ) {
  }

  @Get("parents")
  @Public()
  async getParentCategories(): Promise<RestResponse> {
    let categories = await this.categoryService.findAllParentCategories();

    return {
      success: true,
      data: categories,
      message: "Successfully loaded categories"
    };
  }


  @Get("children")
  @Public()
  async findChildren(
    @Query("id", MongoIdPipe)
      id: string
  ): Promise<RestResponse> {
    let categories = await this.categoryService.findSubCategories(id);

    return {
      success: true,
      data: categories,
      message: "Successfully loaded category"
    };

  }

  @Get("detail")
  @Public()
  async findOneCategory(
    @Query("id", MongoIdPipe)
      id: string
  ): Promise<RestResponse> {
    let category = await this.categoryService.findOneCategory(id);

    return {
      success: true,
      data: category,
      message: "Successfully loaded category"
    };

  }

  @Post("create")
  @ApiBearerAuth()
  @Roles(Role.Admin)
  async create(
    @Body()
      category: CreateCategoryDto
  ): Promise<RestResponse> {

    if (category.parent != null) {

      let parent = await this.categoryService.findOneCategory(category.parent);
      if (parent == null) {
        throw new NotFoundError("Parent not found");
      }
    }
    let newCategory = await this.categoryService.create(category);
    return {
      success: true,
      data: newCategory,
      message: "Successfully created category"
    };

  }

  @Post("update")
  @ApiBearerAuth()
  @Roles(Role.Admin)
  async update(
    @Body()
      category: UpdateCategoryDto
  ): Promise<RestResponse> {
    await this.categoryService.update(category);
    return {
      success: true,
      data: null,
      message: "Successfully updated category"
    };

  }

  @Get("delete")
  @ApiBearerAuth()
  @Roles(Role.Admin)
  async delete(
    @Query("id", MongoIdPipe)
      id: string
  ): Promise<RestResponse> {
    await this.categoryService.delete(id);
    return {
      success: true,
      data: null,
      message: "Successfully deleted category"
    };
  }

//   @Get("update-parent")
//   @ApiBearerAuth()
//   @Roles(Role.Admin)
//   async addParent(
//     @Query("id", MongoIdPipe)
//       id: string,
//     @Query("parent", MongoIdPipe)
//       parent: string
//   ): Promise<RestResponse> {
// 
//     await this.categoryService.addParent(id, parent);
//     return {
//       success: true,
//       data: null,
//       message: "Successfully added parent"
//     };
// 
//   }

//   @Get("remove-parent")
//   @ApiBearerAuth()
// 
//   @Roles(Role.Admin)
//   async removeParent(
//     @Query("id", MongoIdPipe)
//       id: string,
//     @Query("parent", MongoIdPipe)
//       parent: string
//   ): Promise<RestResponse> {
//     await this.categoryService.removeParent(id, parent);
//     return {
//       success: true,
//       data: null,
//       message: "Successfully removed parent"
//     };
// 
//   }
}

