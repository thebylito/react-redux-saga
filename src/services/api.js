import { create } from 'apisauce'

const api = create({
  baseURL: 'https://jsonplaceholder.typicode.com'
})

export default api;