import React, { useState } from "react";

const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const [ counter, setCounter ] = useState(0);

  function increaseByOne() {
    setCounter(counter + 1);
  }

  function setBeast() {
    setCounter(666);
  }

  return (
    <div>
      <Display counter={counter} />
      <Button onClick={increaseByOne} text="Plus" />
      <Button onClick={setBeast} text="Beast" />
    </div>
  );
};

export default App;
