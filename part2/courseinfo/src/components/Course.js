import React from "react";

const Course = ({ course }) => (
  <div>
    <Header course={course.name}/>
    <Parts parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ info }) => <p>{info.name} {info.exercises}</p>;

const Parts = ({ parts }) => {
  return (
    <div>
      {
        parts.map(part => <Part key={part.id} info={part} />)
      }
    </div>
  );
};

const Total = ({ parts }) => {
  return (
    <p><em>Number of exercises {
      parts.reduce((acc, element) => acc + element.exercises, 0)
    }</em></p>
  );
};

export default Course;