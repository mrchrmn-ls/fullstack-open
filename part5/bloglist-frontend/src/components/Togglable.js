import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = React.forwardRef(function (props, ref) {
  const [ visible, setVisible ] = useState(false);

  function toggleVisibility() {
    setVisible(!visible);
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <>
      <div style={{ display: visible ? "none" : "" }}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={{ display: visible ? "" : "none" }}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </>
  );
});

Togglable.displayName = "Toggable";

Togglable.propTypes = {
  buttonLable: PropTypes.string.isRequired
};

export default Togglable;