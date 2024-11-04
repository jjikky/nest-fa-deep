import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';

export class FindUserReqDto {
  @ApiProperty({ required: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
