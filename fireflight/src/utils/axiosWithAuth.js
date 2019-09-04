import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  const deployedURL = "https://fireflight-lambda.herokuapp.com/api/";
  const localURL = "http://localhost:5000/api/";

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
