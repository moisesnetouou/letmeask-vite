import { AppProvider } from "./contexts"
import { MainRoutes } from "./routes"

function App() {
  return (
    <AppProvider>
      <MainRoutes />
    </AppProvider>
  )
}

export default App
