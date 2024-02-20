import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext.jsx';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import "./Navigation.css";
import {Clicker} from './Button.jsx';
import {Gravatar} from './Gravatar.jsx';

const Navigation = () => {
  const {isAuth, logout, user} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const {pathname} = location;
  const selected = "selected-menu-item";
  const normal = "normal-menu-item";

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
              <Clicker handler={() => navigate("/taken")} className={pathname === "/taken" ? selected : normal}>Taken</Clicker>
            </li>
            <li>
              <Clicker handler={() => navigate("/notities")} className={pathname === "/notities" ? selected : normal}>Notities</Clicker>
            </li>
            <li>
              <Gravatar hash={user.gravatar} naam={user.username} handler={() => logout()} />
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
