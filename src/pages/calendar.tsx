import { Header } from '@/features/tasks/components/header'
import { TaskList } from '@/features/tasks/components/task-list'

export function Calendar() {
  return (
    <div className="flex flex-col w-[960px] mx-auto px-4">
      <Header />
      <TaskList
        title="A Fazer"
        tasks={[
          {
            id: 1,
            title: 'Estudar React',
            description: 'Estudar React para melhorar minhas habilidades',
            deadline: '2022-12-31',
            responsible: 'Eu mesmo',
            status: 'todo',
            createdAt: '2022-09-01',
          },
          {
            id: 2,
            title: 'Estudar Next.js',
            description: 'Estudar Next.js para melhorar minhas habilidades',
            deadline: '2022-12-31',
            responsible: 'Eu mesmo',
            status: 'todo',
            createdAt: '2022-09-01',
          },
        ]}
      />
      <TaskList
        title="Fazendo"
        tasks={[
          {
            id: 1,
            title: 'Estudar React',
            description: 'Estudar React para melhorar minhas habilidades',
            deadline: '2022-12-31',
            responsible: 'Eu mesmo',
            status: 'doing',
            createdAt: '2022-09-01',
          },
          {
            id: 2,
            title: 'Estudar Next.js',
            description: 'Estudar Next.js para melhorar minhas habilidades',
            deadline: '2022-12-31',
            responsible: 'Eu mesmo',
            status: 'doing',
            createdAt: '2022-09-01',
          },
        ]}
      />
      <TaskList
        title="Concluído"
        tasks={[
          {
            id: 1,
            title: 'Estudar React',
            description: 'Estudar React para melhorar minhas habilidades',
            deadline: '2022-12-31',
            responsible: 'Eu mesmo',
            status: 'done',
            createdAt: '2022-09-01',
          },
          {
            id: 2,
            title: 'Estudar Next.js',
            description: 'Estudar Next.js para melhorar minhas habilidades',
            deadline: '2022-12-31',
            responsible: 'Eu mesmo',
            status: 'done',
            createdAt: '2022-09-01',
          },
        ]}
      />
    </div>
  )
}
