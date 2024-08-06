import { Routes, Route } from 'react-router-dom';
import './App.css';
import IndexPage from '../src/pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import LayoutComponent from './components/LayoutComponent.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import axios from 'axios';
import { UserContextProvider } from './context/UserContext.jsx';
import AccountPage from './pages/AccountPage.jsx';

axios.defaults.baseURL = 'http://localhost:5001';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<LayoutComponent />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/:subpage?" element={<AccountPage/>} />
          
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
