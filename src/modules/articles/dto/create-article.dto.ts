import { IsEmail, IsMongoId, IsOptional, IsString } from "class-validator";
import { CreateCategoryDto } from "../../category/dto/create-category.dto";
import { ApiProperty } from "@nestjs/swagger";
import * as mongoose from "mongoose";

export class CreateArticleDto {

  @IsString(
    {}
  )
  @ApiProperty(
    {
      example: "How to create a NestJS project",
      type: String
    }
  )
  readonly title: string;

  @IsString()
  @ApiProperty({
    example: "This is a short description",
    type: String
  })
  readonly shortDescription: string;

  @IsString()
  @ApiProperty(
    {
      type: String,
      required: true
    }
  )
  readonly description: string;

  @IsMongoId()
  @IsOptional()

  @ApiProperty(
    {
      type: mongoose.Schema.Types.ObjectId,
      example: "60f0b0a0e1b3a1b3a1b3a1b3"

    }
  )
  readonly category: string;


  @IsMongoId({
    each: true
  })
  @IsOptional()
  @ApiProperty(
    {
      type: [mongoose.Schema.Types.ObjectId],
      example: ["60f0b0a0e1b3a1b3a1b3a1b3"]
    })
  readonly subCategories: string[];

  @IsMongoId({
    each: true
  })
  @IsOptional()
  @ApiProperty(
    {
      type: [mongoose.Schema.Types.ObjectId],
      example: ["60f0b0a0e1b3a1b3a1b3a1b3"]
    }
  )
  readonly media: string[];


  @IsOptional()
  @ApiProperty(
    {
      type: [mongoose.Schema.Types.ObjectId],
      example: ["explore", "learn", "discover"]

    })
  readonly tags: string[];

}

