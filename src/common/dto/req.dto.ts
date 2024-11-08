import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class PageReqDto {
  @ApiPropertyOptional({ description: '페이지. default = 1' })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: '페이지당 데이터 수. default = 20' })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  size?: number = 20;
}
