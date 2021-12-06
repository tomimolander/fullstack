import React, { useState, useEffect } from 'react'
import {Filter, PersonForm, Persons, Notification, ErrorMessage} from './components/Phonebook'
import personService from './services/persons'


const App = () => {

  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [interactionMessage, setInteractionMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const updateID = persons.find(person => person.name === newName).id
        personService
          .update(updateID, noteObject)
          .then(response => {
            setPersons(persons.map(person => person.id !== updateID ? person : response.data))
            setInteractionMessage(
              `Updated ${response.data.name}'s phone number`
            )
            setTimeout(() => {
              setInteractionMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `Information of ${newName} has already been removed from server`
            )
            setPersons(persons.filter(person => person.id !== updateID))
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
      return
    }
    personService
      .create(noteObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setInteractionMessage(
          `Added ${response.data.name}`
        )
        setTimeout(() => {
          setInteractionMessage(null)
        }, 5000)
      })
    setNewName('')
    setNewNumber('')
  }
  
  const removeNote = (name) => {
    const removeID = persons.find(person => person.name === name).id
    personService
      .remove(removeID)
      .then(response => {
        setPersons(persons.filter(person => person.id !== removeID))
        setInteractionMessage(
          `Removed ${name}`
        )
        setTimeout(() => {
          setInteractionMessage(null)
        }, 5000)
      })
  }

  let filteredContacts = ( newSearch === '' ? persons : persons.filter(function(person){
    return person.name.toLowerCase().includes(newSearch.toLowerCase())
  }))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={interactionMessage} />
      <ErrorMessage message={errorMessage} />
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
      <Persons 
        persons={filteredContacts}
        onButtonClick={removeNote}
      />
    </div>
  )

}

export default App