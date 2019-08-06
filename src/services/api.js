import { create } from 'apisauce'

const api = create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 50
})

export default api;