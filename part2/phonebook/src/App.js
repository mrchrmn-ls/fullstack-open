import React, { useEffect, useState } from 'react';
import "./index.css"

import personServices from "./services/persons";

import Search from "./components/Search";
import PersonForm from "./components/PersonForm";
import People from "./components/People";
import Notification from './components/Notification';


function App() {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ search, setSearch ] = useState("");
  const [ message, setMessage ] = useState({text: null, type: "success"});

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
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Search state={{search, setSearch}}/>
      <h2>Add person or edit number</h2>
      <PersonForm state={{newName, setNewName, newNumber, setNewNumber, persons, setPersons, setMessage}}/>
      <h2>People</h2>
      <People foundPersons={searchResult(persons, search)} allPersons={persons} setPersons={setPersons} setMessage={setMessage} />
    </div>
  );
};

export default App;