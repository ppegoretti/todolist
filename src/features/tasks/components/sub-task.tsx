import { Checkbox } from '@/components/ui/checkbox'
import { CircleX, GripVertical } from 'lucide-react'
import type { SubTask } from '../models/task'
import { useSortable } from '@dnd-kit/sortable'
import { useState } from 'react'

import { CSS } from '@dnd-kit/utilities'

type SubTaskProps = {
  subTask: SubTask
}

export function SubTaskCard(props: SubTaskProps) {
  const { subTask } = props
  const { id, deadline, description, order, status, completedAt } = subTask
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id })
  const [localStatus, setLocalStatus] = useState(status)

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-1 justify-between items-center gap-2 bg-accent border-solid border-b border-gray-700  p-1 last:border-8"
      {...attributes}
      {...listeners}
    >
      <div className="flex gap-4">
        <GripVertical />
        <Checkbox
          checked={localStatus}
          onCheckedChange={() => {
            setLocalStatus((p) => !p)
          }}
        />
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
