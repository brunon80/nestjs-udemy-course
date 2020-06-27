import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid'
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    getAlltasks(): Task[] {
        return this.tasks
    }

    getTaskById(id: string): Task {
        return this.tasks.find((task) => task.id === id)
    }

    createTask(createTaskDto: CreateTaskDTO): Task {

        const { title, description  } = createTaskDto
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task)
        return task
    }

    deleteTaskbyId(id: string): Task[] {
        this.tasks = this.tasks.filter(task => task.id !== id)
        return this.tasks
    }
}
