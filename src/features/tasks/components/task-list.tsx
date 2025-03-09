import type { Task } from '../models/task'
import { TaskCard } from './task-card'

type TasklistProps = {
  title: string
  tasks: Task[]
}

export function TaskList(props: TasklistProps) {
  const { title, tasks } = props
  return (
    <section className="flex flex-col gap-4 border rounded-lg shadow-md p-4">
      <header className="flex items-center gap-4 border-b py-2">
        <h2 className="text-3xl font-medium">{title}</h2>
        <div className="flex items-center justify-center text-2xl text-white bg-emerald-600 w-10 h-10 rounded-full">
          {tasks.length}
        </div>
      </header>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </section>
  )
}
