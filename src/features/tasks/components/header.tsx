import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ModeToggle } from '@/features/theme/toggle'

export function Header() {
  return (
    <>
      <header className="flex justify-between items-center py-4">
        <h1 className="text-4xl font-medium">Lista de Atividades</h1>
        <div className="flex space-x-2">
          <Button className="p-8 text-2xl bg-emerald-500">+ Nova Tarefa</Button>
          <Button className="p-8 text-2xl bg-blue-400">📤</Button>
          <Button className="p-8 text-2xl bg-amber-600">📥</Button>
        </div>
        <ModeToggle />
      </header>
      <section className="flex items-center py-4 gap-4">
        <span className="text-2xl">Ordenar por:</span>
        <Select>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            {['Sem ordenação', 'Prazo', 'Responsável', 'Título'].map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button className="p-8 text-2xl" variant="ghost" onClick={() => null}>
          ↓
        </Button>
      </section>
      <section className="flex items-center py-4 gap-4">
        <Input placeholder="Buscar tarefas..." />
        <Select>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Todos responsaveis" />
          </SelectTrigger>
          <SelectContent>
            {['Todos responsaveis'].map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Todos status" />
          </SelectTrigger>
          <SelectContent>
            {['Todos status', 'Atrasadas', 'Vence hoje', 'Vence essa semana'].map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>
    </>
  )
}
