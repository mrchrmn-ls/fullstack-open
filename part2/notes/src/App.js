import React, { useEffect, useState } from 'react';

import Note from "./components/Note";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm"

import noteService from "./services/notes";

function App() {
  const [ notes, setNotes ] = useState([]);
  const [ newNote, setNewNote ] = useState("");
  const [ showAll, setShowAll ] = useState(true);
  const [ errorMessage, setErrorMessage ] = useState(null);
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ user, setUser ] = useState(null);
  const [ loginVisible, setLoginVisible ] = useState(false);


  useEffect(() => {
    noteService
      .getAll()
      .then(resNotes => {
        setNotes(resNotes);
      }) 
    }, []);


  useEffect(() => {
    const currentUserJSON = window.localStorage.getItem("currentNoteAppUser");
    if (currentUserJSON) {
      const user = JSON.parse(currentUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);


  function toggleImportanceOf(id) {
    const note = notes.find(note => note.id === id);
    const changedNote = { ...note, important: !note.important};

    noteService
      .update(id, changedNote)
      .then(resNote => {
        setNotes(notes.map(note => note.id !== id ? note : resNote));
      })
      .catch((error) => {
        setErrorMessage(`The note '${note.content}' was already deleted from server`);
        setTimeout(() => setErrorMessage(null), 5000);
        setNotes(notes.filter(note => note.id !== id));
      });
  }


  function logout() {
    window.localStorage.removeItem("currentNoteAppUser");
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important);


  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {
        user === null ?
        LoginForm({ setUser,
                    username,
                    setUsername,
                    password,
                    setPassword,
                    setErrorMessage,
                    loginVisible,
                    setLoginVisible }) :
        <div>
          <p>{user.name} is logged in. <a href="/" onClick={logout}>log out</a></p>
          {NoteForm({ notes,
                      setNotes,
                      newNote,
                      setNewNote })}
        </div>
      }

      <p>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </p>

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