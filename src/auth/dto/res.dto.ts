import { ApiProperty } from '@nestjs/swagger';

export class SignUpResDto {
  @ApiProperty({ required: true })
  id: string;
}

export class SignInResDto {
  @ApiProperty({ required: true })
  accessToken: string;
}
