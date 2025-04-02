import { create } from 'zustand'

interface ModalStore {
  isOpen: boolean
  onOpen: (id?: string) => void
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  onOpen: (id) => {
    console.log({ id })
    set((state) => ({ isOpen: !state.isOpen }))
  },
}))
