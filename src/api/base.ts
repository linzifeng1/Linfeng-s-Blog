import axios from 'axios'
const service = axios.create({
    baseURL: 'http://127.0.0.1:4523',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
})

export default service