import React, { useEffect, useState } from 'react';

import Note from "./components/Note";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm"

import noteService from "./services/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);


  useEffect(() => {
    noteService
      .getAll()
      .then(resNotes => {
        setNotes(resNotes);
      }) 
    }, []);


  function toggleImportanceOf(id) {
    const note = notes.find(note => note.id === id);
    const changedNote = { ...note, important: !note.important};

    noteService
      .update(id, changedNote)
      .then(resNote => {
        setNotes(notes.map(note => note.id !== id ? note : resNote));
      })
      .catch(error => {
        setErrorMessage(`The note '${note.content}' was already deleted from server`);
        setTimeout(() => setErrorMessage(null), 5000);
        setNotes(notes.filter(note => note.id !== id));
      });
  }


  const notesToShow = showAll ? notes : notes.filter(note => note.important);


  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {
        user === null ?
        LoginForm({ username,
                    password,
                    setUsername,
                    setPassword,
                    setUser,
                    setErrorMessage }) :
        <div>
          <p>{user.name} is logged in.</p>
          {NoteForm({ notes,
                      setNotes,
                      newNote,
                      setNewNote })}
        </div>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>

      <ul>
        {notesToShow.map(note => 
          <Note key={note.id}
                note={note} 
                toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>

      <Footer />
    </div>
  );
}

export default App;