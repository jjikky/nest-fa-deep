import { Controller, Post, Body, BadRequestException, Headers } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { SigninReqDto, SignupReqDto } from './dto/req.dto';
import { RefreshResDto, SignInResDto } from './dto/res.dto';
import { SignUpResDto } from './dto/res.dto';
import { AuthService } from './auth.service';
import { ApiPostResponse } from 'src/common/decorator/swagger.decorator';
import { Public } from 'src/common/decorator/public.decorator';
import { User, UserAfterAuth } from 'src/common/decorator/user.decorator';

@ApiTags('Auth')
@ApiExtraModels(SignUpResDto, SignInResDto, RefreshResDto)
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiPostResponse(SignUpResDto)
  @Public()
  @Post('signup')
  async signup(@Body() { email, password, passwordConfirm }: SignupReqDto): Promise<SignUpResDto> {
    if (password !== passwordConfirm) throw new BadRequestException();
    const { id, accessToken, refreshToken } = await this.authService.signup(email, password);
    return { id, accessToken, refreshToken };
  }

  @ApiPostResponse(SignInResDto)
  @Public()
  @Post('signin')
  async signin(@Body() { email, password }: SigninReqDto) {
    return this.authService.signin(email, password);
  }

  @ApiPostResponse(RefreshResDto)
  @ApiBearerAuth()
  @Post('refresh')
  async refresh(@Headers('authorization') authorization, @User() user: UserAfterAuth) {
    const token = authorization.split(' ')[1];
    const { accessToken, refreshToken } = await this.authService.refresh(token, user.id);
    return { accessToken, refreshToken };
  }
}
