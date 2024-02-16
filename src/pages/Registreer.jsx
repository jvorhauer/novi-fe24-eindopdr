import {useContext, useState} from 'react';
import axios from 'axios';
import cfg from '../config.json';
import {Link} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext.jsx';
import {Input} from '../components/Input.jsx';
import {Submit} from '../components/Button.jsx';

const Registreer = () => {
  const [email, setEmail] = useState("");
  const [naam, setNaam] = useState("");
  const [password, setPassword] = useState("");
  const [nogmaals, setNogmaals] = useState("");
  const [error, toggleError] = useState(false);
  const [msg, setMsg] = useState("");
  const { login } = useContext(AuthContext);

  async function handleSubmit(event) {
    event.preventDefault();
    toggleError(false);

    if (!password || !nogmaals || !naam || !email) {
      toggleError(true);
      setMsg("Alle velden zijn verplicht");
    } else {
      if (password !== nogmaals) {
        toggleError(true);
        setMsg("Passwords zijn niet gelijk");
      } else {
        try {
          const result = await axios.post(`${cfg.backend}/api/users`, {
            email: email,
            name: naam,
            password: password,
          });
          login(result.data.token);
        } catch (e) {
          console.error(e);
          setMsg(`Het registreren is mislukt: ${e.response.data}; probeer het opnieuw`);
          toggleError(true);
        }
      }
    }
  }

  return (
    <section>
      <h1>Registreer</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <Input label="Emailadres" type="email" name="email" handler={(e) => setEmail(e.target.value)}>{email}</Input>
        </div>
        <div className="form-row">
          <Input label="Naam" type="text" name="naam" handler={(e) => setNaam(e.target.value)}>{naam}</Input>
        </div>
        <div className="form-row">
          <Input label="Wachtwoord" type="password" name="password" handler={(e) => setPassword(e.target.value)}>{password}</Input>
        </div>
        <div className="form-row">
          <Input label="Nogmaals" type="password" name="nogmaals" handler={(e) => setNogmaals(e.target.value)}>{nogmaals}</Input>
        </div>
        {error && <p className="error">{msg}</p>}
        <div className="form-row">
          <Submit>Registreer</Submit>
        </div>
      </form>

      <p>Heb je al een account? <Link to="/login">Log in</Link></p>
    </section>
  );
}

export default Registreer;
