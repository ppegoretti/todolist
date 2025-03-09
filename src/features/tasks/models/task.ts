export type Task = {
  id: number
  title: string
  description: string
  deadline: string
  responsible: string
  status: string
  createdAt: string
  completedAt?: string
  subtasks?: SubTask[]
}

export type SubTask = {
  text: string
  deadline: string
  completed: boolean
}
