import React from "react";

const App = () => {
  let now = new Date();
  let a = 10;
  let b= 20;

  return (
    <div>
      <p>Hello world, it is {now.toLocaleString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
    </div>
  )
};

export default App;
