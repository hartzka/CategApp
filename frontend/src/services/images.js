import axios from 'axios'
const baseUrl = '/image'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(`${baseUrl}/uploadmulter`, newObject, config)
  console.log(response.data)
  return response.data
}

export default { getAll, create, setToken }