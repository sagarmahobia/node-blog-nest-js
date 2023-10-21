import { Injectable } from "@nestjs/common";
import { CreateAnalyticsDto } from "./dto/create-analytics.dto";
import { UpdateAnalyticsDto } from "./dto/update-analytics.dto";
import { Analytics } from "./entities/analytics.entity";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Article } from "../articles/entities/article.entity";

@Injectable()
export class AnalyticsService {

  constructor(
    @InjectModel(Analytics.name) private analyticsModel: Model<Analytics>
  ) {
  }

  async registerVisit(id: string) {

    let article = await this.analyticsModel.findOne({ article: id });
    if (article != null) {
      //if createdAt is today, increment visits
      //else create new analytics with visits = 1

      const now = new Date();
      const createdAt =  article.createdAt ;
      if (createdAt.getDate() === now.getDate() && createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear()) {
       article.views++;
        await article.save();
      } else {
        await this.analyticsModel.create({ article: id, views: 1 });
      }
    } else {
      await this.analyticsModel.create({ article: id, views: 1 });
    }

  }


  async getTopArticles() {
    //get Top 10 Articles Distinct Last 7 Days
    let date = new Date();
    date.setDate(date.getDate() - 7);
    return await this.analyticsModel.aggregate(
      [
        {
          $match: {
            createdAt: {
              $gte: date
            }
          }
        }
      ]
    ).group(
      {
        _id: "$article",
        totalViews: { $sum: "$views" }

      }
    )
      .lookup(
        {
          from: "article",
          localField: "_id",
          foreignField: "_id",
          as: "articleData"
        }
      ).unwind("$articleData"
      )
      .sort(
        {
          totalViews: -1
        }
      ).limit(
        10
      ).exec();
  }

  //get Top 10 Categories Distinct Last 7 Days
  async getTopCategories() {
    let date = new Date();
    date.setDate(date.getDate() - 7);

    return await this.analyticsModel.aggregate(
      [
        {
          $match: {
            createdAt: {
              $gte: date
            }
          }
        }]
    ).lookup(
      {
        from: "article",
        localField: "article",
        foreignField: "_id",
        as: "articleData"
      }
    ).unwind(
      "$articleData"
    ).group(
      {
        _id: "$articleData.category",
        totalViews: { $sum: "$views" }

      }
    ).lookup(
      {
        from: "category",
        localField: "_id",
        foreignField: "_id",
        as: "categoryData"
      }
    ).unwind(
      "$categoryData"
    ).project({
      category: "$categoryData.title",
      id: "$_id",
      totalViews: "$totalViews"
    }).sort({
      totalViews: -1
    }).limit(
      10
    ).exec();


  }

  //
  //
  // findAll() {
  //   return `This action returns all analytics`;
  // }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} analytics`;
  // }
  //
  // update(id: number, updateAnalyticsDto: UpdateAnalyticsDto) {
  //   return `This action updates a #${id} analytics`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} analytics`;
  // }
}
