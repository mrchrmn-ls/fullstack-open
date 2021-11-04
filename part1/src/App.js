import React from "react";

const Hello = (props) => {
  return (
    <>
      <p>Hello, {props.name}, you look like you're {props.age} years old!</p>
    </>
  )
}

const App = () => {
  let now = new Date();
  let a = 10;
  let b= 20;

  return (
    <>
      <h1>
        <Hello name="Marc" age={a + b}/>
        <Hello name="Urte" age="10"/>
      </h1>
      <p>Hello world, it is {now.toLocaleString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
    </>
  )
};

export default App;
