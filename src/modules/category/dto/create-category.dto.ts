import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsMongoId, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty(
    {
      type: String,
      required: true,
      example: "Category name"
    }
  )
  @IsString(
  )
  readonly name: string;


  //parent category

  @ApiProperty(
    {
      type: String,
      required: false,
      description: "The parent category",
    }
  )
  @IsMongoId()
  @IsOptional()
  readonly parent: string;

  //
  // @ApiProperty(
  //   {
  //     type: String,
  //     required: false,
  //     description: "The parent category",
  //     title: "Parent category",
  //     example: "60f0b0a0e1b3a1b3a1b3a1b3"
  //   }
  // )
  // @IsMongoId()
  // @IsOptional()
  // readonly category: string;


  
}
