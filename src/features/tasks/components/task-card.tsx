import { useDraggable } from '@dnd-kit/core'
import type { Task } from '../models/task'
import { Button } from '@/components/ui/button'
import { ChevronRight, CircleX, GripVertical, Pencil, SquareDashed, Trash2 } from 'lucide-react'

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
        <div className="flex flex-1 justify-between">
          <h2 className="text-lg font-medium">{task.title}</h2>
          <p>Alerta</p>
        </div>
        <div className="flex flex-1 justify-between">
          <div className="flex flex-1 gap-4 items-center">
            <p>Responsável: {task.responsible}</p>
            <p>Prazo: {task.deadline}</p>
          </div>
          <div className="flex space-x-2">
            <Button className="p-5 text-sm bg-gray-400">
              <ChevronRight />
              Subtarefas
            </Button>
            <Button className="p-5 text-sm bg-blue-400">
              <Pencil />
            </Button>
            <Button className="p-5 text-sm bg-red-400">
              <Trash2 />
            </Button>
          </div>
        </div>
        <div className="flex flex-col bg-accent rounded-xl p-2 gap-2">
          <div className="flex flex-1 justify-between">
            <div className="flex gap-4">
              <GripVertical />
              <SquareDashed />
              <p>Logo</p>
            </div>
            <div className="flex gap-4">
              <p>25/03/2025</p>
              <CircleX />
            </div>
          </div>
          <div className="flex flex-1 justify-between">
            <div className="flex gap-4">
              <GripVertical />
              <SquareDashed />
              <p>Logo</p>
            </div>
            <div className="flex gap-4">
              <p>25/03/2025</p>
              <CircleX />
            </div>
          </div>
          <div className="flex flex-1 justify-between">
            <div className="flex gap-4">
              <GripVertical />
              <SquareDashed />
              <p>Logo</p>
            </div>
            <div className="flex gap-4">
              <p>25/03/2025</p>
              <CircleX />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
