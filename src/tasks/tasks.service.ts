import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { getTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './tasks-status.enum';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}

    // getAlltasks(): Task[] {
    //     return this.tasks
    // }

    // getTasksWithFilters(filterDto: getTasksFilterDTO): Task[] {
    //     const { status, search } = filterDto

    //     let tasks = this.getAlltasks()

    //     if(status) {
    //         tasks = tasks.filter(task => task.status === status)
    //     }

    //     if (search) {
    //         tasks = tasks.filter(task => 
    //             task.title.includes(search) ||
    //             task.description.includes(search)    
    //         )
    //     }

    //     return tasks
    // }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id)

        if(!found) throw new NotFoundException(`Tarefa com ID ${id} não encontrada`)

        return found
    }

    async createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto)
    }


    // deleteTask(id: string): void {
    //     const found = this.getTaskById(id)
    //     this.tasks = this.tasks.filter(task => task.id !== found.id)
    // }
    
    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id)
    //     task.status = status
    //     return task
    // }
}
