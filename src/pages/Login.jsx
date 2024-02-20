import {useContext, useState} from 'react';
import {AuthContext} from '../context/AuthContext.jsx';
import axios from 'axios';
import {Link} from 'react-router-dom';
import cfg from '../config.json';
import {Submit} from '../components/Button.jsx';
import {Input} from '../components/Input.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, toggleError] = useState(false);
  const { login } = useContext(AuthContext);

  async function handleSubmit(event) {
    event.preventDefault();
    toggleError(false);

    axios.post(`${cfg.backend}/api/login`, {username: email, password: password})
    .then(result => login(result.data.token))
    .catch(error => {
      console.error(error);
      toggleError(true)
    })
  }

  return (
    <section className="login-form">
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <Input label="Emailadres" type="email" name="email" handler={(e) => setEmail(e.target.value)}>
            {email}
          </Input>
        </div>

        <div className="form-row">
          <Input label="Wachtwoord" type="password" name="password" handler={(e) => setPassword(e.target.value)}>
            {password}
          </Input>
        </div>
        {error && <p className="error">Combinatie van emailadres en wachtwoord is onjuist</p>}

        <div className="form-row">
          <Submit>Inloggen</Submit>
        </div>
      </form>

      <p>Heb je nog geen account? <Link to="/registreer">Registreer</Link> je dan eerst.</p>
    </section>
  );
}

export default Login;
