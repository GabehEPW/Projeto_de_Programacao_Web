import { useState } from 'react'
import type { CategoriaPeca, Peca } from '../types/Peca'
import { buscarPecas } from '../services/pecasStorage'

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

const selecaoInicial: Record<CategoriaPeca, string> = {
  Processador: '',
  'Placa de vídeo': '',
  'Memória RAM': '',
  'Placa-mãe': '',
  Armazenamento: '',
  Fonte: '',
  Gabinete: '',
  Cooler: '',
  Outro: '',
}

function Montagem() {
  const [pecas] = useState<Peca[]>(() => buscarPecas())
  const [pecasSelecionadas, setPecasSelecionadas] =
    useState<Record<CategoriaPeca, string>>(selecaoInicial)

  function atualizarSelecao(categoria: CategoriaPeca, idPeca: string) {
    setPecasSelecionadas({
      ...pecasSelecionadas,
      [categoria]: idPeca,
    })
  }

  function limparMontagem() {
    setPecasSelecionadas(selecaoInicial)
  }

  const montagem = Object.values(pecasSelecionadas)
    .filter((idPeca) => idPeca !== '')
    .map((idPeca) => pecas.find((peca) => String(peca.id) === idPeca))
    .filter((peca): peca is Peca => Boolean(peca))

  const precoTotal = montagem.reduce((total, peca) => total + peca.preco, 0)
  const consumoTotal = montagem.reduce((total, peca) => total + peca.consumo, 0)

  return (
    <section className="page">
      <h1>Montagem</h1>

      <p>
        Selecione as peças cadastradas para montar uma configuração e calcular
        o preço total e o consumo estimado.
      </p>

      {pecas.length === 0 ? (
        <div className="empty-state">
          <h3>Nenhuma peça cadastrada</h3>
          <p>
            Cadastre peças na tela Peças antes de montar uma configuração.
          </p>
        </div>
      ) : (
        <>
          <div className="builder-grid">
            {categorias.map((categoria) => {
              const pecasDaCategoria = pecas.filter(
                (peca) => peca.categoria === categoria,
              )

              return (
                <label key={categoria} className="builder-field">
                  {categoria}

                  <select
                    value={pecasSelecionadas[categoria]}
                    onChange={(event) =>
                      atualizarSelecao(categoria, event.target.value)
                    }
                    disabled={pecasDaCategoria.length === 0}
                  >
                    <option value="">
                      {pecasDaCategoria.length === 0
                        ? 'Nenhuma peça cadastrada'
                        : 'Selecione uma peça'}
                    </option>

                    {pecasDaCategoria.map((peca) => (
                      <option key={peca.id} value={peca.id}>
                        {peca.nome} - R$ {peca.preco.toFixed(2)}
                      </option>
                    ))}
                  </select>
                </label>
              )
            })}
          </div>

          <div className="summary-card">
            <div>
              <h2>Resumo da configuração</h2>
              <p>
                {montagem.length === 0
                  ? 'Nenhuma peça selecionada ainda.'
                  : `${montagem.length} peça(s) selecionada(s).`}
              </p>
            </div>

            <div className="summary-values">
              <div>
                <span>Preço total</span>
                <strong>R$ {precoTotal.toFixed(2)}</strong>
              </div>

              <div>
                <span>Consumo estimado</span>
                <strong>{consumoTotal}W</strong>
              </div>
            </div>

            {montagem.length > 0 && (
              <>
                <div className="selected-list">
                  {montagem.map((peca) => (
                    <article key={peca.id} className="selected-item">
                      <div>
                        <h3>{peca.nome}</h3>
                        <p>{peca.categoria}</p>
                      </div>

                      <span>
                        R$ {peca.preco.toFixed(2)} | {peca.consumo}W
                      </span>
                    </article>
                  ))}
                </div>

                <button
                  type="button"
                  className="secondary-button"
                  onClick={limparMontagem}
                >
                  Limpar montagem
                </button>
              </>
            )}
          </div>
        </>
      )}
    </section>
  )
}

export default Montagem