import React from "react";

import personServices from "../services/persons";

const Person = ({ info, deletePerson }) => {
  return (
    <p>
      {info.name} - {info.number} - 
      <button onClick={deletePerson} value={info.id}>delete</button>
    </p>
  )
}

const People = ({ foundPersons, allPersons, setPersons }) => {
  function deletePerson(event) {
    let id = Number(event.target.value);
    let person = allPersons.find(person => person.id === id);

    if (window.confirm(`Delete ${person.name} from phonebook?`)) {
      personServices
        .remove(id)
        .then(() => {
          setPersons(allPersons.filter(person => person.id !== id));
        });
    }
  }

  if (foundPersons.length > 0) {
    return (
      <>
        {
          foundPersons.map(person => <Person key={person.id} info={person} deletePerson={deletePerson} />)
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