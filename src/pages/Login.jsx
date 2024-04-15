import {useContext, useState} from 'react';
import {AuthContext} from '../context/AuthContext.jsx';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {LoginButton} from '../components/buttons/Button.jsx';
import {Input} from '../components/input/Input.jsx';
import {urlBuilder} from '../helpers/UrlBuilder.js';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {login} = useContext(AuthContext);

  const handleSubmit = async event => {
    event.preventDefault();
    setError("");

    axios.post(urlBuilder("/api/login"), {username: email, password: password})
      .then(result => login(result.data.token))
      .catch(err => setError(err.response.data))
  };

  return (
    <section>
      <dialog open>
        <h2>Aanmelden</h2>
        <form className="form" id="login-form" onSubmit={handleSubmit}>
          <div className="form-separator"><p></p></div>
          <Input label="Emailadres" type="email" name="email" handler={(e) => setEmail(e.target.value)}>{email}</Input>
          <Input label="Wachtwoord" type="password" name="password" handler={(e) => setPassword(e.target.value)}>{password}</Input>
          <div>
            {error && <p className="error">{error}</p>}
          </div>
          <div className="form-row">
            <LoginButton/>
          </div>
        </form>

        <p>Heb je nog geen account? <Link to="/registreer">Registreer</Link> je dan eerst.</p>
      </dialog>
    </section>
  );
}

export default Login;
