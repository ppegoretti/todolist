import { create } from 'zustand'
import { taskStore } from './task'

interface ModalStore {
  isOpen: boolean
  onOpen: (id?: string) => void
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  onOpen: (id) => {
    // console.log({ id })
    if (id) {
      const { onEditTask } = taskStore.getState()
      onEditTask(id)
    }
    set((state) => ({ isOpen: !state.isOpen }))
  },
}))
