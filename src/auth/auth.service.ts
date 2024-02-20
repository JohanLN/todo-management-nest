import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthPayloadDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: AuthPayloadDto) {
    const findUser = await this.userService.findOneByEmail(email);
    if (!findUser) {
      return null;
    }

    if (password === findUser.password) {
      const { password, ...user } = findUser;
      return { token: this.jwtService.sign(user) };
    }
  }

  verifyToken(token: string) {
    console.log('VerifyToken ==>', token);
  }
}
