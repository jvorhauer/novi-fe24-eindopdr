import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthContext.jsx';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import "./Navigation.css";
import {Gravatar} from './Gravatar.jsx';
import axios from 'axios';
import cfg from "../config.json";

const Navigation = () => {
  const {isAuth, logout, user} = useContext(AuthContext);
  const location = useLocation();
  const [icon, setIcon] = useState("");
  const [condition, setCondition] = useState("");
  const {pathname} = location;
  const selected = "selected-menu-item";
  const normal = "normal-menu-item";

  const hilite = (here) => (pathname === here ? selected : normal);

  useEffect(() => {
    axios.get("http://ip-api.com/json",)
      .then(geo => {
        const coords = `lat=${geo.data.lat}&lon=${geo.data.lon}`;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?${coords}&appid=${cfg.owmapikey}&lang=nl`)
          .then(weather => {
            setIcon(`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`);
            setCondition(`${geo.data.city}: ${weather.data.weather[0].description}`);
          })
          .catch(err => console.error("weather failed:", err))
      })
      .catch(err => console.error("geo failed:", err));
  });

  const NavItem = ({ target, children, ...rest}) => {
    return (
      <Link to={target} className={hilite(target)} {...rest}>{children}</Link>
    )
  }
  const Weather = () => {
    return (<img src={icon} className="weather" alt={condition} title={condition} />);
  }

  const Logo = () => {
    return (
      <Link to="/taken" className="logo">
        {isAuth ?
          <Gravatar hash={user.gravatar} naam={user.username} /> :
          <i className="fas fa-user-edit" title="Novi FrontEnd EindOpdracht 2024"></i>
        }
      </Link>
    );
  }
  const LoggedInLinks = () => {
    return (
      <>
        <div className="nav-links">
          <NavItem target="/taken">Taken</NavItem>
          <NavItem target="/notities">Notities</NavItem>
          <NavItem target="#" onClick={() => logout()}>Afmelden</NavItem>
        </div>
        <div className="nav-icons">
          <Weather />
        </div>
      </>
    );
  }
  const AnonymousLinks = () => {
    return (
      <>
        <div className="nav-links">
          <NavItem target="/login">Log in</NavItem>
          <NavItem target="/registreer">Registreer</NavItem>
        </div>
        <div className="nav-icons">
          <Weather />
        </div>
      </>
    );
  }

  return (
    <nav>
      <Logo />
      {isAuth ? <LoggedInLinks /> : <AnonymousLinks />}
    </nav>
  );
}

export default Navigation;
