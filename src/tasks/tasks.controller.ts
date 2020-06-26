import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getAllTasks(): Task[] {
        return this.taskService.getAlltasks()
    }

    @Post()
    addTask(@Body() createTaskDto: CreateTaskDTO): Task {
        return this.taskService.createTask(createTaskDto)
    }
}
