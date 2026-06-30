import './App.css'

function App() {
  return (
    <main className="app">
      <section className="hero">
        <span className="badge">ComputSpace</span>

        <h1>Monte seu computador de forma simples</h1>

        <p>
          Sistema para cadastrar peças, consultar componentes e montar uma
          configuração com cálculo de preço e consumo estimado.
        </p>

        <div className="actions">
          <button>Cadastrar Peças</button>
          <button className="secondary">Montar PC</button>
        </div>
      </section>
    </main>
  )
}

export default App