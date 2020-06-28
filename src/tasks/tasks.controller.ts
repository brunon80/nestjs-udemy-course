import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { getTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/tasks-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: getTasksFilterDTO): Task[] {
        if (Object.keys(filterDto).length) {
            return this.taskService.getTasksWithFilters(filterDto)
        } else {
            return this.taskService.getAlltasks()
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    addTask(@Body() createTaskDto: CreateTaskDTO): Task {
        return this.taskService.createTask(createTaskDto)
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): void {
        this.taskService.deleteTask(id)
    }
    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus
    ): Task {
        return this.taskService.updateTaskStatus(id, status)
    }
}
