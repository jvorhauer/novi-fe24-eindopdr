import {useContext, useState} from 'react';
import {AuthContext} from '../context/AuthContext.jsx';
import {Input, InputArea} from './Input.jsx';
import {ResetButton, SaveButton} from './Button.jsx';
import axios from 'axios';
import {urlBuilder} from '../helpers/UrlBuilder.js';

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
    let when = due.replace(' ', 'T');
    if (when.length === 16) {
      when = when + ":00";
    }
    if (!task.id) {
      axios.post(urlBuilder("/api/tasks"), { title: title, body: body, due: when }, requestHeaders())
        .catch(error => setError(`Kon de nieuwe taak niet opslaan (${error})`));
    } else {
      axios.put(urlBuilder("/api/tasks"), { id: task.id, title: title, body: body, due: when }, requestHeaders())
        .catch(error => setError(`Kon de taak niet wijzigen (${error})`));
    }
    close(true);
  }

  return (
    <dialog id={!task.id ? "new-task" : task.id}>
      <h2>{!task.id ? "Nieuwe" : "Wijzig"} Taak</h2>
      <form method="dialog" onSubmit={handleSubmit} onReset={() => close(false)}>
        <Input label="Titel" name="title" type="text" handler={(e) => setTitle(e.target.value)}>{title}</Input>
        <Input label="Deadline" name="due" type="datetime-local" handler={(e) => setDue(e.target.value)}>{due}</Input>
        <InputArea label="Tekst" name="body" handler={(e) => setBody(e.target.value)} rows="19" value={body}></InputArea>
        <div className="form-row">
          <ResetButton />
          <SaveButton />
        </div>
      </form>
      {error && <p className="error">{error}</p>}
    </dialog>
  )
}
