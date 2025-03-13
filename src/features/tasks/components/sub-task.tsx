import { Checkbox } from '@/components/ui/checkbox'
import { CircleX, GripVertical } from 'lucide-react'
import type { SubTask } from '../models/task'

type SubTaskProps = {
  subTask: SubTask
}

export function SubTaskCard(props: SubTaskProps) {
  const { subTask } = props
  const { id, deadline, description, order, status, completedAt } = subTask

  return (
    <div className="flex flex-1 justify-between">
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
