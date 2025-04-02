import type { Task } from '@/features/tasks/models/task'
import { create } from 'zustand'
import { tasksData } from '@/data'

interface TaskStore {
  tasks: Task[]
  onSave: (task: Task) => void
  onUpdateTasks: (taskId: string, newStatus: string) => void
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: tasksData,
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
  //   removeAllBears: () => set({ bears: 0 }),
  //   updateBears: (newBears) => set({ bears: newBears }),
}))
