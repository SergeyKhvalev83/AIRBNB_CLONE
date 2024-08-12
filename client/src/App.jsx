import { Routes, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import IndexPage from '../src/pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import LayoutComponent from './components/LayoutComponent.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import { UserContextProvider } from './context/UserContext.jsx';
import AccountPage from './pages/AccountPage.jsx';
import PlacesPage from './pages/PlacesPage';
import MyBookingsPage from './pages/MyBookingsPage';
import NewPlacesFormPage from './pages/NewPlacesFormPage.jsx';
import PlaceDetailedPage from './pages/PlaceDetailedPage.jsx'

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
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<NewPlacesFormPage />} />
          <Route path="/account/bookings" element={<MyBookingsPage />} />
          <Route path="/account/my-places/:id" element={<NewPlacesFormPage />} />
          {/* <Route path="/account/my-places/:id" element={<PlaceDetailedPage />} /> */}
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
