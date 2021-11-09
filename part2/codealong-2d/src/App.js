import React, { useEffect, useState } from 'react';
import axios from "axios";
import Note from "./components/Note";


function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/notes")
      .then(res => {
        setNotes(res.data);
      }) 
    }, []);

  function addNote(event) {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random < 0.5
    };

    axios
      .post("http://localhost:3001/notes", noteObject)
      .then(res => {
        setNotes(notes.concat(res.data));
        setNewNote("");    
      });
  }

  function toggleImportanceOf(id) {
    const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find(note => note.id === id);
    const changedNote = { ...note, important: !note.important};

    axios
      .put(url, changedNote)
      .then(res => {
        setNotes(notes.map(note => note.id !== id ? note : res.data));
      });
  }

  function handleNoteChange(event) {
    setNewNote(event.target.value);
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  return (
    <div>
      <h1>Notes</h1>
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
    </div>
  );
}

export default App;