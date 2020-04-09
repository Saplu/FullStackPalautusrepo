import React from 'react'
import Country from './Country'

const Countries = ({countries, filterString}) => {
    const filteredCountries = countries.filter(c => c.name.toLowerCase().includes(filterString.toLowerCase()))
    let value = ''
    if (filteredCountries.length > 1 && filteredCountries.length <= 10)
        value = filteredCountries.map(f => <p key={f.name}>{f.name}</p>)
    else if (filteredCountries.length > 10)
        value = 'Too many matches, specify another filter'
    else if (filteredCountries.length === 0)
        value = 'No matches found, specify another filter'
    else if (filteredCountries.length === 1)
        value = <Country country={filteredCountries[0]}/>
    return value
}

export default Countries