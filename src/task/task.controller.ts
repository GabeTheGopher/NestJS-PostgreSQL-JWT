import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  FindAllParameters,
  InputTaskDto,
  OutputTaskDto,
  TaskStatusEnum,
} from './task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<OutputTaskDto> {
    return await this.taskService.findById(id);
  }

  @Get()
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'role', enum: TaskStatusEnum, required: false })
  async findAll(@Query() params: FindAllParameters): Promise<OutputTaskDto[]> {
    return await this.taskService.findAll(params);
  }

  @Post()
  async create(@Body() task: InputTaskDto): Promise<OutputTaskDto> {
    return await this.taskService.create(task);
  }

  @Put('/:id')
  async update(
    @Param('id') params: string,
    @Body() task: InputTaskDto,
  ): Promise<OutputTaskDto> {
    return await this.taskService.update(params, task);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
