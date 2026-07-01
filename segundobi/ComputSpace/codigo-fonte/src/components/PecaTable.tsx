import type { Peca } from '../types/Peca'

type PecaTableProps = {
  pecas: Peca[]
  editarPeca: (peca: Peca) => void
  excluirPeca: (id: number) => void
}

function PecaTable({ pecas, editarPeca, excluirPeca }: PecaTableProps) {
  return (
    <>
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
    </>
  )
}

export default PecaTable
