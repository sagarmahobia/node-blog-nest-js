import { Module } from "@nestjs/common";
import { AnalyticsService } from "./analytics.service";
import { AnalyticsController } from "./analytics.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ArticleSchema } from "../articles/entities/article.entity";
import { Analytics } from "./entities/analytics.entity";

@Module({
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  imports: [
    MongooseModule.forFeature([{ name: Analytics.name, schema: ArticleSchema }])
  ]
})
export class AnalyticsModule {
}
