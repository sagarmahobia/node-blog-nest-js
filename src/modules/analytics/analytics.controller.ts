import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { UpdateAnalyticsDto } from './dto/update-analytics.dto';
import { MongoIdPipe } from 'src/pipes/mongoid.pipe';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Analytics")
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) { }

  @Get()
  //need a system role to make this protected //toto
  create(@Query("articleId", MongoIdPipe) id: string) {
    this.analyticsService.registerVisit(id);

    return {
      success: true,
      message: "Successfully registered visit"
    };

  }

  @Get("top")
  async getTopArticles() {
    let top = await this.analyticsService.getTopArticles();
    return {
      success: true,
      data: top,
      message: "Successfully loaded top articles"
    };
  }


}
