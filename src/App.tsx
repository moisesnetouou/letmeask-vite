import { BrowserRouter as Router } from 'react-router-dom';
import MainRoutes from './routes';
import AppProvider from './contexts';
import { GlobalStyle } from './styles/global';

function App() {
  return (
    <Router>
      <AppProvider>
        <MainRoutes />
        <GlobalStyle />
      </AppProvider>
    </Router>
  );
}

export default App;
