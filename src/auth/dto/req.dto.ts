import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator';

export class SignupReqDto {
  @ApiProperty({
    required: true,
    example: 'jikky@example.com',
  })
  @IsEmail()
  @MaxLength(30)
  email: string;

  @ApiProperty({
    required: true,
    example: 'Password1!',
  })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,30}$/)
  password: string;

  @ApiProperty({
    required: true,
    example: 'Password1!',
  })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,30}$/)
  passwordConfirm: string;
}

export class SigninReqDto {
  @ApiProperty({
    required: true,
    example: 'jikky@example.com',
  })
  @IsEmail()
  @MaxLength(30)
  email: string;

  @ApiProperty({
    required: true,
    example: 'Password1!',
  })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,30}$/)
  password: string;
}
