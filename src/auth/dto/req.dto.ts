import { ApiProperty } from '@nestjs/swagger';

export class SignupReqDto {
  @ApiProperty({
    required: true,
    example: 'jikky@example.com',
  })
  email: string;

  @ApiProperty({
    required: true,
    example: 'Password1!',
  })
  password: string;

  @ApiProperty({
    required: true,
    example: 'Password1!',
  })
  passwordConfirm: string;
}

export class SigninReqDto {
  @ApiProperty({
    required: true,
    example: 'jikky@example.com',
  })
  email: string;

  @ApiProperty({
    required: true,
    example: 'Password1!',
  })
  password: string;
}
