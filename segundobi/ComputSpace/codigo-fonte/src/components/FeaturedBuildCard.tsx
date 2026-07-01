type FeaturedBuildCardProps = {
  nome: string
  descricao: string
  tag: string
  preco: string
  consumo: string
  imagem: string
}

function FeaturedBuildCard({
  nome,
  descricao,
  tag,
  preco,
  consumo,
  imagem,
}: FeaturedBuildCardProps) {
  return (
    <article className="featured-build-card">
      <img src={imagem} alt="" />

      <div className="featured-build-content">
        <span className="tag">{tag}</span>
        <h3>{nome}</h3>
        <p>{descricao}</p>

        <div className="build-meta">
          <strong>{preco}</strong>
          <span>{consumo}</span>
        </div>
      </div>
    </article>
  )
}

export default FeaturedBuildCard
