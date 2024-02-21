import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import cfg from '../config.json';
import {AuthContext} from '../context/AuthContext.jsx';
import {Clicker} from '../components/Button.jsx';
import {TaskDialog} from '../components/TaskDialog.jsx';
import {urlBuilder} from '../helpers/UrlBuilder.js';

export const Taken = () => {
  const {requestHeaders} = useContext(AuthContext);
  const states = [
    {id: "TODO", name: "Te Doen"},
    {id: "DOING", name: "Mee Bezig"},
    {id: "REVIEW", name: "Ter Beoordeling"},
    {id: "DONE", name: "Klaar"}
  ];
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");
  const [updated, setUpdated] = useState(false);

  const showDialog = (elementId) => document.getElementById(elementId).showModal();

  const dragStart = event => {
    if (event.target.className.includes("card")) event.target.classList.add("dragging")
  }

  const dragEnd = event => {
    if (event.target.className.includes("card")) event.target.classList.remove("dragging")
  }

  const dragEnter = event => {
    event.currentTarget.classList.add("drop")
  }

  const dragLeave = event => {
    event.currentTarget.classList.remove("drop")
  }

  const drag = event => {
    event.dataTransfer.setData("text/plain", event.currentTarget.dataset.id)
  }

  const drop = event => {
    const column = event.currentTarget.dataset.column
    const id = event.dataTransfer.getData("text/plain")

    event.currentTarget.classList.remove("drop")
    event.preventDefault()

    setError("");
    const updatedState = cards.map(card => {
      if (card.id === id) {
        card.status = column
        axios.put(urlBuilder("/api/tasks"), { id: card.id, status: card.status }, requestHeaders())
        .catch(error => setError(`Kon de status van de Taak ${id} niet wijzigen (${error})`));
      }
      return card;
    });
    setCards(updatedState);
  }

  const allowDrop = event => event.preventDefault();

  const remove = (id) => {
    if (confirm("Weet je zeker dat je de taak wil verwijderen?")) {
      axios.delete(urlBuilder(`/api/tasks/${id}`), requestHeaders())
      .then(() => setUpdated(true))
      .catch(error => setError(`Kon de taak niet verwijderen (${error})`));
    }
  }

  useEffect(() => {
    document.addEventListener("dragstart", dragStart)
    document.addEventListener("dragend", dragEnd)

    axios.get(urlBuilder("/api/users/tasks"), requestHeaders())
      .then(result => setCards(result.data))
      .catch(error => setError(`Ophalen van Taken is niet gelukt (${error})`));

    return () => {
      document.removeEventListener("dragstart", dragStart);
      document.removeEventListener("dragend", dragEnd);
      setUpdated(false);
    }
  }, [updated])

  return (
    <>
      <section className="board">
        {states.map(state =>
          <div key={state.id}
               className={`column column-${state.id}`}
               data-column={state.id}
               onDrop={drop}
               onDragOver={allowDrop}
               onDragEnter={dragEnter}
               onDragLeave={dragLeave}>
            <h2>{state.name}</h2>
            {cards.filter(card => card.status === state.id).map(card =>
              <article key={card.id} className={"card"} draggable={"true"} onDragStart={drag} data-id={card.id}>
                <TaskDialog task={card} setUpdated={setUpdated} />
                <h3>{card.title}</h3>
                <p>
                  <button onClick={() => showDialog(card.id)} className="edit-button" title="Taak wijzigen">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button onClick={() => remove(card.id)} className="remove-button" title="Taak verwijderen">
                    <i className="fas fa-dumpster-fire"></i>
                  </button>
                </p>
                <p><i>{card.due.substring(0, 16)}</i></p>
                <p className="p_wrap">{card.body}</p>
              </article>)
            }
            {(state.id === "TODO") ?
              <span>
                <TaskDialog task={{title: '', body: '', due: ''}} setUpdated={setUpdated} />
                <Clicker handler={() => showDialog("new-task")} className="new-button">
                  <i className="fas fa-plus"></i> Nieuwe Taak
                </Clicker>
              </span>
              :
              <></>
            }
      </div>
      )}
    </section>
    {error && <section><p className="error">{error}</p></section>}
    </>
  )
}
