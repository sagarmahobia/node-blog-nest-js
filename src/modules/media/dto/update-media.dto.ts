import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateMediaDto } from "./create-media.dto";
import { IsMongoId } from "class-validator";

export class UpdateMediaDto extends PartialType(CreateMediaDto) {


}
