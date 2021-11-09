import React, { useEffect, useState } from 'react';

import personServices from "./services/persons";

import Search from "./components/Search";
import PersonForm from "./components/PersonForm";
import People from "./components/People";



const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ search, setSearch ] = useState("");

  useEffect(()=> {
    personServices
      .getAll()
      .then(resPersons => {
        setPersons(resPersons);
      });
  }, []);

  const searchResult = (personArray, searchTerm) => {
    searchTerm = searchTerm.toLowerCase();
    return personArray.filter(person => {
      return (person.name.toLowerCase().includes(searchTerm) || person.number?.includes(searchTerm));
    });
  }; 

  return (
    <div>
      <h2>Phonebook</h2>
      <Search state={{search, setSearch}}/>
      <h2>Add person or edit number</h2>
      <PersonForm state={{newName, setNewName, newNumber, setNewNumber, persons, setPersons}}/>
      <h2>People</h2>
      <People foundPersons={searchResult(persons, search)} allPersons={persons} setPersons={setPersons} />
    </div>
  );
};

export default App;