import {useState} from 'react';
import axios from 'axios';
import cfg from '../config.json';
import {Link, useNavigate} from 'react-router-dom';

const Registreer = () => {
  const [email, setEmail] = useState("");
  const [naam, setNaam] = useState("");
  const [password, setPassword] = useState("");
  const [nogmaals, setNogmaals] = useState("");
  const [error, toggleError] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
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
          console.log(result.data);
          navigate("/login");
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
          <label htmlFor="email-field">Emailadres:</label>
          <input type="email" id="email-field" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="form-row">
          <label htmlFor="naam-field">Naam:</label>
          <input type="text" id="naam-field" name="naam" value={naam} onChange={(e) => setNaam(e.target.value)}/>
        </div>
        <div className="form-row">
          <label htmlFor="password-field">Wachtwoord:</label>
          <input type="password" id="password-field" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="form-row">
          <label htmlFor="nogmaals-field">Nogmaals:</label>
          <input type="password" id="nogmaals-field" name="nogmaals" value={nogmaals} onChange={(e) => setNogmaals(e.target.value)}/>
        </div>
        {error && <p className="error">{msg}</p>}
        <div className="form-row">
          <button type="submit" className="form-button">
            Registreer
          </button>
        </div>
      </form>

      <p>Heb je al een account? <Link to="/login">Log in</Link></p>
    </section>
  );
}

export default Registreer;
