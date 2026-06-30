import type { Peca } from '../types/Peca'

const CHAVE_PECAS = 'computspace:pecas'

export function buscarPecas(): Peca[] {
  const pecasSalvas = localStorage.getItem(CHAVE_PECAS)

  if (!pecasSalvas) {
    return []
  }

  try {
    return JSON.parse(pecasSalvas) as Peca[]
  } catch {
    return []
  }
}

export function salvarPecas(pecas: Peca[]) {
  localStorage.setItem(CHAVE_PECAS, JSON.stringify(pecas))
}