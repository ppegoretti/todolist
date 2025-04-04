import {
  DndContext,
  type DragEndEvent,
  MouseSensor,
  useDraggable,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { Task } from '../models/task'
import { Button } from '@/components/ui/button'
import { ChevronRight, Pencil, Trash2, TriangleAlert } from 'lucide-react'
import { SubTaskCard } from './sub-task'

import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { useModalStore } from '@/store/modal'

type TaskCardProps = {
  task: Task
}

export function TaskCard(props: TaskCardProps) {
  const { task } = props
  const [subTasks, setSubTasks] = useState(task.subtasks ?? [])

  const { onOpen } = useModalStore()

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id })

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 5,
      // delay: 250,
      // tolerance: 5,
    },
  })

  const sensors = useSensors(mouseSensor)

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    // console.log('onDragEnd=')
    // console.log(active, over)

    if (!over) return

    if (active.id !== over.id) {
      setSubTasks((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id)
        const newIndex = items.findIndex((i) => i.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-lg bg-neutral-900 p-4 shadow-sm hover:shadow-md"
      style={style}
    >
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <section className="flex flex-col gap-4">
            <div className="flex flex-1 justify-between">
              <h2 className="text-lg font-medium">{task.title}</h2>
              <div className="flex gap-4">
                <TriangleAlert color="yellow" />
                <p>Alerta</p>
              </div>
            </div>
            <div className="flex flex-1 justify-between">
              <div className="flex flex-1 gap-4 items-center">
                <p>Responsável: {task.responsible}</p>
                <p>Prazo: {task.deadline}</p>
              </div>
              <div className="flex space-x-2">
                {!!task.subtasks?.length && (
                  <AccordionTrigger>
                    <Button className="p-5 text-sm bg-gray-400">
                      <ChevronRight />
                      Subtarefas
                    </Button>
                  </AccordionTrigger>
                )}
                <Button className="p-5 text-sm bg-blue-400" onClick={() => onOpen(task.id)}>
                  <Pencil />
                </Button>
                <Button className="p-5 text-sm bg-red-400">
                  <Trash2 />
                </Button>
              </div>
            </div>
            <AccordionContent>
              {!!task.subtasks?.length && (
                <div className="flex flex-col bg-accent rounded-xl p-2 gap-2 ">
                  <DndContext
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToVerticalAxis]}
                    sensors={sensors}
                  >
                    <SortableContext items={subTasks} strategy={verticalListSortingStrategy}>
                      {subTasks.map((i) => (
                        <SubTaskCard subTask={i} key={i.id} />
                      ))}
                    </SortableContext>
                  </DndContext>
                </div>
              )}
            </AccordionContent>
          </section>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
