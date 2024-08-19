import { ConflictException, Injectable } from '@nestjs/common';
import { InputUserDto, OutputUserDto } from './users.dto';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async findByUsername(username: string): Promise<OutputUserDto | null> {
    const findUser = await this.usersRepository.findOne({
      where: { username },
    });

    if (!findUser) {
      return null;
    }

    return {
      id: findUser.id,
      username: findUser.username,
      password: findUser.passwordHash,
    };
  }

  async create(user: InputUserDto) {
    const userAlreadyRegistered = await this.findByUsername(user.username);

    if (userAlreadyRegistered) {
      throw new ConflictException(`User: ${user.username} already registered`);
    }

    const dbUser = new UserEntity();
    dbUser.username = user.username;
    dbUser.passwordHash = bcryptHashSync(user.password, 10);

    const { id, username } = await this.usersRepository.save(dbUser);

    return { id, username };
  }
}
