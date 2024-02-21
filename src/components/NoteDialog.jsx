import {useContext, useState} from 'react';
import {Input, InputArea} from './Input.jsx';
import {ResetButton, SaveButton} from './Button.jsx';
import axios from 'axios';
import {AuthContext} from '../context/AuthContext.jsx';
import {urlBuilder} from '../helpers/UrlBuilder.js';

export const NoteDialog = ({ note, setUpdated }) => {
  const {requestHeaders} = useContext(AuthContext);
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const [error, setError] = useState("");
  const elementId = !note.id ? "new-note" : note.id;

  const close = (mark) => {
    console.log("close", mark);
    document.getElementById(elementId).close();
    setUpdated(mark);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!note.id) {
      axios.post(urlBuilder("/api/notes"), {title: title, body: body}, requestHeaders())
      .catch(error => setError(`Kon de nieuwe notitie niet opslaan (${error})`));
    } else {
      axios.put(urlBuilder("/api/notes"), {id: note.id, title: title, body: body}, requestHeaders())
      .catch(error => setError(`Kon de notitie niet wijzigen (${error})`));
    }
    close(true);
  }

  return (
    <dialog id={!note.id ? "new-note" : note.id}>
      <h2>{!note.id ? "Nieuwe" : "Wijzig"} Notitie</h2>
      <form method="dialog" onSubmit={handleSubmit} onReset={() => close(false)}>
        <Input label="Titel" name="title" type="text" handler={(e) => setTitle(e.target.value)}>{title}</Input>
        <InputArea label="Tekst" name="body" handler={(e) => setBody(e.target.value)} rows="21" value={body}></InputArea>
        <div className="form-row">
          <ResetButton />
          <SaveButton />
        </div>
      </form>
      {error && <p className="error">{error}</p>}
    </dialog>
  );
}
