import React from "react";

const Person = ({ info }) => <p>{info.name} - {info.number}</p>

const People = ({ persons }) => {
  if (persons.length > 0) {
    return (
      <>
        {
          persons.map(person => <Person key={person.number} info={person} />)
        }
      </>
    );  
  } else {
    return (
      <p>No name or number contains the search term.</p>
    )
  }
}

export default People;