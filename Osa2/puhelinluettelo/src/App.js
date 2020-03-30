import React, {useState} from 'react';

const App = () => {
    const [ persons, setPersons] = useState([
      { name: 'Arto Hellas' },
      { name : 'Pasi'}
    ]) 
    const [ newName, setNewName ] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        const persObject = {
            name: newName,
            id: newName
        }
        setPersons(persons.concat(persObject))
        setNewName('')
    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
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
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        {persons.map(p => <Person key={p.name} name={p.name}/>)}
      </div>
    )
  }

const Person = ({name}) => {
    return(
        <div>
            <h4>{name}</h4>
        </div>
    )
}  

export default App;