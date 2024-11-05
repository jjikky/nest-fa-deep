import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { TestingModule, Test } from '@nestjs/testing';
import { User } from './entity/user.entity';

class MockRepository {
  async findOneBy(query) {
    const user: User = new User();
    user.email = query.email;
    return user;
  }
}

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: MockRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', async () => {
    const email = 'jikky@example.com';
    const result = await userService.findOneByEmail(email);
    expect(result.email).toBe(email);
  });
});
