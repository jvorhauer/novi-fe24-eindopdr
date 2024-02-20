import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import cfg from '../config.json';
import {NoteDialog} from '../components/NoteDialog.jsx';
import {Clicker} from '../components/Button.jsx';
import {AuthContext} from '../context/AuthContext.jsx';

export const Notities = () => {
  const {requestHeaders} = useContext(AuthContext);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState("");
  const [updated, setUpdated] = useState(false);
  const emptyNote = {id: undefined, title: '', body: ''};

  const showDialog = (elementId) => {
    let element = document.getElementById(elementId);
    element.showModal();
  }

  const remove = (id) => {
    if (confirm("Weet je zeker dat je de notitie wil verwijderen?")) {
      axios.delete(`${cfg.backend}/api/notes/${id}`, requestHeaders())
        .then(() => setUpdated(true))
        .catch(error => setError(`Kon de notitie niet verwijderen (${error})`));
    }
  }

  useEffect(() => {
    axios.get(`${cfg.backend}/api/users/notes`, requestHeaders())
      .then(result => setCards(result.data))
      .catch(error => setError(`Ophalen van Notities is niet gelukt (${error})`));

    return () => {
      setUpdated(false);
    }
  }, [updated]);

  return (
    <>
    <section className="notes">
      <aside>
        {cards.map(card => (
          <div key={card.id} className="card" onClick={() => setSelected(card.id)}>
            <h3>{card.title}</h3>
            <p><i>{card.created}</i></p>
          </div>
        ))}
        <div key="new" className="card">
          <NoteDialog note={emptyNote} setUpdated={setUpdated} onClose={() => toggleDialogOpen(false)} />
          <p><Clicker handler={() => showDialog("new-note")}><i className="fas fa-plus"></i> Nieuwe notitie</Clicker></p>
        </div>
      </aside>

      <div className="separator"></div>

      <article>
        {cards.filter(card => card.id === selected).map(card => (
          <span key={card.id}>
            <NoteDialog note={card} setUpdated={setUpdated} onClose={() => toggleDialogOpen(false)} />
            <h2>{card.title}</h2>
            <p>
              <Clicker handler={() => showDialog(card.id)}><i className="fas fa-edit"></i> Edit</Clicker>
              <Clicker handler={() => remove(card.id)}><i className="fas fa-dumpster-fire"></i> Verwijder</Clicker>
            </p>
            <p><i>Aangemaakt: {card.created}</i></p>
            <p dangerouslySetInnerHTML={ { __html: card.body }}></p>
          </span>
        ))}
      </article>
    </section>
    {error && <section><p className="error">{error}</p></section>}
  </>
  );
}
