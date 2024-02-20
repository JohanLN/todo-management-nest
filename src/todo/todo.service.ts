import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo, TodoStatus } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async findAll(filter?: { filter: TodoStatus }) {
    let queryBuilder = this.todoRepository.createQueryBuilder('todo');

    if (filter.filter) {
      if (!Object.values(TodoStatus).includes(filter.filter as TodoStatus)) {
        return [];
      }

      queryBuilder = queryBuilder.where('todo.status = :status', {
        status: filter.filter,
      });
    }

    const todos = await queryBuilder.getMany();

    if (!filter.filter || todos.length > 0) {
      return todos;
    } else {
      return [];
    }
  }

  findOne(id: number) {
    return this.todoRepository.findOne({ where: { id: id } });
  }

  async create(todo: Todo) {
    return this.todoRepository.save(todo);
  }

  async update(id: number, status: TodoStatus) {
    const todo = await this.todoRepository.findOne({ where: { id: id } });

    if (todo) {
      todo.status = status;

      return this.todoRepository.save(todo);
    }

    return null;
  }

  delete(id: number) {
    return this.todoRepository.delete(id).then(() => {});
  }
}
