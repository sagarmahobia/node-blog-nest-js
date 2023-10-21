import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";


const pass = "Ch8ONeohK8J7owAb";

function getMongoURI(): string {
  return "mongodb+srv://sagarmahobia5:" + pass + "@cluster0.lmzewjc.mongodb.net/?retryWrites=true&w=majority";
}


@Module({
  // providers: [...databaseProviders],
  // exports: [...databaseProviders]
  imports: [
    MongooseModule.forRoot(getMongoURI()),
  ],
})
export class DatabaseModule {
}

