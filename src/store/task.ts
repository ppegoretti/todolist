import type { Task } from '@/features/tasks/models/task'
import { create } from 'zustand'
import { tasksData } from '@/data'

interface TaskStore {
  tasks: Task[]
  editingTask: Task | null
  onSave: (task: Task) => void
  onUpdateTasks: (taskId: string, newStatus: string) => void
  onEditTask: (taskId: string) => void
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: tasksData,
  editingTask: null,

  onSave: (newTask) => {
    console.log({ newTask })
    set((state) => ({ tasks: [...state.tasks, newTask] }))
  },

  onUpdateTasks: (taskId: string, newStatus: string) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task,
      ),
    })),

  onEditTask: (id: string) => {
    console.log(id)
    set((state) => ({
      editingTask: state.tasks.filter((i) => i.id === id)[0],
    }))
  },
}))

export const taskStore = useTaskStore
