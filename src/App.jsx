import './App.css'
import {Route, Routes, Navigate} from 'react-router-dom';
import {AuthContext} from './context/AuthContext.jsx';
import Login from './pages/Login.jsx';
import {useContext} from 'react';
import Navigation from './components/Navigation.jsx';
import Registreer from './pages/Registreer.jsx';
import {Taken} from './pages/Taken.jsx';
import {Notities} from './pages/Notities.jsx';

export default () => {
  const {isAuth} = useContext(AuthContext);
  return (
    <>
      <header>
        <Navigation/>
      </header>
      <main>
        <div className="content">
          <Routes>
            <Route path="/" element={isAuth ? <Taken /> : <Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registreer" element={<Registreer />} />
            <Route path="/taken" element={isAuth ? <Taken /> : <Navigate to="/login" replace />} />
            <Route path="/notities" element={isAuth ? <Notities/> : <Navigate to="/login" replace />} />
          </Routes>
        </div>
      </main>
    </>
  );
}
