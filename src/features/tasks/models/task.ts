export type Task = {
  id: string
  title: string
  deadline: string
  responsible: string
  status: string
  createdAt: string
  completedAt?: string
  subtasks?: SubTask[]
}

export type SubTask = {
  id: string
  description: string
  deadline: string
}
