import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema(
  {

    toObject: {
      virtuals: true,
      transform: function(doc, ret) {
        delete ret._id;
        delete ret.__v;
      }
    }
    ,
    toJSON: {
      virtuals: true,
      transform: function(doc, ret) {
        delete ret._id;
        delete ret.__v;
      }
    }
  }
)
export class Media {

  @Prop({ required: true })
  originalName: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  extension: string;

  @Prop()
  fullName: string;


}

export const MediaSchema = SchemaFactory.createForClass(Media);

