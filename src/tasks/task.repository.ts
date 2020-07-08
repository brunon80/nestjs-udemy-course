import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { TaskStatus } from "./tasks-status.enum";
import { getTasksFilterDTO } from "./dto/get-tasks-filter.dto";
import { User } from "src/auth/user.entity";
import { InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async getTasks(filterDto: getTasksFilterDTO, user: User): Promise<Task[]> {
        const { status, search } = filterDto
        const query =  this.createQueryBuilder('task')

        // query.where({ user: user.id }) // usando assim nao precisa criar a coluna 'userId' nas Tasks
        query.where('task.userId = :userId', { userId: user.id })

        if (status) {
            query.andWhere('task.status = :status', { status })
        }

        if (search) {
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` })
        }
        
        try {
            const tasks = await query.getMany() 
            return tasks
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }

    async createTask(createTaskDto: CreateTaskDTO, user: User): Promise<Task> {
        const { title, description  } = createTaskDto
        const task = new Task()
        task.user = user
        task.title = title
        task.description = description
        task.status = TaskStatus.OPEN
        await task.save()
        delete task.user

        return task
    }
}