import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Note from "./Note";


describe("<Note />", () => {
  let component;
  let mockHandler;

  beforeEach(() => {
    const note = {
      content: "Component testing is done with react-testing-library.",
      important: true
    };

    mockHandler = jest.fn();

    component = render(
      <Note note={note} toggleImportance={mockHandler} />
    );
  });


  test("renders content", () => {
    const li = component.container.querySelector(".note");
    console.log(prettyDOM(li));

    expect(li).toHaveTextContent(
      "Component testing is done with react-testing-library."
    );
  });


  test("clicking the button calls event handler once", () => {
    const button = component.container.querySelector("button");
    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
  });

});