import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
    private tasks = []

    getAlltasks() {
        return this.tasks
    }
}
