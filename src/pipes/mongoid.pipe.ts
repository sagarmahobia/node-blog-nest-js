//mongo id pipe
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { Types } from "mongoose";
export  class MongoIdPipe implements PipeTransform {


  constructor(private required = true) { 
  }  


  transform(value: any, metadata: ArgumentMetadata) {
    const validObjectId = Types.ObjectId.isValid(value);

    
    if (!validObjectId && this.required) {
      throw new BadRequestException('Invalid id, Id must be a valid 24 character hex string');
    }
    return value;
  }
}
