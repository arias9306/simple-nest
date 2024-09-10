import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
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
        where: { name: Like(`%${filter.criteria}%`) },
      });
    }
    return await this.todoRepository.find();
  }

  findOne(id: number) {
    return this.todoRepository.findOne({ where: { id } });
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.todoRepository.update(id, updateTodoDto);
  }

  remove(id: number) {
    return this.todoRepository.delete(id);
  }
}
