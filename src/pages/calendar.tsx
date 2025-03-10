import { tasksData } from '@/data'
import { COLUMNS } from '@/data/COLUMNS'
import { Header } from '@/features/tasks/components/header'
import { TaskList } from '@/features/tasks/components/task-list'
import type { Task } from '@/features/tasks/models/task'
import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import { useState } from 'react'

export function Calendar() {
  const [tasks, setTasks] = useState(tasksData)

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event

    console.log('onDragEnd=')
    console.log(active, over)

    if (!over) return

    const taskId = active.id as string
    const newStatus = over.id as Task['status']

    setTasks((previous) =>
      previous.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task,
      ),
    )
  }

  return (
    <div className="flex flex-col w-[960px] mx-auto px-4">
      <Header />
      <DndContext onDragEnd={onDragEnd}>
        {COLUMNS.map((column) => (
          <TaskList
            key={column.id}
            title={column.title}
            column={column}
            tasks={tasks.filter((task) => task.status === column.id)}
          />
        ))}
      </DndContext>
    </div>
  )
}
