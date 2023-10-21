import { Controller, Delete, Get, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { MediaService } from "./media.service";
import { MongoIdPipe } from "../../pipes/mongoid.pipe";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { Media } from "./entities/media.entity";
import { S3Service } from "./aws-s3.service";
import { Roles } from "../auth/roles.enum";
import { Role } from "../auth/dto/role.enum";

@Controller("media")
@ApiTags("Media")
@ApiBearerAuth() 
@Roles(Role.Admin)
export class MediaController {
  constructor(private readonly mediaService: MediaService,
              private readonly s3Service: S3Service
  ) {
  }

  @Post("create")
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary"
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor("file"))
  async create(@UploadedFile() file: Express.Multer.File) {
    let data = await this.mediaService.create(file);
    let upload = await this.s3Service.uploadFile(file, data.fullName);
    return {
      success: true,
      data: upload,
      message: "Successfully created media"
    };
  }

  @Get("list")
  async findAll() {
    let media = await this.mediaService.findAll();
    return {
      success: true,
      data: media,
      message: "Successfully loaded media"
    };
  }

  @Get("info")
  async findOne(@Query("id", MongoIdPipe) id: string) {
    let media = await this.mediaService.findOne(id);

    return {
      success: true,
      data: media,
      message: "Successfully loaded media"
    };
  }

  // @Post("Create")
  // update(@Query("id") id: string, @Body() updateMediaDto: UpdateMediaDto) {
  //   return this.mediaService.update(+id, updateMediaDto);
  // }

  @Get("delete")
  async remove(@Query("id", MongoIdPipe) id: string) {
    let media = await this.mediaService.findOne(id);
    await this.s3Service.deleteFile(media.fullName);
    await this.mediaService.remove(id);
    return {
      success: true,
      message: "Successfully deleted media",
      data: null
    };
  }
}
