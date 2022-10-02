import axios from 'axios'
const baseUrl = '/api/image'

let token = null
let config = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  config = {
    headers: { Authorization: token },
  }
}

const getAll = () => {
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const getImage = (id) => {
  const request = axios.get(`baseUrl/${id}`, config)
  return request.then(response => response.data)
}

const create = async newObject => {
  const response = await axios.post(`${baseUrl}/uploadmulter`, newObject, config)
  return response.data
}

export default { getAll, getImage, create, setToken }