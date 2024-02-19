import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext.jsx';
import {Link, useNavigate} from 'react-router-dom';
import "./Navigation.css";
import {Clicker} from './Button.jsx';
import {Gravatar} from './Gravatar.jsx';

const Navigation = () => {
  const {isAuth, logout, user} = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav>
      <ul>
        <li className="logo">
          <Link to="/">
            <i className="fas fa-user-edit" title="Novi FrontEnd EindOpdracht 2024"></i>
          </Link>
        </li>
      </ul>
      <ul>
        {isAuth ?
          <span className="nav-nav">
            <li>
              <Clicker handler={() => navigate("/taken")}>Taken</Clicker>
            </li>
            <li>
              <Clicker handler={() => navigate("/notities")}>Notities</Clicker>
            </li>
            <li>
              <Gravatar hash={user.gravatar} naam={user.username} onClick={() => logout()} />
            </li>
          </span>
          :
          <span className="nav-nav">
            <li>
              <Clicker handler={() => navigate("/login")}>Log in</Clicker>
            </li>
            <li>
              <Clicker handler={() => navigate("/registreer")}>Registreer</Clicker>
            </li>
          </span>
        }
      </ul>
    </nav>
  );
}

export default Navigation;
