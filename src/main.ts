import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { HttpExceptionFilter } from "./filters/http-exception.filter";
import { MongoExceptionFilter } from "./filters/mongo-exception.filter";
import * as compression from "compression";
var port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,

    logger: ["error", "warn", "debug", "log", "verbose"]
  });

  app.use(compression());

  const config = new DocumentBuilder()
    .setTitle("Blogs API")
    .setDescription("The is a blog API description")
    .setVersion("1.0")
    .addTag("blogs")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("docs", app, document, {
    swaggerOptions: {
      persistAuthorization: true
    }
  });

  await app.listen(port);
}

bootstrap().then(() => console.log(
  "Server started on port " + port + ". check http://localhost:" + port + "/docs for documentation"),
);

//todo
//1. cluster
//2. docker
//3 TypeORM
//4. Unit Testing
//5. use mongo.pipeline() in filter


