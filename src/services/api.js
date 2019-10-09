import axios from 'axios'

const api = axios.create({
  baseURL: 'http://10.50.64.215:3000'
})

export default api