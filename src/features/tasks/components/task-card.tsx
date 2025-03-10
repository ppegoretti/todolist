import { useDraggable } from '@dnd-kit/core'
import type { Task } from '../models/task'

type TaskCardProps = {
  task: Task
}

export function TaskCard(props: TaskCardProps) {
  const { task } = props

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id })

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-lg bg-neutral-900 p-4 shadow-sm hover:shadow-md"
      style={style}
    >
      <section className="flex flex-col gap-4">
        <h2 className="text-3xl font-medium">{task.title}</h2>
        <p>{task.deadline}</p>
        <p>{task.responsible}</p>
      </section>
    </div>
  )
}
