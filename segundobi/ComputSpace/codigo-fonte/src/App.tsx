import { useState } from 'react'
import './App.css'

import Home from './pages/Home'
import Pecas from './pages/Pecas'
import Montagem from './pages/Montagem'
import Forum from './pages/Forum'

type Tela = 'home' | 'pecas' | 'montagem' | 'forum'

const navItems: { id: Tela; label: string }[] = [
  { id: 'home', label: 'Início' },
  { id: 'pecas', label: 'Peças' },
  { id: 'montagem', label: 'Montagem' },
  { id: 'forum', label: 'Fórum' },
]

function App() {
  const [telaAtual, setTelaAtual] = useState<Tela>('home')

  return (
    <main className="app">
      <header className="topbar">
        <button
          type="button"
          className="brand"
          onClick={() => setTelaAtual('home')}
          aria-label="Ir para início"
        >
          <img src="/assets/nexuspc-logo-mark.png" alt="" />
          <span>NexusPC</span>
        </button>

        <nav>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={telaAtual === item.id ? 'active' : ''}
              onClick={() => setTelaAtual(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="primary-button header-action"
          onClick={() => setTelaAtual('montagem')}
        >
          Montar PC
        </button>
      </header>

      <div className="content">
        {telaAtual === 'home' && <Home onNavigate={setTelaAtual} />}
        {telaAtual === 'pecas' && <Pecas />}
        {telaAtual === 'montagem' && <Montagem />}
        {telaAtual === 'forum' && <Forum />}
      </div>
    </main>
  )
}

export default App
