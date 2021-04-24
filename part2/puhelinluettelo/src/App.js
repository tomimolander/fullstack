import React, { useState } from 'react'
import {Filter, PersonForm, Persons} from './components/Phonebook'



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(item => item.name === newName)){
      window.alert(`${newName} is already added to phonebook`);
      return
    }
  
    setPersons(persons.concat(noteObject))
    setNewName('')
    setNewNumber('')
  }
  
  let filteredContacts = ( newSearch === '' ? persons : persons.filter(function(person){
    return person.name.toLowerCase().includes(newSearch.toLowerCase())
  }))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newSearch} onChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm 
        onSubmit={addNote}
        valueName={newName}
        onChangeName={handleNoteChange}
        valueNumber={newNumber}
        onChangeNumber={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredContacts}/>
    </div>
  )

}

export default App