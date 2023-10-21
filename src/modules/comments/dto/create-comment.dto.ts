import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsString } from "class-validator";

export class CreateCommentDto {

  @IsString()
  @ApiProperty({
    example: "This is a short description",
    required: true,
    type: String
  })
  content: string;

  @IsMongoId()
  @ApiProperty({
    example: "60f0b0a0e1b3a1b3a1b3a1b3",
    type: String,
    required: true
  })
  article: string;

  //name and email 

  @IsString()
  @ApiProperty({
    example: "John Doe",
    required: true,
    type: String
  })

  name: string;

  @IsString()
  @ApiProperty({
    example: "test@gmail.com",
    required: true,
    type: String
  })
  email: string;
  

}
