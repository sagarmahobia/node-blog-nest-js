import { Controller, Get, Query, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./guards/public.guard";
import { RestResponse } from "../../dto/response.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
@ApiTags("Auth")
@Controller("auth")
@ApiBearerAuth()
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Get("login")
  @Public()
  async login(
    @Query("email") email: string,
    @Query("password") password: string
  ): Promise<RestResponse> {

    let token = await this.authService.validateUser(email, password);

    return {
      success: true,
      data: {
        token: token
      },
      message: "Login success"
    };
  }

  @Get("test")
  async test(
    @Req() req
  ): Promise<RestResponse> {
    var user = req.user;
    return {
      success: true,
      data: user,
      message: "Test success"
    };
  }

}
