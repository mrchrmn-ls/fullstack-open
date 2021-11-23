import React, { useState } from "react";
import noteService from "../services/notes";

function NoteForm({ state }) {
  const { notes, setNotes, noteFormRef } = state;

  const [ newNote, setNewNote ] = useState("");

  function addNote(event) {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random < 0.5
    };

    noteFormRef.current.toggleVisibility();

    noteService
      .create(noteObject)
      .then(resNote => {
        setNotes(notes.concat(resNote));
        setNewNote("");    
      });
  }

  return (
    <form onSubmit={addNote}>
      <input value={newNote}
            onChange={({ target }) => setNewNote(target.value)}/>
      <button type="submit">save</button>
    </form>
  )
}

export default NoteForm;