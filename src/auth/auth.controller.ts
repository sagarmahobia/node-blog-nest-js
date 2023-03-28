import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { Public } from "./public.guard";
import e from "express";

@Controller("auth")
export class AuthController {


  constructor(private authService: AuthService) {

  }

  @Get("login")
  @Public()
  async login(
    @Query("email") email: string,
    @Query("password") password: string
  ): Promise<ResponseDto> {

    let token = await this.authService.validateUser(email, password);

    if (!token) {
      return {
        status: false,
        data: null,
        message: "Login failed"
      };
    }

    return {
      status: true,
      data: {
        token: token
      },
      message: "Login success"
    };
  }

  @Get("test")
  async test(): Promise<ResponseDto> {
    return {
      status: true,
      data: null,
      message: "Test success"
    };
  }

}
