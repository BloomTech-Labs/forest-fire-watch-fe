import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  const deployedURL = "https://fireflight-lambda.herokuapp.com/api/";
  const localURL = "http://localhost:5000/api/";

  console.log(process.env.NODE_ENV);

  return axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    baseURL: deployedURL //replace with heroku address,
  });
};

export default axiosWithAuth;
