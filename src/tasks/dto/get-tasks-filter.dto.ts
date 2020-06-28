import { TaskStatus } from '../task.model'
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class getTasksFilterDTO {
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty({ message: 'Esse campo não pode ser vazio' })
    search: string;
}