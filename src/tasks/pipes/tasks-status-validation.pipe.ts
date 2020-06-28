import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ]

    transform(value: string): any {
        value = value.toUpperCase()

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`O status ${value} não é um valor válido`)
        }
        return value
    }

    private isStatusValid(status: any): boolean {
        const idx = this.allowStatuses.indexOf(status)
        return idx !== -1
    }
}