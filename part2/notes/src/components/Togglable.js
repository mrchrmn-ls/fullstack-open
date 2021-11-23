import React, { useState } from "react";

function Toggleable(props) {
  const [ visible, setVisible ] = useState(false);

  function toggleVisibility() {
    setVisible(!visible);
  }

  return (
    <>
      <div style={{display: visible ? "none" : ""}}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={{display: visible ? "" : "none"}}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </>
  )
}

export default Toggleable;