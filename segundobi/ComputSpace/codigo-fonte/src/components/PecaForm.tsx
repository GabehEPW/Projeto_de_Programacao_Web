import type { Dispatch, FormEvent, SetStateAction } from 'react'
import type { CategoriaPeca } from '../types/Peca'

type PecaFormProps = {
  nome: string
  categoria: CategoriaPeca
  preco: string
  consumo: string
  idPecaEditando: number | null
  setNome: Dispatch<SetStateAction<string>>
  setCategoria: Dispatch<SetStateAction<CategoriaPeca>>
  setPreco: Dispatch<SetStateAction<string>>
  setConsumo: Dispatch<SetStateAction<string>>
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onLimparFormulario: () => void
  categorias: CategoriaPeca[]
}

function PecaForm({
  nome,
  categoria,
  preco,
  consumo,
  idPecaEditando,
  setNome,
  setCategoria,
  setPreco,
  setConsumo,
  onSubmit,
  onLimparFormulario,
  categorias,
}: PecaFormProps) {
  return (
    <form className="form-card" onSubmit={onSubmit}>
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
          <button type="button" className="secondary-button" onClick={onLimparFormulario}>
            Cancelar edição
          </button>
        )}
      </div>
    </form>
  )
}

export default PecaForm
