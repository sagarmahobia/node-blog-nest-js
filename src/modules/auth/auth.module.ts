import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { jwtSecret } from "../../contstants.k";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { RolesGuard } from "./guards/roles.guard";
// import { userProviders } from "./user.provider";
import { DatabaseModule } from "../database/database.module";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./dto/user.schema";

@Module({
  providers: [AuthService, JwtStrategy, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }, /*...userProviders*/
  ],
  imports: [PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: "06h" }
    }),
    DatabaseModule,
    MongooseModule.forFeature(
      [
        { name: "User", schema: UserSchema }
      ]
    )

  ],
  exports: [],
  controllers: [AuthController]
})
export class AuthModule {
}
