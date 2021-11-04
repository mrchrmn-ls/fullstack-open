import React from "react";

const Hello = ({ name, age }) => {
  function bornYear() {
    return new Date().getFullYear() - age;
  }

  return (
    <>
      <p>
        Hello, {name}, you look like you're {age} years old!
      </p>
      <p>
        So were you born in {bornYear()}?
      </p>
    </>
  );
};

const App = () => {
  const name = "Marc";
  const age = 10;

  return (
    <>
      <h1>Greetings!</h1>
      <Hello name="Urte" age={48} />
      <Hello name={name} age={age} />
    </>
  );
};

export default App;
