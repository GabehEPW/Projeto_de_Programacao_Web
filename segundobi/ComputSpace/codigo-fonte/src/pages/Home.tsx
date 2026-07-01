import { buscarPecas } from '../services/pecasStorage'

function Home() {
  const pecas = buscarPecas()

  const totalPecas = pecas.length
  const categoriasCadastradas = new Set(pecas.map((peca) => peca.categoria)).size
  const valorTotalCatalogo = pecas.reduce((total, peca) => total + peca.preco, 0)
  const consumoTotalCatalogo = pecas.reduce((total, peca) => total + peca.consumo, 0)

  return (
    <section className="page">
      <span className="badge">NexusPC</span>

      <h1>Monte seu computador de forma simples</h1>

      <p>
        Sistema para cadastrar peças, consultar componentes e montar uma
        configuração com cálculo de preço e consumo estimado.
      </p>

      <div className="stats-grid">
        <article className="stat-card">
          <span>Peças cadastradas</span>
          <strong>{totalPecas}</strong>
        </article>

        <article className="stat-card">
          <span>Categorias utilizadas</span>
          <strong>{categoriasCadastradas}</strong>
        </article>

        <article className="stat-card">
          <span>Valor em catálogo</span>
          <strong>R$ {valorTotalCatalogo.toFixed(2)}</strong>
        </article>

        <article className="stat-card">
          <span>Consumo catalogado</span>
          <strong>{consumoTotalCatalogo}W</strong>
        </article>
      </div>

      <div className="cards">
        <article className="card">
          <h3>1. Cadastro de peças</h3>
          <p>
            Registre processadores, placas de vídeo, memórias, fontes,
            armazenamento e outros componentes.
          </p>
        </article>

        <article className="card">
          <h3>2. Gerenciamento</h3>
          <p>
            Consulte, edite e exclua peças cadastradas para manter o catálogo
            atualizado.
          </p>
        </article>

        <article className="card">
          <h3>3. Montagem de PC</h3>
          <p>
            Selecione as peças cadastradas e visualize o preço total e o
            consumo estimado da configuração.
          </p>
        </article>
      </div>
    </section>
  )
}

export default Home
