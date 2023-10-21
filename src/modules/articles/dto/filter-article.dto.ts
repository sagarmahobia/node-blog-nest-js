import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsOptional } from "class-validator";
import * as mongoose from "mongoose";

export class FilterArticleDto {

  @IsMongoId()
  @IsOptional()
  @ApiProperty(
    {
      type: String

    }
  )
  readonly category: string;

  @IsMongoId({
    each: true
  })
  @IsOptional()
  @ApiProperty(
    {
      type: [String]
    }
  )
  readonly subCategories: string[];

  @IsOptional()
  @ApiProperty(
    {
      type: [String]
    }
  )
  readonly tags: string[];

  @IsOptional()
  @ApiProperty(
    {
      type: String
    }
  )
  readonly search: string;


}
