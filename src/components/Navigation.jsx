import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthContext.jsx';
import {Link, useLocation} from 'react-router-dom';
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
  const calcTemp = (tempK) => Math.round((tempK - 273.15) * 10) / 10;

  useEffect(() => {
    axios.get("http://ip-api.com/json",)
      .then(geo => {
        const coords = `lat=${geo.data.lat}&lon=${geo.data.lon}`;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?${coords}&appid=${cfg.owmapikey}&lang=nl`)
          .then(weather => weather.data)
          .then(weather => {
            console.log("weather", weather);
            const temps = `🌡 ${calcTemp(weather.main.temp)} / ${calcTemp(weather.main.feels_like)}\u00b0C`;
            const where = `${geo.data.city} (${weather.sys.country})`;
            const wind = `\u2634 ${weather.wind.deg}\u00b0 ${weather.wind.speed} m/s`;
            setIcon(`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
            setCondition(`${where}\n${weather.weather[0].description}\n${temps}\n${wind}`);
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
    return (
      <div className="hover-text">
        <img src={icon} className="weather" alt="Het weer" />
        <span className="tooltip-text tooltip-bottom p_wrap">{condition}</span>
      </div>
    );
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
      <div className="nav-links">
        <NavItem target="/taken">Taken</NavItem>
        <NavItem target="/notities">Notities</NavItem>
        <NavItem target="/login" onClick={() => logout()}>Afmelden</NavItem>
      </div>
    );
  }

  const AnonymousLinks = () => {
    return (
      <div className="nav-links">
        <NavItem target="/login">Log in</NavItem>
        <NavItem target="/registreer">Registreer</NavItem>
      </div>
    );
  }

  return (
    <nav>
      <Logo />
      {isAuth ? <LoggedInLinks /> : <AnonymousLinks />}
      <div className="nav-icons">
        <Weather />
      </div>
    </nav>
  );
}

export default Navigation;
