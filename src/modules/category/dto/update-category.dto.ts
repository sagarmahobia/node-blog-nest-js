import { CreateCategoryDto } from "./create-category.dto";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsMongoId, IsString } from "class-validator";

export  class UpdateCategoryDto extends PartialType(CreateCategoryDto) {


  @ApiProperty(
    {
      type: String,
      required: true,
      example: "*parent id*"
    }
  )
  @IsMongoId()
  readonly id: string;

}
