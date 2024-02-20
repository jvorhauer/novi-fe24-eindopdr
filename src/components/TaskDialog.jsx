import {useContext, useState} from 'react';
import {AuthContext} from '../context/AuthContext.jsx';
import {Input, InputArea} from './Input.jsx';
import {Submit} from './Button.jsx';
import {isBlank} from '../helpers/Validators.js';
import axios from 'axios';
import cfg from '../config.json';

export const TaskDialog = ({ task, setUpdated }) => {
  const {requestHeaders} = useContext(AuthContext);
  const [title, setTitle] = useState(task.title);
  const [body, setBody] = useState(task.body);
  const [due, setDue] = useState(task.due);
  const [error, setError] = useState("");
  const elementId = !task.id ? "new-task" : task.id;
  const dialog = document.getElementById(elementId);

  const close = (mark) => {
    console.log("close", mark);
    dialog.close();
    setUpdated(mark);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let isValid = true;
    setError("");
    if (isBlank(title)) {
      setError("Titel mag niet leeg zijn");
      isValid = false;
    }
    if (isBlank(body)) {
      setError("Tekst mag niet leeg zijn");
      isValid = false;
    }
    if (isBlank(due)) {
      setError("Deadline mag niet leeg zijn");
      isValid = false;
    }
    if (isValid) {
      let when = due.replace(' ', 'T');
      if (when.length === 16) {
        when = when + ":00";
      }
      console.log("handleSubmit", when);
      if (!task.id) {
        axios.post(`${cfg.backend}/api/tasks`, { title: title, body: body, due: when}, requestHeaders())
          .catch(error => setError(`Kon de nieuwe taak niet opslaan (${error})`));
      } else {
        axios.put(`${cfg.backend}/api/tasks`, {id: task.id, title: title, body: body, due: when}, requestHeaders())
          .catch(error => setError(`Kon de taak niet wijzigen (${error})`));
      }
      close(true);
    }
  }

  return (
    <dialog id={!task.id ? "new-task" : task.id}>
      <h2>{!task.id ? "Nieuwe" : "Wijzig"} Taak</h2>
      <form method="dialog" onSubmit={handleSubmit} onReset={() => console.log("reset!")}>
        <Input label="Titel" name="title" type="text" handler={(e) => setTitle(e.target.value)}>{title}</Input>
        <Input label="Deadline" name="due" type="datetime-local" handler={(e) => setDue(e.target.value)}>{due}</Input>
        <InputArea label="Tekst" name="body" handler={(e) => setBody(e.target.value)} rows="11" value={body}></InputArea>
        <Submit />
        <button type="reset" onClick={() => close(false)}>Laat maar</button>
      </form>
      {error && <p className="error">{error}</p>}
    </dialog>
  )
}
