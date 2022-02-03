import {Button} from './components/Button';
function App() {
  return (
   <>
   <h1>Hello World! {import.meta.env.VITE_APP_APP_IDD}</h1>
   <Button />
   <Button text="ola" />
   </>
  )
}

export default App
