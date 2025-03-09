import type { Task } from '../models/task'

type TaskCardProps = {
  task: Task
}

export function TaskCard(props: TaskCardProps) {
  const { task } = props
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-3xl font-medium">{task.title}</h2>
      <p>{task.description}</p>
      <p>{task.deadline}</p>
      <p>{task.responsible}</p>
      <p>{task.status}</p>
    </section>
  )
}
