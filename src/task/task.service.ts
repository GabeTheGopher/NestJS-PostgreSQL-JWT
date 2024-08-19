import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  FindAllParameters,
  InputTaskDto,
  OutputTaskDto,
  TaskStatusEnum,
} from './task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/db/entities/task.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  private tasks: OutputTaskDto[] = [];

  async create(task: InputTaskDto) {
    const taskToSave: TaskEntity = {
      ...task,
      status: TaskStatusEnum.TO_DO,
    };

    const createdTask = await this.taskRepository.save(taskToSave);
    return this.mapEntityToDto(createdTask);
  }

  async findById(id: string): Promise<OutputTaskDto> {
    const foundedTask = await this.taskRepository.findOne({ where: { id } });

    if (!foundedTask) {
      throw new HttpException(
        `Task with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.mapEntityToDto(foundedTask);
  }

  async findAll(params: FindAllParameters): Promise<OutputTaskDto[]> {
    const searchParams: FindOptionsWhere<TaskEntity> = {};

    if (params.title) {
      searchParams.title = Like(`%${params.title}%`);
    }

    if (params.status) {
      searchParams.status = Like(`%${params.status}%`);
    }
    const foundedTasks = await this.taskRepository.find({
      where: searchParams,
    });

    return foundedTasks.map((taskEntity) => this.mapEntityToDto(taskEntity));
  }

  async update(id: string, task: InputTaskDto): Promise<OutputTaskDto> {
    const foundedTask = await this.taskRepository.findOne({ where: { id } });

    if (!foundedTask) {
      throw new HttpException(
        `Task with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.taskRepository.merge(foundedTask, task);
    await this.taskRepository.save(foundedTask);

    return this.mapEntityToDto(foundedTask);
  }

  async remove(id: string) {
    const deletedTasksLenght = await this.taskRepository.delete(id);

    if (!deletedTasksLenght) {
      throw new HttpException(
        `Task with id: ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private mapEntityToDto(taskEntity: TaskEntity): OutputTaskDto {
    return {
      id: taskEntity.id,
      title: taskEntity.title,
      description: taskEntity.description,
      expirationDate: taskEntity.expirationDate,
      status: TaskStatusEnum[taskEntity.status],
    };
  }

  private mapDtoToEntity(taskDto: InputTaskDto): Partial<TaskEntity> {
    return {
      title: taskDto.title,
      description: taskDto.description,
      expirationDate: taskDto.expirationDate,
      status: taskDto.status.toString(),
    };
  }
}
