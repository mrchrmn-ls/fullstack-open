import React from "react";

import personServices from "../services/persons";

function Person({ info, deletePerson }) {
  return (
    <p>
      {info.name} - {info.number} -
      <button onClick={deletePerson} value={info.id}>delete</button>
    </p>
  );
}

function People({ foundPersons, allPersons, setPersons, setMessage }) {
  function deletePerson(event) {
    let id = Number(event.target.value);
    let person = allPersons.find(person => person.id === id);

    if (window.confirm(`Delete ${person.name} from phonebook?`)) {
      personServices
        .remove(id)
        .then(() => {
          setPersons(allPersons.filter(person => person.id !== id));
          setMessage({
            text: `Deleted ${person.name} from phonebook.`,
            type: "success"
          });
          setTimeout(() => setMessage({text: null}), 3000);
        });
    }
  }

  if (foundPersons.length > 0) {
    return (
      <>
        {foundPersons.map(person => <Person key={person.id} info={person} deletePerson={deletePerson} />)}
      </>
    );
  } else {
    return (
      <p>No name or number contains the search term.</p>
    );
  }
}

export default People;