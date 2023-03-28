import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { jwtSecret } from "../contstants.k";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Module({
  providers: [AuthService, JwtStrategy, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }],
  imports: [UsersModule, PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: "06h" }
    })
  ],
  exports: [],
  controllers: [AuthController]
})
export class AuthModule {
}
