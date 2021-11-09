import React from "react";

import personServices from "../services/persons";

function PersonForm({ state }) {
  const { newName, setNewName, newNumber, setNewNumber, persons, setPersons, setMessage } = state;

  function handleNameInput(event) {
    setNewName(event.target.value);
  }

  function handleNumberInput(event) {
    setNewNumber(event.target.value);
  }

  function addPerson(event) {
    event.preventDefault();

    const personsCopy = persons.slice();
    const existing = personsCopy.find(person => person.name.toLowerCase() === newName.trim().toLowerCase());

    if (existing) {
      if (existing.number === newNumber.trim()) {
        alert(`There is already an entry for ${newName} with the same number.`);
        return null;

      } else {
        if (window.confirm(`There is already an entry for ${existing.name}. Update number?`)) {
          existing.number = newNumber.trim();
          personServices
            .update(existing.id, existing)
            .then(() => {
              setPersons(personsCopy);
              setMessage({
                text: `Updated ${existing.name}'s phone number.`,
                type: "success"
              });
              setTimeout(() => setMessage({text: null}), 3000);
            });
          return true;

        } else {
          return null;
        }
      }
    }

    const personObject = {
      name: newName.trim(),
      number: newNumber.trim()
    };

    personServices
      .create(personObject)
      .then(resPerson => {
        setPersons(persons.concat(resPerson));
        setNewName("");
        setNewNumber("");
        setMessage({
          text: `Added ${newName} to phonebook.`,
          type: "success"
        });
        setTimeout(() => setMessage({text: null}), 3000);
      });
  }

  return (
    <form onSubmit={addPerson}>
      <div>
        Name: <input onChange={handleNameInput} value={newName} />
        Number: <input onChange={handleNumberInput} value={newNumber} />
      </div>
      <div>
        <button type="submit">add / edit</button>
      </div>
    </form>
  );
}

export default PersonForm;