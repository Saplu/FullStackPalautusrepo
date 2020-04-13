import React from 'react'
import Person from './Person'

const Persons = ({persons, filterString, deletePerson}) => {
    const personsToShow = persons.filter(p => p.name.toLowerCase().includes(filterString.toLowerCase()))
    return(
        <div>
            {personsToShow.map(p=> <Person key={p.name} name={p.name} number={p.number} deletePerson={() => deletePerson(p.id, p.name)}/>)}
        </div>
    )
}

export default Persons