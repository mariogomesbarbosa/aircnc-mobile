import axios from 'axios'

const api = axios.create({
  baseURL: 'http://100.72.23.243:3000'
})

export default api