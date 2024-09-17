import { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import Form from './components/Form'
import Phonebook from './components/Phonebook'
import axios from 'axios'
import contactService from './services/Contacts'

type PersonType = {
  id: number;
  content: string;
  number: string;
};

const App = () => {
  const [persons, setPersons] = useState<PersonType[]>([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    contactService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
    })
  }, [])
  
  const addPerson = (event: any) => {
    event.preventDefault()

    const existingContact = persons.find(person => person.content === newName)

    if (existingContact) {
      const confirmUpdate = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
      if (confirmUpdate) {
        const updatedNumber = {...existingContact, number: newNumber}
        contactService
          .update(updatedNumber.id, updatedNumber)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id !== returnedPerson.id ? person : returnedPerson
            ))
            setNewName('')
            setNewNumber('')
          })

      }
        
    } else {
        const personObject = {
        content: newName,
        number: newNumber,
    }

    contactService
      .create(personObject)
      .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
      })
  }
}

const handleRemove = (id: number | string) => {
  contactService
  .remove(id)
  .then(() => {
    setPersons(persons.filter(person => person.id !== id))
  })
}

const handlePersonChange = (event: any) => {
  setNewName(event.target.value)
}

const handleNumberChange = (event: any) => {
  setNewNumber(event.target.value)
}

const handleSearchChange = (event: any) => {
  setSearchQuery(event.target.value)
}

const filteredPersons = persons.filter((person) =>
  person.content?.toLowerCase().includes(searchQuery.toLowerCase())
)


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
      <h2>Add a new contact</h2>
      <Form newName={newName} newNumber={newNumber} handlePersonChange={handlePersonChange} handleNumberChange={handleNumberChange} handleSubmit={addPerson} />
      <h2>Numbers</h2>
      <Phonebook persons={filteredPersons} handleRemove={handleRemove} />
    </div>
  )
}

export default App