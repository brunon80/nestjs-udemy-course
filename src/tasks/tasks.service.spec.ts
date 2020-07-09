import { Test } from '@nestjs/testing'
import { TasksService } from './tasks.service'
import { TaskRepository } from './task.repository'
import { getTasksFilterDTO } from './dto/get-tasks-filter.dto'
import { TaskStatus } from './tasks-status.enum'

const mockUser = { username: 'Teste user'}

const mockTaskRepository = () => ({
    getTasks: jest.fn()
})

describe('TaskService', () => {
    let taskService
    let taskRepository
    
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: TaskRepository, useFactory: mockTaskRepository }
            ]
        }).compile()

        taskService = module.get<TasksService>(TasksService)
        taskRepository = module.get<TaskRepository>(TaskRepository)
    })

    describe('getTasks', () => {
        it('get all tasks from repository', async () => {
            taskRepository.getTasks.mockResolvedValue('some value')

            expect(taskRepository.getTasks).not.toHaveBeenCalled()
            const filters: getTasksFilterDTO = { status: TaskStatus.IN_PROGRESS, search: 'Some search query' }
            const result = await taskService.getTasks(filters, mockUser)
            expect(taskRepository.getTasks).toHaveBeenCalled()
            expect(result).toEqual('some value')
        })
    })
})