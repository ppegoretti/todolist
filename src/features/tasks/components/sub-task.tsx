import { Checkbox } from '@/components/ui/checkbox'
import { CircleX, GripVertical } from 'lucide-react'
import type { SubTask } from '../models/task'
import { useDraggable } from '@dnd-kit/core'

type SubTaskProps = {
  subTask: SubTask
}

export function SubTaskCard(props: SubTaskProps) {
  const { subTask } = props
  const { id, deadline, description, order, status, completedAt } = subTask
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: `subtask_${id}` })
  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined

  return (
    <div

      className="flex flex-1 justify-between items-center gap-2 bg-accent"
    >
      <div className="flex gap-4">
        <GripVertical />
        <Checkbox checked={status} onCheckedChange={() => {}} />
        <p>{description}</p>
      </div>
      <div className="flex gap-4">
        <p>{deadline}</p>
        {completedAt && <p>{completedAt}</p>}
        <CircleX />
      </div>
    </div>
  )
}
