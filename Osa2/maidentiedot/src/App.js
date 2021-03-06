import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data)
    })
  }, [])
  console.log(countries)

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const ShowSingle = (name) => {
    console.log(`Only ${name} to be shown`)
    setFilter(name)
  }

  return (
    <div>
      <form>
        Find countries: <input
        value={filter}
        onChange={handleFilterChange}/>
      </form>
      <Countries countries={countries} filterString={filter} showSingle={ShowSingle}/>
    </div>
  );
}

export default App;
