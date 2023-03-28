import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TodoController } from "./todo/todo.controller";
import { TodoModule } from "./todo/todo.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [TodoModule, AuthModule, UsersModule],
  controllers: [TodoController],
  providers: [AppService]
})
export class AppModule {
}
