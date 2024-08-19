import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

abstract class UserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @ApiProperty({
    example: 'gabriel',
  })
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @ApiProperty({
    example: 'senha123',
  })
  password: string;
}

export class InputUserDto extends UserDto {}

export class OutputUserDto extends UserDto {
  @IsString()
  @IsUUID()
  @ApiProperty()
  id: string;
}
