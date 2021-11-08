import React, { useState } from 'react';

const Person = ({ info }) => <p>{info.name} - {info.number}</p>

const People = ({ persons }) => {
  return (
    <>
      {
        persons.map(person => <Person key={person.number} info={person} />)
      }
    </>
  );
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ search, setSearch ] = useState("");

  const searchResult = (personArray, searchTerm) => {
    searchTerm = searchTerm.toLowerCase();
    return personArray.filter(person => {
      return (person.name.toLowerCase().includes(searchTerm) || person.number.includes(searchTerm));
    });
  }; 

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearch = (event) => {
    setSearch(event.target.value);
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
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Search: <input onChange={handleSearch} value={search}/>
      </div>
      <h2>Add person or edit number</h2>
      <form onSubmit={addPerson}>
        <div>
          Name: <input onChange={handleNameInput} value={newName}/>
          Number: <input onChange={handleNumberInput} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add / edit</button>
        </div>
      </form>
      <h2>People</h2>
      <People persons={searchResult(persons, search)} />
    </div>
  );
};

export default App;