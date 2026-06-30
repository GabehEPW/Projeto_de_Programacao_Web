import { useState } from 'react'
import './App.css'

import Home from './pages/Home'
import Pecas from './pages/Pecas'
import Montagem from './pages/Montagem'

type Tela = 'home' | 'pecas' | 'montagem'

function App() {
  const [telaAtual, setTelaAtual] = useState<Tela>('home')

  return (
    <main className="app">
      <aside className="sidebar">
        <h2>ComputSpace</h2>

        <nav>
          <button
            className={telaAtual === 'home' ? 'active' : ''}
            onClick={() => setTelaAtual('home')}
          >
            Início
          </button>

          <button
            className={telaAtual === 'pecas' ? 'active' : ''}
            onClick={() => setTelaAtual('pecas')}
          >
            Peças
          </button>

          <button
            className={telaAtual === 'montagem' ? 'active' : ''}
            onClick={() => setTelaAtual('montagem')}
          >
            Montagem
          </button>
        </nav>
      </aside>

      <div className="content">
        {telaAtual === 'home' && <Home />}
        {telaAtual === 'pecas' && <Pecas />}
        {telaAtual === 'montagem' && <Montagem />}
      </div>
    </main>
  )
}

export default App