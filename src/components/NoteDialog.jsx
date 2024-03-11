import {useContext, useState} from 'react';
import {Input, InputArea} from './input/Input.jsx';
import {ResetButton, SaveButton} from './buttons/Button.jsx';
import axios from 'axios';
import {AuthContext} from '../context/AuthContext.jsx';
import {urlBuilder} from '../helpers/UrlBuilder.js';
import TagDecoder from '../helpers/TagDecoder.js';

export const NoteDialog = ({ note, setUpdated }) => {
  const {requestHeaders} = useContext(AuthContext);
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const [error, setError] = useState("");
  const elementId = !note.id ? "new-note" : note.id;

  const close = (mark) => {
    document.getElementById(elementId).close();
    setUpdated(mark);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!note.id) {
      axios.post(urlBuilder("/api/notes"), {title: title, body: body}, requestHeaders())
        .then(() => close(true))
        .catch(err => setError(`Kon de nieuwe notitie niet opslaan (${err.response.data})`));
    } else {
      axios.put(urlBuilder("/api/notes"), {id: note.id, title: title, body: body}, requestHeaders())
        .then(() => close(true))
        .catch(err => setError(`Kon de notitie niet wijzigen (${err.response.data})`));
    }
  }

  return (
    <dialog id={!note.id ? "new-note" : note.id}>
      <h2>{!note.id ? "Nieuwe" : "Wijzig"} Notitie</h2>
      <form method="dialog" onSubmit={handleSubmit} onReset={() => close(false)} className="form">
        <Input label="Titel" name="title" type="text" handler={(e) => setTitle(e.target.value)}>{TagDecoder(title)}</Input>
        <InputArea label="Tekst" name="body" handler={(e) => setBody(e.target.value)} value={TagDecoder(body)}></InputArea>
        <div className="form-row">
          <ResetButton />
          <SaveButton />
        </div>
      </form>
      {error && <p className="error">{error}</p>}
    </dialog>
  );
}
