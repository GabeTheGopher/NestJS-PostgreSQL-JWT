import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { InputUserDto } from './users.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Post()
  create(@Body() user: InputUserDto) {
    this.UsersService.create(user);
  }
}
