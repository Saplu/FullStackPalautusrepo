import React, {useState, useEffect} from 'react';
import PersonChecker from './components/PersonChecker'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/notification'

const App = () => {
    const [ persons, setPersons] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [noteMessage, setNoteMessage] = useState(null)
    const [noteType, setNoteType] = useState('success')

    useEffect(() => {
      personService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        console.log(newName)
        const persObject = {
          name: newName,
          number: newNumber
        }
        if(PersonChecker({persons, newName}))
          update()
        else{

        personService
          .create(persObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setNoteType('error')
            setNoteMessage(error.response.data.error)
            setTimeout(() => {
              setNoteMessage(null)
              setNoteType('success')
            }, 5000)
          })
          setNoteMessage(
            `${persObject.name} added to phonebook.`
          )
          setTimeout(() => {
            setNoteMessage(null)
          }, 5000)
        }
    }

    const deletePerson = (id, name) => {
      if (window.confirm(`Really want to delete ${name}? :(`)){
        personService
        .deletePerson(id)
        setPersons(persons.filter(p => p.id !== id))
        setNoteMessage(
          `${name} succesfully and permanently deleted.`
        )
        setTimeout(() => {
          setNoteMessage(null)
        }, 5000)
      }
    }

    const update = () => {
      if (window.confirm(`${newName} already exists. Want to replace the old number?`)){
        const person = persons.find(p => p.name === newName)
        const changedPerson = {...person, number: newNumber}
          personService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== changedPerson.id ? p : returnedPerson))
          })
          .catch(error => {
            setNoteType('error')
            setNoteMessage(`${newName} has already been deleted from the server.`)
            setTimeout(() => {
              setNoteMessage(null)
              setNoteType('success')
            }, 5000)
            setPersons(persons.filter(p => p.id !== person.id))
          })
          setNoteMessage(
            `Number of ${newName} updated.`
          )
          setTimeout(() => {
            setNoteMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
      }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
      setFilter(event.target.value)
    }
  
    return (
      <div>
        <h2>Phonebook</h2>
        <Notification message={noteMessage} type={noteType}/>
        <form>
          <div>
            filter with: <input
            value={filter}
            onChange={handleFilterChange}/>
          </div>
        </form>
        <h2>Add a new person</h2>
        <form onSubmit={addPerson}>
          <div>
            name: <input 
            value={newName}
            onChange={handleNameChange}/>
          </div>
          <div>
            number: <input
            value={newNumber}
            onChange={handleNumberChange}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        <Persons persons={persons} filterString={filter} deletePerson={deletePerson}/>
      </div>
    )
  }

export default App;