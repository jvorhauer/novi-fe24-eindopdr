import {useContext, useState} from 'react';
import {AuthContext} from '../context/AuthContext.jsx';
import axios from 'axios';
import {Link} from 'react-router-dom';
import cfg from '../config.json';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, toggleError] = useState(false);
  const { login } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    toggleError(false);

    try {
      const result = await axios.post(`${cfg.backend}/api/login`, {
        username: email,
        password: password,
      });
      console.log(result.data);
      login(result.data.token);
    } catch(e) {
      console.error(e);
      toggleError(true);
    }
  }

  return (
    <section className="login-form">
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-row">
          <label htmlFor="email-field">Emailadres:</label>
          <input
            type="email"
            id="email-field"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-row">
          <label htmlFor="password-field">Wachtwoord:</label>
          <input
            type="password"
            id="password-field"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error">Combinatie van emailadres en wachtwoord is onjuist</p>}

        <div className="input-row">
          <button type="submit" className="form-button">
            Inloggen
          </button>
        </div>
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </section>
  );
}

export default Login;
