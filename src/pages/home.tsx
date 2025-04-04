import { COLUMNS } from '@/data/COLUMNS'
import { Header } from '@/features/tasks/components/header'
import { TaskList } from '@/features/tasks/components/task-list'
import type { Task } from '@/features/tasks/models/task'
import { useTaskStore } from '@/store/task'
import {
  DndContext,
  MouseSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'

export function Home() {
  const { tasks, onUpdateTasks } = useTaskStore()

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  })

  const sensors = useSensors(mouseSensor)

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event

    // console.log('onDragEnd=')
    // console.log(active, over)

    if (!over) return

    const taskId = active.id as string
    const newStatus = over.id as Task['status']

    onUpdateTasks(taskId, newStatus)
    // setTasks((previous) =>
    //   previous.map((task) =>
    //     task.id === taskId
    //       ? {
    //           ...task,
    //           status: newStatus,
    //         }
    //       : task,
    //   ),
    // )
  }

  return (
    <div className="flex flex-col w-[1580px] mx-auto px-4">
      <Header />
      <DndContext onDragEnd={onDragEnd} sensors={sensors}>
        <div className="grid grid-cols-2 gap-8 ">
          {COLUMNS.map((column) => (
            <TaskList
              key={column.id}
              title={column.title}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
            />
          ))}
        </div>
      </DndContext>
    </div>
  )
}
