import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  const users = response.data
  return response.data
}

const add = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

export default { getAll, add }