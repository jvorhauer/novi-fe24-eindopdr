import React, {useContext, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext.jsx';
import {Input} from '../components/Input.jsx';
import {RegistreerButton} from '../components/Button.jsx';
import {urlBuilder} from '../helpers/UrlBuilder.js';

const Registreer = () => {
  const [email, setEmail] = useState("");
  const [naam, setNaam] = useState("");
  const [password, setPassword] = useState("");
  const [nogmaals, setNogmaals] = useState("");
  const [error, setError] = useState("");
  const {login} = useContext(AuthContext);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!password || !nogmaals || !naam || !email) {
      setError("Alle velden zijn verplicht");
    } else {
      if (password !== nogmaals) {
        setError("Passwords zijn niet gelijk");
      } else {
        try {
          const result = await axios.post(urlBuilder("/api/users"), {
            email: email,
            name: naam,
            password: password,
          });
          login(result.data.token);
        } catch (e) {
          setError(`Het registreren is mislukt: ${e.response.data}; probeer het opnieuw`);
        }
      }
    }
  }

  return (
    <section>
      <dialog open>
        <h2>Registreer</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-separator"><p></p></div>
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
          {error && <p className="error">{error}</p>}
          <div className="form-row">
            <RegistreerButton />
          </div>
        </form>

        <p>Heb je al een account? <Link to="/login">Log in</Link></p>
      </dialog>
    </section>
  );
}

export default Registreer;
