import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { SigninReqDto, SignupReqDto } from './dto/req.dto';
import { SignInResDto } from './dto/res.dto';
import { SignUpResDto } from './dto/res.dto';
import { AuthService } from './auth.service';
import { ApiPostResponse } from 'src/common/decorator/swagger.decorator';
import { Public } from 'src/common/decorator/public.decorator';

@ApiTags('Auth')
@ApiExtraModels(SignUpResDto, SignInResDto)
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiPostResponse(SignUpResDto)
  @Public()
  @Post('signup')
  async signup(@Body() { email, password, passwordConfirm }: SignupReqDto) {
    if (password !== passwordConfirm) throw new BadRequestException();
    const { id } = await this.authService.signup(email, password);
    return { id };
  }

  @ApiPostResponse(SignInResDto)
  @Public()
  @Post('signin')
  async signin(@Body() { email, password }: SigninReqDto) {
    return this.authService.signin(email, password);
  }
}
