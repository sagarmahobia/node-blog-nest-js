import { Module } from "@nestjs/common";
import { TodoController } from "./todo.controller";
import { AppService } from "../app.service";

@Module({
  controllers: [TodoController]
})
export class TodoModule {
}
