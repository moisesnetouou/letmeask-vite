import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import MainRoutes from './routes';
import AppProvider from './contexts';
import { GlobalStyle } from './styles/global';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <AppProvider>
        <MainRoutes />
        <GlobalStyle />
        <ToastContainer />
      </AppProvider>
    </Router>
  );
}

export default App;
