import type { Peca } from '../types/Peca'

type ResumoMontagemProps = {
  montagem: Peca[]
  precoTotal: number
  consumoTotal: number
  limparMontagem: () => void
}

function ResumoMontagem({
  montagem,
  precoTotal,
  consumoTotal,
  limparMontagem,
}: ResumoMontagemProps) {
  return (
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

          <button type="button" className="secondary-button" onClick={limparMontagem}>
            Limpar montagem
          </button>
        </>
      )}
    </div>
  )
}

export default ResumoMontagem
