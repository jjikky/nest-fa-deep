import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { FindUserReqDto } from './dto/req.dto';
import { PageReqDto } from 'src/common/dto/req.dto';
import { ApiGetItemsResponse, ApiGetResponse } from 'src/common/decorator/swagger.decorator';
import { FindUserResDto } from './dto/res.dto';
import { User } from 'src/common/decorator/user.decorator';
import { UserAfterAuth } from 'src/common/decorator/user.decorator';
import { Role } from './enum/user.enum';
import { Roles } from 'src/common/decorator/role.decorator';
import { create } from 'domain';

@ApiTags('User')
@ApiExtraModels(FindUserReqDto, PageReqDto)
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiGetItemsResponse(FindUserResDto)
  @Roles(Role.ADMIN)
  @Get()
  async findAll(@Query() { page, size }: PageReqDto, @User() user: UserAfterAuth): Promise<FindUserResDto[]> {
    const users = await this.userService.findAll(page, size);
    return users.map(({ id, email, createdAt }) => ({ id, email, createdAt: createdAt.toISOString() }));
  }

  @ApiBearerAuth()
  @ApiGetResponse(FindUserResDto)
  @Get(':id')
  findOne(@Param() { id }: FindUserReqDto) {
    return this.userService.findOne(id);
  }
}
