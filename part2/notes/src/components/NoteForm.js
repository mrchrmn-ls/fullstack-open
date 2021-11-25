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
      important: false
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
    <div className="formDiv">
      <h2>Add new note</h2>
      <form onSubmit={addNote}>
        <input id="newNoteInput"
               value={newNote}
               onChange={({ target }) => setNewNote(target.value)}/>
        <button type="submit">save</button>
      </form>
    </div>
  );
}

export default NoteForm;