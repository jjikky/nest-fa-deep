import { Controller, Post, Body } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { SigninReqDto, SignupReqDto } from './dto/req.dto';
import { SignInResDto } from './dto/res.dto';
import { SignUpResDto } from './dto/res.dto';
import { AuthService } from './auth.service';
import { ApiPostResponse } from 'src/common/decorator/swagger.decorator';

@ApiTags('Auth')
@ApiExtraModels(SignUpResDto, SignInResDto)
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiPostResponse(SignUpResDto)
  @Post('signup')
  async signup(@Body() signupReqDto: SignupReqDto) {
    return this.authService.signup('email', 'password');
  }

  @ApiPostResponse(SignInResDto)
  @Post('signin')
  async signin(@Body() signinReqDto: SigninReqDto) {
    return this.authService.signin(signinReqDto);
  }
}
