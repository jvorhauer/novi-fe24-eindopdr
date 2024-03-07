import {useContext, useEffect, useRef, useState} from 'react';
import {AuthContext} from '../context/AuthContext.jsx';
import {Link, useLocation} from 'react-router-dom';
import "./Navigation.css";
import {Gravatar} from './Gravatar.jsx';
import axios from 'axios';
import cfg from "../config.json";
import {conditionHelper, tempHelper, windDirectionHelper, windSpeedHelper} from '../helpers/WeatherHelpers.js';

const Navigation = () => {
  const {isAuth, logout, user} = useContext(AuthContext);
  const location = useLocation();
  const [weather, setWeather] = useState(null);
  const {pathname} = location;
  const selected = "selected-menu-item";
  const normal = "normal-menu-item";
  const timer = useRef(null);

  const hilite = (here) => (pathname === here ? selected : normal);

  const retriever = () => {
    axios.get("http://ip-api.com/json")
      .then(geo => {
        const coords = `lat=${geo.data.lat}&lon=${geo.data.lon}`;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?${coords}&appid=${cfg.owmapikey}&lang=nl`)
          .then(result => setWeather(result.data))
          .catch(err => console.error("weather failed:", err))
      }).catch(err => console.error("geo failed:", err));
  };

  useEffect(() => {
    if (!timer.current) {
      timer.current = setInterval(retriever, 5 * 60 * 1000);
    }
    retriever();
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    }
  }, [location]);

  const NavItem = ({ target, children, ...rest}) => {
    return (
      <Link to={target} className={hilite(target)} {...rest}>{children}</Link>
    )
  }

  const Weather = () => {
    if (!weather) {
      return (<></>);
    }
    const icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    const arrowStyle = {
      transform: `rotate(${weather.wind.deg}deg)`
    }
    return (
      <div className="hover-text">
        <img src={icon} className="weather" alt="Het weer" />
        <span className="tooltip-text tooltip-bottom p_wrap">
          {conditionHelper(weather)}
          <i className="fas fa-thermometer-half"></i> {tempHelper(weather)}
          <div className="compass">
            <div className="direction">
              <p>
                <i className="fas fa-arrow-up" style={arrowStyle}></i> {windDirectionHelper(weather)}
                <span>{windSpeedHelper(weather)}</span>
              </p>
            </div>
          </div>
        </span>
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
