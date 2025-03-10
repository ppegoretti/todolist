import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, X } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import type { Task } from '../models/task'

type NewTaskModalProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (task: Task) => void
  editingTask?: Task
}

const taskSchema = z.object({
  title: z.string().nonempty('Título é obrigatório'),
  responsible: z.string().nonempty('Responsável é obrigatório'),
  deadline: z.string().nonempty('Prazo é obrigatório'),
  subtasks: z
    .array(
      z.object({
        id: z.string(),
        description: z.string().nonempty('Descrição da subtarefa é obrigatória'),
        deadline: z.string().nonempty('Prazo da subtarefa é obrigatório'),
      }),
    )
    .optional(),
})

type NewTask = z.infer<typeof taskSchema>

export function NewTaskModal(props: NewTaskModalProps) {
  const { isOpen, onClose, onSave, editingTask = null } = props
  const methods = useForm<NewTask>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: editingTask?.title || '',
      responsible: editingTask?.responsible || '',
      deadline: editingTask?.deadline || '',
    },
  })
  const isEditing = Boolean(editingTask)

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'subtasks',
  })

  const onSubmit = (data: NewTask) => {
    onSave({
      id: editingTask?.id || Date.now().toString(),
      ...data,
      status: editingTask ? editingTask.status : 'todo',
      createdAt: editingTask ? editingTask.createdAt : new Date().toISOString(),
      subtasks: [],
    })
    methods.reset()
    // setSubtasks([])
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:w-[480px]">
        <DialogHeader>
          {isEditing ? (
            <DialogTitle>Editando Tarefa</DialogTitle>
          ) : (
            <DialogTitle>Nova Tarefa</DialogTitle>
          )}
        </DialogHeader>
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={methods.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="title">Título da Tarefa</FormLabel>
                  <FormControl>
                    <Input
                      id="title"
                      placeholder="Digite o título da tarefa"
                      {...field}
                      className={methods.formState.errors.title ? 'border-red-500' : ''}
                    />
                  </FormControl>

                  {methods.formState.errors.title && (
                    <FormMessage>
                      {methods.formState.errors.title.message?.toString()}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={methods.control}
              name="responsible"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="responsible">Responsável</FormLabel>
                  <FormControl>
                    <Input
                      id="responsible"
                      placeholder="Nome do responsável"
                      {...field}
                      className={methods.formState.errors.responsible ? 'border-red-500' : ''}
                    />
                  </FormControl>
                  {methods.formState.errors.responsible && (
                    <FormMessage>
                      {methods.formState.errors.responsible.message?.toString()}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={methods.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="deadline">Prazo</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      className={methods.formState.errors.deadline ? 'border-red-500' : ''}
                    />
                  </FormControl>

                  {methods.formState.errors.deadline && (
                    <FormMessage>
                      {methods.formState.errors.deadline.message?.toString()}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <ul className="space-y-2">
              <Label>Subtarefas</Label>

              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center space-x-2">
                  <FormField
                    control={methods.control}
                    name={`subtasks.${index}.description`}
                    render={({ field }) => (
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Descrição da subtarefa"
                          className="flex-1"
                        />
                      </FormControl>
                    )}
                  />
                  <FormField
                    control={methods.control}
                    name={`subtasks.${index}.deadline`}
                    render={({ field }) => (
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className={cn(
                            'flex-1',
                            methods.formState.errors.deadline ? 'border-red-500' : '',
                          )}
                        />
                      </FormControl>
                    )}
                  />
                  <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                className="w-full mt-2"
                onClick={() =>
                  append({ id: Date.now().toString(), description: '', deadline: '' })
                }
              >
                <Plus className="h-4 w-4 mr-2" /> Adicionar Subtarefa
              </Button>
            </ul>
            <DialogFooter className="sm:justify-between">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" variant="destructive">
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
