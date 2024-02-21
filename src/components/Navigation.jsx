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

  const hilite = (here) => (pathname === here ? selected : normal);

  return (
    <nav>
      <ul>
        <li className="logo">
          <Link to="/">
            <i className="fas fa-user-edit" title="Novi FrontEnd EindOpdracht 2024"></i>
          </Link>
        </li>
      </ul>
      {isAuth ?
      <ul>
        <li>
          <button className={hilite("/taken")} onClick={() => navigate("/taken")}>Taken</button>
        </li>
        <li>
          <button className={hilite("/notities")} onClick={() => navigate("/notities")}>Notities</button>
        </li>
        <li>
          <Gravatar hash={user.gravatar} naam={user.username} handler={() => logout()}/>
        </li>
      </ul>
      :
      <ul>
        <li>
          <Clicker handler={() => navigate("/login")} className={pathname === "/login" ? selected : normal}>Log in</Clicker>
        </li>
        <li>
          <Clicker handler={() => navigate("/registreer")} className={pathname === "/registreer" ? selected : normal}>Registreer</Clicker>
        </li>
      </ul>
    }
    </nav>
  );
}

export default Navigation;
