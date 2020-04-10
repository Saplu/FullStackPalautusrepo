import React from 'react'

const ShowButton = ({name}) => {
    console.log(name)
    return(
        <button onClick={(event) => changeFilter({name, event})}>
            Show
        </button>
    )
}

const changeFilter = ({name, event}) => {
    console.log(name)
    return(
        name
    )
}

export default ShowButton