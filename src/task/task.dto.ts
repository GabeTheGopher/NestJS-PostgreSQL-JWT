import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum TaskStatusEnum {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

abstract class TaskDto {
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  @ApiProperty({
    example: 'tarefa',
  })
  title: string;

  @IsString()
  @MinLength(5)
  @MaxLength(512)
  @ApiProperty({
    example: 'descricao',
  })
  description: string;

  @IsEnum(TaskStatusEnum)
  @IsOptional()
  @ApiProperty({
    enum: TaskStatusEnum,
    example: 'TO_DO',
  })
  status: string;

  @IsDateString()
  @ApiProperty({
    example: '2024-01-01',
  })
  expirationDate: Date;
}

export class InputTaskDto extends TaskDto {}

export class OutputTaskDto extends TaskDto {
  @IsUUID()
  id: string;
}

export class FindAllParameters {
  title?: string;
  status?: string;
}
