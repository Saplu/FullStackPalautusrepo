import React, {useState} from 'react';

const App = () => {
    const [ persons, setPersons] = useState([
      { 
        name: 'Arto Hellas',
        number: '040-1234567' 
      },
      { 
        name : 'Pasi',
        number: '040-7654321'
      }
    ]) 
    const [ newName, setNewName ] = useState('')
    const  [newNumber, setNewNumber] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        if(checkIfNameExists())
            window.alert(`${newName} already exists, abort mission!`)
        else{
        const persObject = {
            name: newName,
            id: newName,
            number: newNumber
        }
        setPersons(persons.concat(persObject))
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

    const checkIfNameExists = () => {
        const names = persons.map(p => p.name)
        return(
            names.includes(newName)
        )
    }
  
    return (
      <div>
        <h2>Phonebook</h2>
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
        {persons.map(p => <Person key={p.name} name={p.name} number={p.number}/>)}
      </div>
    )
  }

const Person = ({name, number}) => {
    return(
        <div>
            <h4>{name} {number}</h4>
        </div>
    )
}  

export default App;