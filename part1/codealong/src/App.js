import React, { useState } from "react";

const Counter = ({ counter }) => <p>{counter}</p>;

const Button = ({ onClick, text }) => <p><button onClick={onClick}>{text}</button></p>;

const History = ({ allClicks }) => {
  if (allClicks.length === 0) {
    return (
      <p>
        Please start pressing the buttons.
      </p>
    )
  }

  return (
    <p>
      Button press history: {allClicks.join("-")}
    </p>
  )
}

const App = () => {
  const [ left, setLeft ] = useState(0);
  const [ right, setRight ] = useState(0);
  const [ allClicks, setAll ] = useState([]);

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    setLeft(left + 1);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    setRight(right + 1);
  };

  return (
    <div>
      <Counter counter={left} />
      <Button onClick={handleLeftClick} text="Left" />
      <Counter counter={right} />
      <Button onClick={handleRightClick} text="Right" />
      <History allClicks={allClicks} />
    </div>
  );
};

export default App;