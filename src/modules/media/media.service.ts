import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Media } from "./entities/media.entity";
import { Model } from "mongoose";
import { S3 } from "@aws-sdk/client-s3";
import { S3Service } from "./aws-s3.service";

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(Media.name) private mediaModel: Model<Media>,
  ) {
  }

  async create(file: Express.Multer.File) {
    let media = new Media();
    media.originalName = file.originalname;
    media.size = file.size;
    media.extension = file.originalname.split(".").pop();

    const doc = await this.mediaModel.create(media);
    doc.fullName = doc._id + "." + doc.extension;
    await doc.save();
    return doc;

  }

  async findAll() {
    return await this.mediaModel.find().exec();
  }

  async findOne(id: string) {

    let media = await this.mediaModel.findOne({ _id: id }).exec();

    if (media == null) {
      throw new NotFoundException("Media not found");
    }
    return media;

  }

  // update(id: number, updateMediaDto: UpdateMediaDto) {
  //   return `This action updates a #${id} media`;
  // }

  async remove(id: string) {
    let media = await this.mediaModel.findOne({ _id: id }).exec();

    if (media == null) {
      throw new NotFoundException("Media not found");
    }
    return media.deleteOne();

  }
}
