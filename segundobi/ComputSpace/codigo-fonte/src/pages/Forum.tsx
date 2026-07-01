import { useState } from 'react'
import type { FormEvent } from 'react'
import ForumPostCard from '../components/ForumPostCard'
import type { PostForum } from '../components/ForumPostCard'

const CHAVE_FORUM = 'nexuspc:forum'

function buscarPosts(): PostForum[] {
  const postsSalvos = localStorage.getItem(CHAVE_FORUM)

  if (!postsSalvos) {
    return []
  }

  try {
    return JSON.parse(postsSalvos) as PostForum[]
  } catch {
    return []
  }
}

function salvarPosts(posts: PostForum[]) {
  localStorage.setItem(CHAVE_FORUM, JSON.stringify(posts))
}

function Forum() {
  const [posts, setPosts] = useState<PostForum[]>(() => buscarPosts())

  const [titulo, setTitulo] = useState('')
  const [categoria, setCategoria] = useState('Dúvida')
  const [autor, setAutor] = useState('')
  const [conteudo, setConteudo] = useState('')

  function criarPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!titulo || !autor || !conteudo) {
      alert('Preencha título, autor e conteúdo do post.')
      return
    }

    const novoPost: PostForum = {
      id: Date.now(),
      titulo,
      categoria,
      autor,
      conteudo,
      data: new Date().toLocaleDateString('pt-BR'),
    }

    const postsAtualizados = [novoPost, ...posts]

    setPosts(postsAtualizados)
    salvarPosts(postsAtualizados)

    setTitulo('')
    setCategoria('Dúvida')
    setAutor('')
    setConteudo('')
  }

  function excluirPost(id: number) {
    const confirmar = confirm('Deseja realmente excluir este post?')

    if (!confirmar) {
      return
    }

    const postsAtualizados = posts.filter((post) => post.id !== id)

    setPosts(postsAtualizados)
    salvarPosts(postsAtualizados)
  }

  return (
    <section className="page">
      <div className="page-hero compact-hero">
        <div>
          <span className="badge">Comunidade</span>

          <h1>Fórum NexusPC</h1>

          <p>
            Espaço para usuários criarem publicações, tirarem dúvidas e
            compartilharem experiências sobre montagem, upgrades e componentes de
            computador.
          </p>
        </div>

        <img src="/assets/nexuspc-community.png" alt="" />
      </div>

      <form className="form-card" onSubmit={criarPost}>
        <h2>Criar novo post</h2>

        <div className="form-grid">
          <label>
            Título
            <input
              type="text"
              placeholder="Ex: Essa fonte segura uma RTX 4060?"
              value={titulo}
              onChange={(event) => setTitulo(event.target.value)}
            />
          </label>

          <label>
            Categoria
            <select
              value={categoria}
              onChange={(event) => setCategoria(event.target.value)}
            >
              <option>Dúvida</option>
              <option>Setup</option>
              <option>Upgrade</option>
              <option>Compatibilidade</option>
              <option>Recomendação</option>
            </select>
          </label>

          <label>
            Autor
            <input
              type="text"
              placeholder="Ex: Gabriel"
              value={autor}
              onChange={(event) => setAutor(event.target.value)}
            />
          </label>
        </div>

        <label>
          Conteúdo
          <textarea
            placeholder="Descreva sua dúvida, recomendação ou experiência..."
            value={conteudo}
            onChange={(event) => setConteudo(event.target.value)}
          />
        </label>

        <button type="submit" className="primary-button">
          Publicar post
        </button>
      </form>

      <div className="list-header">
        <h2>Posts da comunidade</h2>
        <span>{posts.length} post(s)</span>
      </div>

      {posts.length === 0 ? (
        <div className="empty-state">
          <h3>Nenhum post publicado ainda</h3>
          <p>Crie o primeiro post da comunidade NexusPC.</p>
        </div>
      ) : (
        <div className="forum-list">
          {posts.map((post) => (
            <ForumPostCard
              key={post.id}
              post={post}
              excluirPost={excluirPost}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Forum
