import {useContext, useState} from 'react';
import {Input, InputArea} from './Input.jsx';
import {Submit} from './Button.jsx';
import axios from 'axios';
import cfg from '../config.json';
import {isBlank} from '../helpers/Validators.js';
import {AuthContext} from '../context/AuthContext.jsx';

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
    let isValid = true;
    event.preventDefault();
    setError("");
    if (isBlank(title)) {
      setError("Titel mag niet leeg zijn");
      isValid = false;
    }
    if (isBlank(body)) {
      setError("Tekst mag niet leeg zijn");
      isValid = false;
    }
    if (isValid) {
      if (!note.id) {
        axios.post(`${cfg.backend}/api/notes`, {title: title, body: body}, requestHeaders())
        .catch(error => setError(`Kon de nieuwe notitie niet opslaan (${error})`));
      } else {
        axios.put(`${cfg.backend}/api/notes`, {id: note.id, title: title, body: body}, requestHeaders())
        .catch(error => setError(`Kon de notitie niet wijzigen (${error})`));
      }
      close(true);
    }
  }

  return (
    <dialog id={!note.id ? "new-note" : note.id}>
      <h2>{!note.id ? "Nieuwe" : "Wijzig"} Notitie</h2>
      <form method="dialog" onSubmit={handleSubmit} onReset={() => close(false)}>
        <Input label="Titel" name="title" type="text" handler={(e) => setTitle(e.target.value)}>{title}</Input>
        <InputArea label="Tekst" name="body" handler={(e) => setBody(e.target.value)} rows="11" value={body}></InputArea>
        <Submit>Sla op</Submit>
        <button type="reset" onClick={() => close(false)}>Laat maar</button>
      </form>
      {error && <p className="error">{error}</p>}
    </dialog>
  );
}
