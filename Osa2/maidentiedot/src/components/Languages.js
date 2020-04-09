import React from 'react'

const Languages = ({country}) => {
    return(
        <ul>
            {country.languages.map(cl => <li key={cl.name}>{cl.name}</li>)}
        </ul>
    )
}

export default Languages