import { Logger, Module, ValidationPipe } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { DatabaseModule } from "./modules/database/database.module";
import { CategoryModule } from "./modules/category/category.module";
import { ArticlesModule } from "./modules/articles/articles.module";
import { HttpExceptionFilter } from "./filters/http-exception.filter";
import { MongoExceptionFilter } from "./filters/mongo-exception.filter";
import { MediaModule } from "./modules/media/media.module";
import { ConfigModule } from "@nestjs/config";
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { ClusterService } from "./cluster.service";
import { CommentsModule } from './modules/comments/comments.module';

const validationPipeProvider = {
  provide: "APP_PIPE",
  useClass: ValidationPipe
};

const httpExceptionFilterProvider = {
  provide: "APP_FILTER",
  useClass: HttpExceptionFilter
};

const mongoExceptionFilterProvider = {
  provide: "APP_FILTER",
  useClass: MongoExceptionFilter
};


const loggerProvider = {
  provide: Logger,
  useFactory: () => {
    return new Logger("BlogApp");
  }
};

@Module({
  imports: [AuthModule,
    DatabaseModule,
    CategoryModule,
    ArticlesModule,
    MediaModule,
    ConfigModule.forRoot(),
    AnalyticsModule,
    CommentsModule
  ],
  controllers: [],
  providers: [loggerProvider, validationPipeProvider, httpExceptionFilterProvider, mongoExceptionFilterProvider,ClusterService]
})
export class AppModule {
}

