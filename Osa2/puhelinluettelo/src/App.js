import React, {useState, useEffect} from 'react';
import axios from 'axios'
import PersonChecker from './components/PersonChecker'
import Persons from './components/Persons'

const App = () => {
    const [ persons, setPersons] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const  [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    useEffect(() => {
      axios.get('http://localhost:3001/persons').then(response => {
        setPersons(response.data)
      })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        console.log(newName)
        if(PersonChecker({persons, newName}))
            window.alert(`${newName} already exists, abort mission!`)
        else{
        const persObject = {
            name: newName,
            number: newNumber
        }
        axios.post('http://localhost:3001/persons', persObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
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
        <Persons persons={persons} filterString={filter}/>
      </div>
    )
  }

export default App;