import {useEffect, useState} from 'react';
import axios from 'axios';
import cfg from '../config.json';
import {NoteDialog} from '../components/NoteDialog.jsx';
import {Clicker} from '../components/Button.jsx';

export const Notities = () => {
  const token = localStorage.getItem( 'token' );
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState("");
  const [isDialogOpen, toggleDialogOpen] = useState(false);
  const [updated, setUpdated] = useState(false);
  const emptyNote = {id: undefined, title: '', body: ''};
  const headrs = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const showDialog = (clazz) => {
    const dialog = document.querySelector("." + clazz);
    if (!isDialogOpen) {
      dialog.showModal();
      toggleDialogOpen(true);
    } else {
      dialog.close();
      toggleDialogOpen(false);
    }
  }

  useEffect(() => {
    axios.get(`${cfg.backend}/api/users/notes`, headrs)
    .then(result => setCards(result.data))
    .catch(error => {
      console.error(error);
      setError(`Ophalen van Notities is niet gelukt (${error})`)
    });

    return () => {
      toggleDialogOpen(false);
      setUpdated(false);
    }
  }, [updated]);

  return (
    <>
    <section className="notes">
      <aside>
        {cards.map(card => (
          <div key={card.id} className="card" onClick={() => {
            setSelected(card.id);
            toggleDialogOpen(false);
          }}>
            <h3>{card.title}</h3>
            <p><i>{card.created}</i></p>
          </div>
        ))}
        <div key="new" className="card">
          <NoteDialog note={emptyNote} setUpdated={setUpdated} onClose={() => toggleDialogOpen(false)} />
          <p><Clicker handler={() => showDialog("note-inserter")}><i className="fas fa-plus"></i> Nieuwe notitie</Clicker></p>
        </div>
      </aside>

      <div className="separator"></div>

      <article>
        {cards.filter(card => card.id === selected).map(card => (
          <span key={card.id}>
            <NoteDialog note={card} setUpdated={setUpdated} onClose={() => toggleDialogOpen(false)} />
            <h2>{card.title}</h2>
            <p><Clicker handler={() => showDialog("note-editor")}><i className="fas fa-edit"></i> Edit</Clicker></p>
            <p><i>Aangemaakt: {card.created}</i></p>
            <p>{card.body}</p>
          </span>
        ))}
      </article>
    </section>
    {error && <section><p>{error}</p></section>}
  </>
  );
}
