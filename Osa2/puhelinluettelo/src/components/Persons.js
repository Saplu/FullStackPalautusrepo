import React from 'react'
import Person from './Person'

const Persons = ({persons, filterString}) => {
    const personsToShow = persons.filter(p => p.name.toLowerCase().includes(filterString.toLowerCase()))
    return(
        <div>
            {personsToShow.map(p=> <Person key={p.name} name={p.name} number={p.number}/>)}
        </div>
    )
}

export default Persons