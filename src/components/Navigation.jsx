import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext.jsx';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import "./Navigation.css";
import {Gravatar} from './Gravatar.jsx';
import {NavButton} from './Button.jsx';

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
          <Link to="/taken">
            <i className="fas fa-user-edit" title="Novi FrontEnd EindOpdracht 2024"></i>
          </Link>
        </li>
      </ul>
      {isAuth ?
        <ul>
          <li>
            <NavButton handler={() => navigate("/taken")} klass={hilite("/taken")}>Taken</NavButton>
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
            <button className={hilite("/login")} onClick={() => navigate("/login")}>Log in</button>
        </li>
        <li>
          <button className={hilite("/registreer")} onClick={() => navigate("/registreer")}>Registreer</button>
        </li>
      </ul>
    }
    </nav>
  );
}

export default Navigation;
