import React, { useState, useImperativeHandle } from "react";

const Toggleable = React.forwardRef(function (props, ref) {
  const [ visible, setVisible ] = useState(false);

  function toggleVisibility() {
    setVisible(!visible);
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  });

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
});

export default Toggleable;