import React from 'react'

const Person = ({name, number, deletePerson}) => {
    return(
        <div>
            <h4>{name} {number} <button onClick={deletePerson}>delete</button></h4>
        </div>
    )
}

export default Person