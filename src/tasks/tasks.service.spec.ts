import { Test } from '@nestjs/testing'
import { TasksService } from './tasks.service'
import { TaskRepository } from './task.repository'
import { getTasksFilterDTO } from './dto/get-tasks-filter.dto'
import { TaskStatus } from './tasks-status.enum'
import { NotFoundException } from '@nestjs/common'

const mockUser = { id: 12, username: 'Teste user' }

const mockTaskRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn(),
    createTask: jest.fn(),
    delete: jest.fn(),
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

    describe('getTaskById', () => {
        it('call taskRepository.fidOne() and succesffuly retrieve and return the task', async () => {
            const mockTask = { title: 'Test task', description: 'test desc' }
            taskRepository.findOne.mockResolvedValue(mockTask)

            const result = await taskService.getTaskById(1, mockUser)
            expect(result).toEqual(mockTask)

            expect(taskRepository.findOne).toHaveBeenCalledWith({ where: {
                id: 1,
                userId: mockUser.id
            }})
        })

        it('Throws an a error as task is no found', () => {
            taskRepository.findOne.mockResolvedValue(null)
            expect(taskService.getTaskById(1, mockUser)).rejects.toThrow(NotFoundException)
        })
    })

    describe('cretateTask', () => {
        it('calls taskRepository.createTask and returns the result', async () => {
            taskRepository.createTask.mockResolvedValue('some task')
            const createTaskDTO = { title: 'Test task', description: 'test desc' }
            
            expect(taskRepository.createTask).not.toHaveBeenCalled()
            const result = await taskService.createTask(createTaskDTO, mockUser)
            expect(taskRepository.createTask).toHaveBeenCalledWith(createTaskDTO, mockUser)
            expect(result).toEqual('some task')
        })
    })

    describe('delete task', () => {
        it('calls taskRepository.delete() to delete a task', async () => {
            taskRepository.delete.mockResolvedValue({ affected: 1 })
            expect(taskRepository.delete).not.toHaveBeenCalled()
            await taskService.deleteTask(1, mockUser)
            expect(taskRepository.delete).toHaveBeenCalledWith({
                id: 1,
                userId: mockUser.id
            })
        })

        it('throws an error as task could not be found', () => {
            taskRepository.delete.mockResolvedValue({ affected: 0 })
            expect(taskService.deleteTask(1, mockUser)).rejects.toThrow(NotFoundException)
        })
    })
})