import axios from "axios";
import { base_url_staging, base_url_local } from '../config/vars'

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  const deployedURL = base_url_staging;
  const localURL = base_url_local;

  let URL = process.env.NODE_ENV === "production" ? deployedURL : localURL;

  return axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    baseURL: URL //replace with heroku address,
  });
};

export default axiosWithAuth;
