import axios from 'axios'
import { base_url_local } from '../config/vars'

const axiosWithAuth = () => {
  const token = localStorage.getItem('token')

  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    baseURL: process.env.REACT_APP_ENV || base_url_local
  })
}

export default axiosWithAuth
