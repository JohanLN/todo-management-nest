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
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Todo, TodoStatus } from './todo.entity';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() filter?: { filter: TodoStatus }) {
    return this.todoService.findAll(filter);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.todoService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() todo: Todo) {
    return this.todoService.create(todo);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body('status') status: TodoStatus) {
    return this.todoService.update(id, status);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.todoService.delete(id);
  }
}
