import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

export function Home() {
  const times = 2

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <>
      <div className="header-container">
        <h1>Lista de Atividades</h1>
        <div className="header-buttons">
          <Button className="add-button" onClick={() => null}>
            + Nova Tarefa
          </Button>
          {/* openModal() */}
          <Button className="export-button" onClick={() => null}>
            📤
          </Button>
          {/* onClick="exportTodos()"" */}
          <Button className="import-button" onClick={() => null}>
            📥
          </Button>
          {/* document.getElementById('fileInput').click() */}
          {/* <input type="file" id="fileInput" accept=".json" onchange="importTodos(event)"> */}
          <Input type="file" accept=".json" />
        </div>
      </div>

      <div className="sort-controls">
        <span className="sort-label">Ordenar por:</span>
        <select className="sort-select" id="sortBy" onChange={() => null}>
          {/* "updateSort()" */}
          <option value="none">Sem ordenação</option>
          <option value="deadline">Prazo</option>
          <option value="responsible">Responsável</option>
          <option value="title">Título</option>
        </select>
        <Button className="sort-direction" id="sortDirection" onClick={() => null}>
          ↓
        </Button>
        {/* "toggleSortDirection()" */}
      </div>

      <div className="search-filters">
        <div className="search-box">
          {/* <input type="text" id="searchInput" placeholder="Buscar tarefas..." className="search-input"> */}
          <Input type="text" placeholder="Buscar tarefas..." />
        </div>
        <div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Responsáveis" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos Responsáveis</SelectItem>
              {['teste', 'teste2'].map((persons) => (
                <SelectItem key={persons} value={persons}>
                  {persons}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos Status</SelectItem>
              {['Atrasadas', 'Vence Hoje', 'Vence Esta Semana'].map((persons) => (
                <SelectItem key={persons} value={persons}>
                  {persons}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div id="todoModal" className="modal">
        <div className="modal-content">
          <Button>{times}</Button>
          {/* <button className="close-button" onClick="closeModal()">&times;</button> */}
          <h2 className="modal-title">Nova Tarefa</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>This is your public display name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
          {/* <Form className="form-group" {...form}>
          <FormField
          control={form.control}
          name="Username"
          render={() => (
            <FormLabel>Título da Tarefa</FormLabel>
            {/* <label for="newTodo"></label>
                    <input type="text" id="newTodo" placeholder="Digite o título da tarefa">
            <Input type="text" placeholder="Digite o título da tarefa" />
          )}
          />
          </Form>
          {/* <div className="form-group">
                    <label for="responsible">Responsável</label>
                    <input type="text" id="responsible" placeholder="Nome do responsável">
                </div>
                <div className="form-group">
                    <label for="deadline">Prazo</label>
                    <input type="date" id="deadline">
                </div>
                <input type="hidden" id="editingTaskId" value="">
                <input type="hidden" id="editingTaskStatus" value="">
                <div className="form-group">
                    <label for="subtasks">Subtarefas</label>
                    <div id="subtasksList" className="subtasks-container">
                        <ul className="subtask-list"></ul>
                        <button type="button" className="add-subtask-button" onClick="addSubtaskInput()">+ Adicionar
                            Subtarefa</button>
                    </div>
                </div>
                <div className="modal-buttons">
                    <button className="modal-button modal-cancel" onClick="closeModal()">Cancelar</button>
                    <button className="modal-button modal-save" onClick="saveTask()">Salvar</button>
                </div> */}
        </div>
      </div>

      <div className="lists-container">
        <div className="list" data-status="todo">
          <div className="list-header">
            <h2>
              A Fazer
              <span className="task-count">0</span>
            </h2>
          </div>
          <ul id="todoList"></ul>
        </div>

        <div className="list" data-status="doing">
          <div className="list-header">
            <h2>
              Fazendo
              <span className="task-count">0</span>
            </h2>
          </div>
          <ul id="doingList"></ul>
        </div>

        <div className="list" data-status="done">
          <div className="list-header" onClick="toggleDoneList()">
            <h2>
              Concluído
              <span className="task-count">0</span>
            </h2>
            <span className="accordion-icon">▼</span>
          </div>
          <ul id="doneList" className="expanded"></ul>
        </div>
      </div>
      <Button>Teste</Button>
    </>
  )
}
