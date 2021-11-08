import React from "react";

const PersonForm = ({ state }) => {
  const { newName, setNewName, newNumber, setNewNumber, persons, setPersons } = state;
  const handleNameInput = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();

    const personsCopy = persons.slice();
    const existing = personsCopy.filter(person => person.name.toLowerCase() === newName.trim().toLowerCase());

    if (existing.length > 0) {
      if (existing[0].number === newNumber.trim()) {
        alert(`There is already an entry for ${newName} with the same number.`);
        return null;
      } else {
        if (window.confirm(`There is already an entry for ${existing[0].name}. Update number?`)) {
          existing[0].number = newNumber.trim();
          setPersons(personsCopy);
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

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  }

  return (
    <form onSubmit={addPerson}>
      <div>
        Name: <input onChange={handleNameInput} value={newName}/>
        Number: <input onChange={handleNumberInput} value={newNumber}/>
      </div>
      <div>
        <button type="submit">add / edit</button>
      </div>
    </form>
  )
}

export default PersonForm;