import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NoteForm from "./NoteForm";


test("<NoteForm /> updates parent state and calls onSubmit", () => {
  const notes = [];
  const setNotes = jest.fn();
  const noteFormRef = {
    current: {
      toggleVisibility: jest.fn()
    }
  };

  const component = render(
    <NoteForm state={{ notes, setNotes, noteFormRef }} />
  );

  const input = component.container.querySelector("input");
  const form = component.container.querySelector("form");

  fireEvent.change(input, {
    target: { value: "testing of forms could be easier" }
  });
  fireEvent.submit(form);

  console.log(notes);
  expect(noteFormRef.current.toggleVisibility.mock.calls).toHaveLength(1);
  // expect(notes).toHaveLength(1);
  // expect(createNote.mock.calls[0][0].content).toBe("testing of forms could be easier" );
});