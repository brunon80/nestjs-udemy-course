import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { TaskStatus } from "./tasks-status.enum";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
        const { title, description  } = createTaskDto
        const task = new Task()
        task.title = title
        task.description = description
        task.status = TaskStatus.OPEN
        await task.save()

        return task
    }
}