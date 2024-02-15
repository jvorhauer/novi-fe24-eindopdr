import './App.css'
import {Route, Routes} from 'react-router-dom';
import {AuthContext} from './context/AuthContext.jsx';
import Lorem from './pages/Lorem.jsx';
import Login from './pages/Login.jsx';
import {useContext} from 'react';
import Navigation from './components/Navigation.jsx';

function App() {
  const { isAuth } = useContext(AuthContext);

  return (
    <main id="root">
      <Navigation />
      <div className="content">
        <Routes>
          <Route path="/" element={<Lorem />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registreer" />
          <Route path="/taken" element={isAuth ? <Lorem /> : <Lorem />} />
          <Route path="/notities" element={isAuth ? <Lorem /> : <Lorem />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
