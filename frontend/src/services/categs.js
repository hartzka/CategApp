import axios from 'axios'
const baseUrl = '/api/categ'

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

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

const deleteCateg = id => {
  return axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, update, setToken, deleteCateg }