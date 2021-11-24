import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Blog from "./Blog";

describe("<Blog />", () => {
  let component;

  beforeEach(() => {
    const blog = {
      title: "Testblog",
      author: "Testblog's author",
      likes: 9,
      url: "http://www.testblog.url",
      id: "12345",
      user: {
        name: "Marc Hermann",
        username: "marchermann",
        id: "abcdef"
      }
    };

    const state = {
      blogs: [],
      setBlogs: jest.fn(),
      user: {
        name: "Marc Hermann",
        username: "marchermann",
        id: "abcdef"
      }
    };

    component = render(
      <Blog key={blog.id} blog={blog} state={state} />
    );
  });

  test("renders title, author, hides details", () => {
    const titleAuthor = component.container.querySelector(".titleAuthor");
    expect(titleAuthor).toHaveTextContent("Testblog");

    const blogDetails = component.container.querySelector(".blogDetails");
    expect(blogDetails).toHaveStyle("display: none");
  });

});