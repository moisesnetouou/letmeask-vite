import { BrowserRouter as Router } from 'react-router-dom';
import MainRoutes from './routes';
import AppProvider from './contexts';

function App() {
  return (
    <Router>
      <AppProvider>
        <MainRoutes />
      </AppProvider>
    </Router>
  );
}

export default App;
