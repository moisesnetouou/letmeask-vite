import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'

import '../styles/new-room.scss';

export function NewRoom(){
  return(
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h1>Criar uma nova sala</h1>
          <form>
            <input 
              type="text" 
              placeholder="Nome da sala"
            />

            <Button>Criar sala</Button>
          </form>

          <p>
            Quer entrar em uma sala existente? <a href="#">clique aqui</a>
          </p>
        </div>
      </main>
    </div>
  )
}