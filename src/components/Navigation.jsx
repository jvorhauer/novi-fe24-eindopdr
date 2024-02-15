import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext.jsx';
import {Link, useNavigate} from 'react-router-dom';
import "./Navigation.css";

const Navigation = () => {
  const {isAuth, logout} = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav>
      <Link to="/">
        <span className="logo">
          <i className="fas fa-user-edit" title="Novi FrontEnd EindOpdracht 2024"></i>
        </span>
      </Link>
      <ul className="links">
        {isAuth ?
          <span>
            <li>
              <button type="button" onClick={() => navigate("/taken")}>Taken</button>
            </li>
            <li>
              <button type="button" onClick={() => navigate("/notities")}>Notities</button>
            </li>
            <li>
              <button type="button" onClick={() => logout()}>Log uit</button>
            </li>
          </span>
          :
          <span>
            <li>
              <button type="button" onClick={() => navigate("/login")}>Log in</button>
            </li>
            <li>
              <button type="button" onClick={() => navigate("/registreer")}>Registreer</button>
            </li>
          </span>
        }
      </ul>
    </nav>
  );
}

export default Navigation;
