export const COLUMNS = [
  { id: 'TODO', title: 'A Fazer' },
  { id: 'IN_PROGRESS', title: 'Fazendo' },
  { id: 'DONE', title: 'Concluído' },
] as const

export type Column = (typeof COLUMNS)[number]
