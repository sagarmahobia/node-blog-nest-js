import { CreateArticleDto } from "./create-article.dto";
import { IsIBAN, IsMongoId } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { PartialType } from "@nestjs/swagger";

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @ApiProperty(
    {
      required: true,
      type: String,
      description: "The id of the article",
      title: "Article id",
      example: "60f0b0a0e1b3a1b3a1b3a1b3"
    }
  )
  @IsMongoId()
  id: string;
}
