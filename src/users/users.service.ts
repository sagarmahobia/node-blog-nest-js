import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
  defaultUser = {
    id: 1,
    name: "John Doe",
    email: "test@test.com",
    password: "password"
  };


  async checkUser(email: string, password: string) {

    if (email === this.defaultUser.email && password === this.defaultUser.password) {

      return { id: this.defaultUser.id, name: this.defaultUser.name, email: this.defaultUser.email };
    }
    return null;
  }

}
