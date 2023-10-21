import { Inject, Injectable } from "@nestjs/common";
import { S3 } from "@aws-sdk/client-s3";

@Injectable()
export class S3Service {
  constructor(private s3: S3,
              @Inject("AWS_S3_BUCKET_NAME")
              private bucket: string,
              @Inject("AWS_S3_BUCKET_REGION")
              private region: string
  ) {
  }

  async uploadFile(file: Express.Multer.File, fileName: string) {

    try {
      const params =
        {
          Bucket: this.bucket,
          Key: fileName,
          Body: file.buffer,
          ContentType: file.mimetype,
          ContentDisposition: "inline",
          CreateBucketConfiguration:
            {
              LocationConstraint: this.region
            }
        };

      return await this.s3.putObject(params);
    } catch (e) {
      return null;
    }
  }

  async deleteFile(fileName: string) {
    try {
      const params =
        {
          Bucket: this.bucket,
          Key: fileName
        };

      return await this.s3.deleteObject(params);
    } catch (e) {
      return null;
    }
  }

}
