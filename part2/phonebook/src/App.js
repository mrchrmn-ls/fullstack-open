import React, { useState } from 'react';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [ newName, setNewName ] = useState('');

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName
    };

    setPersons(persons.concat(personObject));
    setNewName("");
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Name: <input onChange={handleNameInput} value={newName}/>
        </div>
        <div>
          <button type="submit" onSubmit={addPerson}>add</button>
        </div>
      </form>
      <h2>People</h2>
      {
        persons.map(person => <p key={person.name}>{person.name}</p>)
      }
    </div>
  );
};

export default App;