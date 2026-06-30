function Home() {
  return (
    <section className="page">
      <span className="badge">ComputSpace</span>

      <h1>Monte seu computador de forma simples</h1>

      <p>
        Sistema para cadastrar peças, consultar componentes e montar uma
        configuração com cálculo de preço e consumo estimado.
      </p>

      <div className="cards">
        <article className="card">
          <h3>Cadastro de peças</h3>
          <p>Registre processadores, placas de vídeo, memórias, fontes e outros componentes.</p>
        </article>

        <article className="card">
          <h3>Montagem de PC</h3>
          <p>Selecione peças cadastradas e veja o valor total e o consumo estimado.</p>
        </article>

        <article className="card">
          <h3>Organização</h3>
          <p>Consulte, edite e remova componentes de forma simples.</p>
        </article>
      </div>
    </section>
  )
}

export default Home