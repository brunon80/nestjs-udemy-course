import { TaskStatus } from '../task.model'

export class getTasksFilterDTO {
    status: TaskStatus;
    search: string;
}