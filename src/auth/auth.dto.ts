import { ApiProperty } from '@nestjs/swagger';
import {
  IsJWT,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

abstract class AuthLoginDto {
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

export class InputAuthLoginDto extends AuthLoginDto {}

export class AuthResponseDto {
  @IsString()
  @IsJWT()
  token: string;

  @IsNumber()
  expiresIn: number;
}
