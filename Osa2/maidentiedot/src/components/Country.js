import React from 'react'
import Languages from './Languages'

const Country = ({country}) => {

    return(
        <div>
            <h2>{country.name}</h2>
            <p>Capital {country.capital}</p>
            <p>Population {country.population}</p>
            <h3>Languages</h3>
            <Languages country={country}/>
            <img src={country.flag} alt='flag' width='300' heigth ='200'/>
        </div>
    )
}

export default Country