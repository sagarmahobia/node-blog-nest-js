import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Model } from "mongoose";
import { User } from "./dto/user.schema";
import { JwtUser } from "./dto/jwt-user.model";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>
  ) {
  }

  async validateUser(email: string, password: string): Promise<string> {

    let user = await this.userModel.findOne({ email: email, password: password });


    if (user) {
      let jwtUser: JwtUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles
      };

      return this.jwtService.sign(jwtUser);
    } else {
      //401
      throw new BadRequestException("Invalid credentials");
    }


  }


}

