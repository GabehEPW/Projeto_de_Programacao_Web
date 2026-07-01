type CategoryCardProps = {
  nome: string
  descricao: string
  quantidade: number
  imagem: string
}

function CategoryCard({ nome, descricao, quantidade, imagem }: CategoryCardProps) {
  return (
    <article className="category-card">
      <img src={imagem} alt="" />

      <div>
        <h3>{nome}</h3>
        <p>{descricao}</p>
        <span>{quantidade} peça(s) cadastrada(s)</span>
      </div>
    </article>
  )
}

export default CategoryCard
