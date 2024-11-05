import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { Role } from './enum/user.enum';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async findAll(page: number, size: number) {
    return this.userRepository.find({
      skip: (page - 1) * size,
      take: size,
    });
  }

  async findOne(id: string) {
    return 'find user';
  }

  async create(email: string, password: string) {
    return this.userRepository.save({ email, password });
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async checkUserIsAdmin(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    return user.role === Role.ADMIN;
  }
}
