import axios from "axios";
import {
  base_url_staging,
  base_url_local,
  base_url_production
} from "../config/vars";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  // const deployedStagingURL = base_url_staging;
  // const deployedProductionURL = base_url_production;
  const localURL = base_url_local;

  // let URL;

  // if (process.env.REACT_APP_ENV === deployedProductionURL) {
  //   URL = deployedProductionURL;
  // } else if (process.env.REACT_APP_ENV === deployedStagingURL) {
  //   URL = deployedStagingURL;
  // } else {
  //   URL = localURL;
  // }

  // let URL = process.env.NODE_ENV === "production" ? deployedStagingURL : localURL;

  return axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    baseURL: process.env.REACT_APP_ENV || localURL  //replace with heroku address,
  });
};

export default axiosWithAuth;
