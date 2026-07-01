import { useState } from 'react'
import type { FormEvent } from 'react'
import PecaForm from '../components/PecaForm'
import PecaTable from '../components/PecaTable'
import { buscarPecas, salvarPecas } from '../services/pecasStorage'
import type { CategoriaPeca, Peca } from '../types/Peca'

const categorias: CategoriaPeca[] = [
  'Processador',
  'Placa de vídeo',
  'Memória RAM',
  'Placa-mãe',
  'Armazenamento',
  'Fonte',
  'Gabinete',
  'Cooler',
  'Outro',
]

function Pecas() {
  const [pecas, setPecas] = useState<Peca[]>(() => buscarPecas())
  const [idPecaEditando, setIdPecaEditando] = useState<number | null>(null)

  const [nome, setNome] = useState('')
  const [categoria, setCategoria] = useState<CategoriaPeca>('Processador')
  const [preco, setPreco] = useState('')
  const [consumo, setConsumo] = useState('')

  function limparFormulario() {
    setNome('')
    setCategoria('Processador')
    setPreco('')
    setConsumo('')
    setIdPecaEditando(null)
  }

  function cadastrarOuEditarPeca(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!nome || !preco || !consumo) {
      alert('Preencha todos os campos obrigatórios.')
      return
    }

    if (Number(preco) <= 0 || Number(consumo) < 0) {
      alert('Informe valores válidos para preço e consumo.')
      return
    }

    if (idPecaEditando) {
      const pecasAtualizadas = pecas.map((peca) => {
        if (peca.id === idPecaEditando) {
          return {
            ...peca,
            nome,
            categoria,
            preco: Number(preco),
            consumo: Number(consumo),
          }
        }

        return peca
      })

      setPecas(pecasAtualizadas)
      salvarPecas(pecasAtualizadas)
      limparFormulario()
      return
    }

    const novaPeca: Peca = {
      id: Date.now(),
      nome,
      categoria,
      preco: Number(preco),
      consumo: Number(consumo),
    }

    const novasPecas = [...pecas, novaPeca]

    setPecas(novasPecas)
    salvarPecas(novasPecas)
    limparFormulario()
  }

  function editarPeca(peca: Peca) {
    setIdPecaEditando(peca.id)
    setNome(peca.nome)
    setCategoria(peca.categoria)
    setPreco(String(peca.preco))
    setConsumo(String(peca.consumo))
  }

  function excluirPeca(id: number) {
    const confirmarExclusao = confirm('Deseja realmente excluir esta peça?')

    if (!confirmarExclusao) {
      return
    }

    const pecasFiltradas = pecas.filter((peca) => peca.id !== id)

    setPecas(pecasFiltradas)
    salvarPecas(pecasFiltradas)

    if (idPecaEditando === id) {
      limparFormulario()
    }
  }

  return (
    <section className="page">
      <h1>Peças</h1>

      <p>
        Cadastre componentes de computador para usar na montagem de uma configuração.
      </p>

      <PecaForm
        nome={nome}
        categoria={categoria}
        preco={preco}
        consumo={consumo}
        idPecaEditando={idPecaEditando}
        setNome={setNome}
        setCategoria={setCategoria}
        setPreco={setPreco}
        setConsumo={setConsumo}
        onSubmit={cadastrarOuEditarPeca}
        onLimparFormulario={limparFormulario}
        categorias={categorias}
      />

      <PecaTable
        pecas={pecas}
        editarPeca={editarPeca}
        excluirPeca={excluirPeca}
      />
    </section>
  )
}

export default Pecas
