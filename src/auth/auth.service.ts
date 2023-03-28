import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {
  }

  async validateUser(email: string, password: string): Promise<string> {
    const user = await this.usersService.checkUser(email, password);
    if (user) {
      return this.jwtService.sign(user);
    }
    return null;
  }


}
