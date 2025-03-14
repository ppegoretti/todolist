import type { Column } from '@/data/COLUMNS'
import { useDroppable } from '@dnd-kit/core'
import type { Task } from '../models/task'
import { TaskCard } from './task-card'

type TasklistProps = {
  title: string
  tasks: Task[]
  column: Column
}

export function TaskList(props: TasklistProps) {
  const { title, tasks, column } = props
  const { setNodeRef  } = useDroppable({ id: column.id })
  return (
    <section className="flex flex-col gap-4 border rounded-lg shadow-md p-4">
      <header className="flex items-center gap-4 border-b py-2">
        <h2 className="text-xl font-medium">{title}</h2>
        <div
          ref={setNodeRef}
          className="flex items-center justify-center text-lg text-white bg-emerald-600 w-8 h-8 rounded-full"
        >
          {tasks.length}
        </div>
      </header>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </section>
  )
}
