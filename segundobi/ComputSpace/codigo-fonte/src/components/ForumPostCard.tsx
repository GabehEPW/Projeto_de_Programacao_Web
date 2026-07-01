export type PostForum = {
  id: number
  titulo: string
  categoria: string
  autor: string
  conteudo: string
  data: string
}

type ForumPostCardProps = {
  post: PostForum
  excluirPost: (id: number) => void
}

function ForumPostCard({ post, excluirPost }: ForumPostCardProps) {
  return (
    <article className="forum-post">
      <div className="forum-post-header">
        <div>
          <span className="forum-category">{post.categoria}</span>
          <h3>{post.titulo}</h3>
        </div>

        <button
          type="button"
          className="danger-button"
          onClick={() => excluirPost(post.id)}
        >
          Excluir
        </button>
      </div>

      <p>{post.conteudo}</p>

      <div className="forum-post-footer">
        <span>Publicado por {post.autor}</span>
        <span>{post.data}</span>
      </div>
    </article>
  )
}

export default ForumPostCard
