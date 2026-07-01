import CategoryCard from '../components/CategoryCard'
import FeaturedBuildCard from '../components/FeaturedBuildCard'
import SearchBar from '../components/SearchBar'
import StatCard from '../components/StatCard'
import { buscarPecas } from '../services/pecasStorage'
import type { CategoriaPeca } from '../types/Peca'

type HomeProps = {
  onNavigate: (tela: 'home' | 'pecas' | 'montagem' | 'forum') => void
}

type PostForumResumo = {
  id: number
  titulo: string
  categoria: string
  autor: string
  data: string
}

const CHAVE_FORUM = 'nexuspc:forum'

const categoriasPopulares: {
  nome: string
  categoria: CategoriaPeca
  descricao: string
  imagem: string
}[] = [
  {
    nome: 'Processadores',
    categoria: 'Processador',
    descricao: 'CPUs para jogos, trabalho e multitarefas.',
    imagem: '/assets/cat-processadores.png',
  },
  {
    nome: 'Placas de vídeo',
    categoria: 'Placa de vídeo',
    descricao: 'GPUs para desempenho gráfico e renderização.',
    imagem: '/assets/cat-placas-video.png',
  },
  {
    nome: 'Memórias RAM',
    categoria: 'Memória RAM',
    descricao: 'Kits para melhorar fluidez e resposta do sistema.',
    imagem: '/assets/cat-memorias.png',
  },
  {
    nome: 'Fontes',
    categoria: 'Fonte',
    descricao: 'Energia estável para builds de todos os portes.',
    imagem: '/assets/cat-fontes.png',
  },
  {
    nome: 'Armazenamento',
    categoria: 'Armazenamento',
    descricao: 'SSDs e unidades para velocidade e espaço.',
    imagem: '/assets/cat-armazenamento.png',
  },
  {
    nome: 'Placas-mãe',
    categoria: 'Placa-mãe',
    descricao: 'A base certa para compatibilidade e upgrades.',
    imagem: '/assets/cat-placas-mae.png',
  },
  {
    nome: 'Gabinetes',
    categoria: 'Gabinete',
    descricao: 'Estrutura, airflow e estilo para sua configuração.',
    imagem: '/assets/cat-gabinetes.png',
  },
  {
    nome: 'Coolers',
    categoria: 'Cooler',
    descricao: 'Refrigeração para manter a máquina consistente.',
    imagem: '/assets/cat-coolers.png',
  },
]

const buildsDestaque = [
  {
    nome: 'PC Gamer Entrada',
    descricao: 'Configuração equilibrada para jogos competitivos e uso diário.',
    tag: 'Custo-benefício',
    preco: 'R$ 3.500,00',
    consumo: '320W',
    imagem: '/assets/build-gamer-entrada.png',
  },
  {
    nome: 'PC Intermediário',
    descricao: 'Build para jogar, estudar, trabalhar e fazer upgrades futuros.',
    tag: 'Equilibrado',
    preco: 'R$ 5.200,00',
    consumo: '430W',
    imagem: '/assets/build-intermediario.png',
  },
  {
    nome: 'PC para Trabalho',
    descricao: 'Configuração focada em produtividade, estudos e multitarefas.',
    tag: 'Produtividade',
    preco: 'R$ 4.100,00',
    consumo: '280W',
    imagem: '/assets/build-trabalho.png',
  },
]

const comunidadeCards = [
  {
    titulo: 'Compatibilidade',
    descricao: 'Tire dúvidas antes de comprar peças.',
  },
  {
    titulo: 'Setups',
    descricao: 'Compartilhe sua configuração com a comunidade.',
  },
  {
    titulo: 'Upgrades',
    descricao: 'Receba ideias para melhorar seu PC.',
  },
]

function buscarPostsForum(): PostForumResumo[] {
  const postsSalvos = localStorage.getItem(CHAVE_FORUM)

  if (!postsSalvos) {
    return []
  }

  try {
    return JSON.parse(postsSalvos) as PostForumResumo[]
  } catch {
    return []
  }
}

function Home({ onNavigate }: HomeProps) {
  const pecas = buscarPecas()
  const posts = buscarPostsForum()

  const totalPecas = pecas.length
  const categoriasCadastradas = new Set(pecas.map((peca) => peca.categoria)).size
  const valorTotalCatalogo = pecas.reduce((total, peca) => total + peca.preco, 0)
  const consumoTotalCatalogo = pecas.reduce((total, peca) => total + peca.consumo, 0)

  return (
    <section className="page home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="badge">NexusPC Hub</span>

          <h1>Explore, monte e compartilhe configurações de PC</h1>

          <p>
            Cadastre peças, monte builds, calcule consumo e participe da
            comunidade NexusPC.
          </p>

          <div className="hero-actions">
            <button
              type="button"
              className="primary-button"
              onClick={() => onNavigate('montagem')}
            >
              Montar meu PC
            </button>

            <button
              type="button"
              className="secondary-button"
              onClick={() => onNavigate('pecas')}
            >
              Explorar peças
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <img src="/assets/nexuspc-visual.png" alt="" />
        </div>
      </section>

      <SearchBar />

      <div className="stats-grid">
        <StatCard label="Peças cadastradas" value={totalPecas} detail="no catálogo" />
        <StatCard
          label="Categorias utilizadas"
          value={categoriasCadastradas}
          detail="tipos de componente"
        />
        <StatCard
          label="Valor em catálogo"
          value={`R$ ${valorTotalCatalogo.toFixed(2)}`}
          detail="soma das peças"
        />
        <StatCard
          label="Consumo catalogado"
          value={`${consumoTotalCatalogo}W`}
          detail="estimativa total"
        />
        <StatCard label="Posts no fórum" value={posts.length} detail="na comunidade" />
      </div>

      <section className="section-block">
        <div className="section-title">
          <span className="eyebrow">Catálogo</span>
          <h2>Categorias populares</h2>
        </div>

        <div className="category-grid">
          {categoriasPopulares.map((categoria) => (
            <CategoryCard
              key={categoria.nome}
              nome={categoria.nome}
              descricao={categoria.descricao}
              imagem={categoria.imagem}
              quantidade={
                pecas.filter((peca) => peca.categoria === categoria.categoria).length
              }
            />
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-title">
          <span className="eyebrow">Inspiração</span>
          <h2>Builds em destaque</h2>
        </div>

        <div className="featured-builds-grid">
          {buildsDestaque.map((build) => (
            <FeaturedBuildCard key={build.nome} {...build} />
          ))}
        </div>
      </section>

      <section className="community-section">
        <div className="community-visual">
          <img src="/assets/nexuspc-community.png" alt="" />
        </div>

        <div className="community-content">
          <span className="eyebrow">Comunidade</span>
          <h2>Comunidade NexusPC</h2>
          <p>
            Use o fórum para tirar dúvidas, comparar escolhas e compartilhar
            experiências com outras pessoas montando PCs.
          </p>

          {posts.length > 0 ? (
            <div className="recent-posts">
              {posts.slice(0, 3).map((post) => (
                <article key={post.id}>
                  <span>{post.categoria}</span>
                  <h3>{post.titulo}</h3>
                  <small>
                    {post.autor} • {post.data}
                  </small>
                </article>
              ))}
            </div>
          ) : (
            <div className="community-cards">
              {comunidadeCards.map((item) => (
                <article key={item.titulo}>
                  <h3>{item.titulo}</h3>
                  <p>{item.descricao}</p>
                </article>
              ))}
            </div>
          )}

          <button
            type="button"
            className="secondary-button"
            onClick={() => onNavigate('forum')}
          >
            Abrir fórum
          </button>
        </div>
      </section>
    </section>
  )
}

export default Home
