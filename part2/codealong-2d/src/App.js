import React, { useEffect, useState } from 'react';

import Note from "./components/Note";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

import noteService from "./services/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);


  useEffect(() => {
    noteService
      .getAll()
      .then(resNotes => {
        setNotes(resNotes);
      }) 
    }, []);


  function addNote(event) {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random < 0.5
    };

    noteService
      .create(noteObject)
      .then(resNote => {
        setNotes(notes.concat(resNote));
        setNewNote("");    
      });
  }


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
        setNotes(notes.filter(n => n.id !== id));
      });
  }


  function handleNoteChange(event) {
    setNewNote(event.target.value);
  }


  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
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
      <form onSubmit={addNote}>
        <input value={newNote}
               onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
}

export default App;