import axios from 'axios'

const api = axios.create({
  baseURL: 'https://aircnc-back-end.herokuapp.com/'
})

export default api