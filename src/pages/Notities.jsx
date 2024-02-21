import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {NoteDialog} from '../components/NoteDialog.jsx';
import {EditButton, NewButton, RemoveButton} from '../components/Button.jsx';
import {AuthContext} from '../context/AuthContext.jsx';
import {urlBuilder} from '../helpers/UrlBuilder.js';

export const Notities = () => {
  const {requestHeaders} = useContext(AuthContext);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState("");
  const [updated, setUpdated] = useState(false);
  const emptyNote = {id: undefined, title: '', body: ''};

  const showDialog = (elementId) => document.getElementById(elementId).showModal();

  const remove = (id) => {
    if (confirm("Weet je zeker dat je de notitie wil verwijderen?")) {
      axios.delete(urlBuilder(`/api/notes/${id}`), requestHeaders())
        .then(() => setUpdated(true))
        .catch(error => setError(`Kon de notitie niet verwijderen (${error})`));
    }
  }

  useEffect(() => {
    axios.get(urlBuilder("/api/users/notes"), requestHeaders())
      .then(result => {
        setCards(result.data);
        if (!selected) {
          setSelected(result.data[0].id);
        }
      })
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
          <NoteDialog note={emptyNote} setUpdated={setUpdated} />
          <p><NewButton handler={() => showDialog("new-note")} title="Maak nieuwe notitie" /></p>
        </div>
      </aside>

      <div className="separator"></div>

      <article>
        {cards.filter(card => card.id === selected).map(card => (
          <span key={card.id}>
            <NoteDialog note={card} setUpdated={setUpdated} />
            <h2>{card.title}</h2>
            <p>
              <i>{card.created}</i>
              <EditButton handler={() => showDialog(card.id)} title="Wijzig notitie"/>
              <RemoveButton handler={() => remove(card.id)} title="Verwijder notitie"/>
            </p>
            <p className="p_wrap">{card.body}</p>
          </span>
        ))}
      </article>
    </section>
    {error && <section><p className="error">{error}</p></section>}
  </>
  );
}
