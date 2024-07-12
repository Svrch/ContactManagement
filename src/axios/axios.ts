import axios from 'axios'

export const defaultAxios = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/users',
})

defaultAxios.interceptors.response.use(
  (response) => response.data,
  async (error) => error,
)
export default defaultAxios
