import React from "react";
import noteService from "../services/notes";

function NoteForm(state) {
  function addNote(event) {
    event.preventDefault();

    const noteObject = {
      content: state.newNote,
      date: new Date().toISOString(),
      important: Math.random < 0.5
    };

    noteService
      .create(noteObject)
      .then(resNote => {
        state.setNotes(state.notes.concat(resNote));
        state.setNewNote("");    
      });
  }

  return (
    <form onSubmit={addNote}>
      <input value={state.newNote}
            onChange={({ target }) => state.setNewNote(target.value)}/>
      <button type="submit">save</button>
    </form>
  )
}

export default NoteForm;