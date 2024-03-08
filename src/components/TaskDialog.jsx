import {useContext, useState} from 'react';
import {AuthContext} from '../context/AuthContext.jsx';
import {Input, InputArea} from './input/Input.jsx';
import {ResetButton, SaveButton} from './buttons/Button.jsx';
import axios from 'axios';
import {urlBuilder} from '../helpers/UrlBuilder.js';
import {futureDateTime} from '../helpers/DateTimeHelper.js';
import TagDecoder from '../helpers/TagDecoder.js';

export const TaskDialog = ({ task, setUpdated }) => {
  const {requestHeaders} = useContext(AuthContext);
  const [title, setTitle] = useState(task.title);
  const [body, setBody] = useState(task.body);
  const [due, setDue] = useState(!task.due ? futureDateTime() : task.due);
  const [error, setError] = useState("");
  const elementId = !task.id ? "new-task" : task.id;
  const dialog = document.getElementById(elementId);

  const close = (mark) => {
    dialog.close();
    setUpdated(mark);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    let when = due.replace(' ', 'T');
    if (when.length === 16) when = when + ":00";
    if (new Date().getTime() > Date.parse(when)) {
      setError("deadline moet in de toekomst liggen");
    } else {
      if (!task.id) {
        axios.post(urlBuilder("/api/tasks"), {title: title, body: body, due: when}, requestHeaders())
          .then(() => close(true))
          .catch(err => setError(`Kon de nieuwe taak niet opslaan (${err.response.data})`));
      } else {
        axios.put(urlBuilder("/api/tasks"), {id: task.id, title: title, body: body, due: when}, requestHeaders())
          .then(() => close(true))
          .catch(err => setError(`Kon de taak niet wijzigen (${err.response.data})`));
      }
    }
  }

  return (
    <dialog id={!task.id ? "new-task" : task.id}>
      <h2>{!task.id ? "Nieuwe" : "Wijzig"} Taak</h2>
      <form method="dialog" onSubmit={handleSubmit} onReset={() => close(false)} className="login-form" >
        <Input label="Titel" name="title" type="text" handler={(e) => setTitle(e.target.value)}>{TagDecoder(title)}</Input>
        <Input label="Deadline" name="due" type="datetime-local" handler={(e) => setDue(e.target.value)}>{due}</Input>
        <InputArea label="Tekst" name="body" handler={(e) => setBody(e.target.value)} rows="19" value={TagDecoder(body)}></InputArea>
        <div className="form-row">
          <ResetButton />
          <SaveButton />
        </div>
      </form>
      {error && <p className="error">{error}</p>}
    </dialog>
  )
}
