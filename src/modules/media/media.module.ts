import { Module } from "@nestjs/common";
import { MediaService } from "./media.service";
import { MediaController } from "./media.controller";
import { DatabaseModule } from "../database/database.module";
import { MongooseModule } from "@nestjs/mongoose";
import { MediaSchema } from "./entities/media.entity";
import { S3 } from "@aws-sdk/client-s3";
import { S3Service } from "./aws-s3.service";

const s3Provider = {
  provide: S3,
  useFactory: () => {
    return new S3
    ({
      region: process.env.AWS_S3_BUCKET_REGION,
      credentials: {
        accessKeyId: process.env.AWS_S3_BUCKET_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_BUCKET_SECRET

      }
    });
  }
};

const s3BucketNameProvider = {
  provide: "AWS_S3_BUCKET_NAME",
  // useValue: process.env.AWS_S3_BUCKET
  useFactory: () => {
    return process.env.AWS_S3_BUCKET_NAME;
  }
}
;

const s3BucketRegionProvider = {
  provide: "AWS_S3_BUCKET_REGION",
  // useValue: process.env.AWS_S3_BUCKET_REGION
  useFactory: () => {
    return process.env.AWS_S3_BUCKET_REGION;
  }
};

@Module({
  controllers: [MediaController],
  providers: [MediaService, S3Service, s3Provider, s3BucketNameProvider, s3BucketRegionProvider],
  imports: [DatabaseModule, MongooseModule.forFeature([{ name: "Media", schema: MediaSchema }])]
})
export class MediaModule {
}
