import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { FilterDto } from './dto/filter.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const todo = new Todo();
    todo.name = createTodoDto.name;
    todo.isCompleted = createTodoDto.isCompleted;
    return await this.todoRepository.save(todo);
  }

  async findAll(filter: FilterDto) {
    if (filter?.criteria) {
      return await this.todoRepository.find({
        where: { name: ILike(`%${filter.criteria}%`) },
      });
    }
    return await this.todoRepository.find();
  }

  async findOne(id: number) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found.`);
    }
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const changed = await this.todoRepository.update(id, updateTodoDto);

    if (!changed.affected) {
      throw new NotFoundException(`Todo with id ${id} not found.`);
    }
    return this.findOne(id);
  }

  async remove(id: number) {
    const removed = await this.todoRepository.delete(id);
    if (!removed.affected) {
      throw new NotFoundException(`Todo with id ${id} not found.`);
    }
  }
}
