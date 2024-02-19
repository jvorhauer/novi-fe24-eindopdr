import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthContext.jsx';
import axios from 'axios';
import cfg from '../config.json';
import {useNavigate} from 'react-router-dom';

export const Taken = () => {
  const token = localStorage.getItem( 'token' );
  const states = [
    {id: "TODO", name: "Te Doen"},
    {id: "DOING", name: "Mee Bezig"},
    {id: "REVIEW", name: "Ter Beoordeling"},
    {id: "DONE", name: "Klaar"}
  ];
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");
  const { isAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const headrs = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  if (!isAuth) {
    navigate("/login");
  }

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
        axios.put(`${cfg.backend}/api/tasks`, { id: card.id, status: column }, headrs)
        .catch(error => {
          console.log(error)
          setError(`Kon de status van de Taak ${id} niet wijzigen (${error})`)
        })
      }
      return card
    })
    setCards(updatedState)
  }

  const allowDrop = event => {
    event.preventDefault()
  }

  useEffect(() => {
    document.addEventListener("dragstart", dragStart)
    document.addEventListener("dragend", dragEnd)

    axios.get(`${cfg.backend}/api/users/tasks`, headrs)
      .then(result => setCards(result.data))
      .catch(error => {
        console.error(error);
        setError(`Ophalen van Taken is niet gelukt (${error})`)
      });

    return () => {
      document.removeEventListener("dragstart", dragStart)
      document.removeEventListener("dragend", dragEnd)
    }
  }, [])

  return (
    <>
      <section className="board">
        {states.map(state => (
            <div key={state.id}
                 className={`column column-${state.id}`}
                 data-column={state.id}
                 onDrop={drop}
                 onDragOver={allowDrop}
                 onDragEnter={dragEnter}
                 onDragLeave={dragLeave}>
              <h2>{state.name}</h2>
              {cards.filter(card => card.status === state.id).map(card => (
                <article key={card.id} className={"card"} draggable={"true"} onDragStart={drag} data-id={card.id}>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                  <p>{card.due}</p>
                </article>
              ))}
            </div>
          )
        )}
      </section>
      {error &&
        <section>
          <p>{error}</p>
        </section>
      }
    </>
  )
}
