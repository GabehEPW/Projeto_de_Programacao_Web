import { buscarPecas, salvarPecas } from '../services/pecasStorage'
import { useState } from 'react'
import type { FormEvent } from 'react'
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

  function cadastrarOuEditarPeca(event: FormEvent) {
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

      <form className="form-card" onSubmit={cadastrarOuEditarPeca}>
        <h2>{idPecaEditando ? 'Editar peça' : 'Cadastrar peça'}</h2>

        <div className="form-grid">
          <label>
            Nome da peça
            <input
              type="text"
              placeholder="Ex: Ryzen 5 5600"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
            />
          </label>

          <label>
            Categoria
            <select
              value={categoria}
              onChange={(event) => setCategoria(event.target.value as CategoriaPeca)}
            >
              {categorias.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label>
            Preço
            <input
              type="number"
              placeholder="Ex: 850"
              value={preco}
              onChange={(event) => setPreco(event.target.value)}
            />
          </label>

          <label>
            Consumo em watts
            <input
              type="number"
              placeholder="Ex: 65"
              value={consumo}
              onChange={(event) => setConsumo(event.target.value)}
            />
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-button">
            {idPecaEditando ? 'Salvar alterações' : 'Cadastrar peça'}
          </button>

          {idPecaEditando && (
            <button type="button" className="secondary-button" onClick={limparFormulario}>
              Cancelar edição
            </button>
          )}
        </div>
      </form>

      <div className="list-header">
        <h2>Peças cadastradas</h2>
        <span>{pecas.length} peça(s)</span>
      </div>

      {pecas.length === 0 ? (
        <div className="empty-state">
          <h3>Nenhuma peça cadastrada ainda</h3>
          <p>Cadastre uma peça usando o formulário acima.</p>
        </div>
      ) : (
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Consumo</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {pecas.map((peca) => (
                <tr key={peca.id}>
                  <td>{peca.nome}</td>
                  <td>{peca.categoria}</td>
                  <td>R$ {peca.preco.toFixed(2)}</td>
                  <td>{peca.consumo}W</td>
                  <td>
                    <div className="table-actions">
                      <button type="button" onClick={() => editarPeca(peca)}>
                        Editar
                      </button>

                      <button
                        type="button"
                        className="danger-button"
                        onClick={() => excluirPeca(peca.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Pecas