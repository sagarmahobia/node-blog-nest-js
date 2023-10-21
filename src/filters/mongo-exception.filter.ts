import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { Response } from "express";
import { MongoError } from "mongodb";

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {

//MyLoggerService
  constructor(private readonly logger: Logger) {
  }

  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    //for duplicate key error
    if (exception.code === 11000) {
      response
        .status(400)
        .json({
          success: false,
          message: "Duplicate key error",
          data: null
        });
    }

    //for validation error
    else if (exception.code === 121) {
      response
        .status(400)
        .json({
          success: false,
          message: "Validation error",
          data: null
        });
    }

    //for other errors
    else {
      this.logger.error(exception.message, exception.stack);
      response
        .status(500)
        .json({
          success: false,
          message: "Something went wrong",
          data: null
        });
    }
  }
}
