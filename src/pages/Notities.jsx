import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthContext.jsx';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import cfg from '../config.json';

export const Notities = () => {
  const token = localStorage.getItem( 'token' );
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState("");
  const { isAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const headrs = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  if (!isAuth) {
    navigate("/login");
  }

  useEffect(() => {
    axios.get(`${cfg.backend}/api/users/notes`, headrs)
    .then(result => setCards(result.data))
    .catch(error => {
      console.error(error);
      setError(`Ophalen van Notities is niet gelukt (${error})`)
    });

    return () => {}
  }, [])

  return (
    <>
    <section className="notes">
      <aside>
        {cards.map(card => (
          <div key={card.id} className="card" onClick={() => setSelected(card.id)}>
            <h3>{card.title}</h3>
            <p>{card.created}</p>
          </div>
        ))}
        <div key="new" className="card">
          <p><i className="fas fa-plus"></i>  Nieuwe Notitie</p>
        </div>
      </aside>
      <div className="separator"></div>
      <article style={{ flex: '1 0 auto' }}>
        {cards.filter(card => card.id === selected).map(card => (
          <span key={card.id}>
            <h2>{card.title}</h2>
            <p>{card.created}</p>
            <p>{card.body}</p>
          </span>
        ))}
      </article>
    </section>
    {error &&
      <section>
        <p>{error}</p>
      </section>
    }
  </>
  );
}
