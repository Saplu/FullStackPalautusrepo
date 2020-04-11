import React from 'react'
import Country from './Country'
import ShowButton from './ShowButton'

const Countries = ({countries, filterString, showSingle}) => {
    const filteredCountries = countries.filter(c => c.name.toLowerCase().includes(filterString.toLowerCase()))
    let value = ''
    if (filteredCountries.length > 1 && filteredCountries.length <= 10){
        value = filteredCountries.map(f => <p key={f.name}>{f.name}
            <ShowButton name={f.name} showSingle={() => showSingle(f.name)}/></p>)
    }
    else if (filteredCountries.length > 10)
        value = 'Too many matches, specify another filter'
    else if (filteredCountries.length === 0)
        value = 'No matches found, specify another filter'
    else if (filteredCountries.length === 1)
        value = <Country country={filteredCountries[0]}/>
    console.log(value)
    return value
}

export default Countries