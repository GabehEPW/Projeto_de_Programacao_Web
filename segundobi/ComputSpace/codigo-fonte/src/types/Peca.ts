export type CategoriaPeca =
  | 'Processador'
  | 'Placa de vídeo'
  | 'Memória RAM'
  | 'Placa-mãe'
  | 'Armazenamento'
  | 'Fonte'
  | 'Gabinete'
  | 'Cooler'
  | 'Outro'

export type Peca = {
  id: number
  nome: string
  categoria: CategoriaPeca
  preco: number
  consumo: number
}