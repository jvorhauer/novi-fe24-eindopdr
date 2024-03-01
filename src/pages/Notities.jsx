import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {NoteDialog} from '../components/NoteDialog.jsx';
import {EditButton, NewButton, RemoveButton} from '../components/Button.jsx';
import {AuthContext} from '../context/AuthContext.jsx';
import {urlBuilder} from '../helpers/UrlBuilder.js';
import './Notities.css';
import TagDecoder from '../helpers/TagDecoder.js';
import Loader from '../components/loader/Loader.jsx';

export const Notities = () => {
  const {requestHeaders} = useContext(AuthContext);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState("");
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const emptyNote = {id: undefined, title: '', body: ''};

  const showDialog = (elementId) => document.getElementById(elementId).showModal();

  const remove = (id) => {
    setLoading(true);
    if (confirm("Are you sure you want to delete this note?")) {
      axios.delete(urlBuilder(`/api/notes/${id}`), requestHeaders())
        .then(() => {
          setUpdated(true);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          setError(`Could not delete note: ${error}`);
        });
    }
  }

  useEffect(() => {
    setLoading(true);
    axios.get(urlBuilder("/api/users/notes"), requestHeaders()).then(result => {
      setLoading(false);
      setCards(result.data);
      if (!selected && result.data && result.data.length > 0) {
        setSelected(result.data[0].id);
      }
    }).catch(error => {
      setLoading(false);
      setError(`Retrieval of notes failed: ${error}`);
    });

    return () => {
      setUpdated(false);
    }
  }, [updated]);

  const Notes = () => {
    return (
      <section className="notes">
        <aside>
          {cards.map(card => (
            <div key={card.id} className="card" onClick={() => setSelected(card.id)} draggable="false">
              <h3>{TagDecoder(card.title)}</h3>
              <span className="smaller">
                <i className="fas fa-calendar-plus" title="created"></i> <i>{card.created}</i><br />
              </span>
              <span className="smaller">
                {TagDecoder(card.body.slice(0, 42))}...
              </span>
            </div>
          ))}
          <div key="new" className="card">
            <NoteDialog note={emptyNote} setUpdated={setUpdated} />
            <p className="p_new"><NewButton handler={() => showDialog("new-note")} title="New Note" /></p>
          </div>
        </aside>
        <div className="separator"></div>
        <article>
          {cards.filter(card => card.id === selected).map(card => (
            <span key={card.id}>
            <NoteDialog note={card} setUpdated={setUpdated} />
            <h2>{TagDecoder(card.title)}</h2>
            <div className="note-meta">
              <span>
                <i className="fas fa-calendar-plus" title="gemaakt"></i> <i title="created">{card.created}</i>
              </span>
              <span>
                <i className="fas fa-arrow-alt-circle-up" title="laatst gewijzigd"></i> <i>{card.updated}</i>
              </span>
              <EditButton handler={() => showDialog(card.id)} title="Wijzig Notitie" />
              <RemoveButton handler={() => remove(card.id)} title="Verwijder Notitie" />
            </div>
            <p className="p_wrap">{TagDecoder(card.body)}</p>
          </span>
          ))}
        </article>
      </section>
    );
  }

  return (
    <>
      {loading ? <Loader /> : <Notes />}
      {error && <section><p className="error">{error}</p></section>}
    </>
  );
}
