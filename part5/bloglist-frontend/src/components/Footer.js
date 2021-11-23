import React from "react";

function Footer() {
  const footerStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16
  };

  return (
    <div style={footerStyle}>
      <br />
      <em>Bloglist app, Department of Computer Science, University of Helsinki</em>
    </div>
  );
}

export default Footer;