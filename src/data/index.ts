import type { Task } from '@/features/tasks/models/task'

export const tasksData: Task[] = [
  {
    id: '1',
    title: 'Estudar React',
    deadline: '2022-12-31',
    responsible: 'Patrick',
    status: 'TODO',
    createdAt: '2022-09-01',
    subtasks: [
      { id: '0', deadline: '20/08/2025', description: 'teste1', order: '0', status: true },
      { id: '1', deadline: '20/08/2025', description: 'teste1ss', order: '1', status: false },
      {
        id: '2',
        deadline: '20/08/2025',
        description: 'teste1sdasdf',
        order: '2',
        status: false,
      },
    ],
  },
  {
    id: '2',
    title: 'Estudar Next.js',
    deadline: '2022-12-31',
    responsible: 'Patrick',
    status: 'TODO',
    createdAt: '2022-09-01',
    subtasks: [
      { id: '0', deadline: '20/08/2025', description: 'testeddd1', order: '1', status: false },
    ],
  },
  {
    id: '3',
    title: 'Estudar TypeScript',
    deadline: '2022-12-31',
    responsible: 'Patrick',
    status: 'IN_PROGRESS',
    createdAt: '2022-09-01',
    subtasks: [
      {
        id: '0',
        deadline: '20/08/2025',
        description: 'teste1asdfas',
        order: '1',
        status: false,
      },
    ],
  },
  {
    id: '4',
    title: 'Estudar CSS',
    deadline: '2022-12-31',
    responsible: 'Patrick',
    status: 'IN_PROGRESS',
    createdAt: '2022-09-01',
    subtasks: [
      { id: '0', deadline: '20/08/2025', description: 'teste1', order: '1', status: false },
    ],
  },
  {
    id: '5',
    title: 'Estudar HTML',
    deadline: '2022-12-31',
    responsible: 'Patrick',
    status: 'DONE',
    createdAt: '2022-09-01',
  },
  {
    id: '6',
    title: 'Estudar JavaScript',
    deadline: '2022-12-31',
    responsible: 'Patrick',
    status: 'DONE',
    createdAt: '2022-09-01',
  },
]
