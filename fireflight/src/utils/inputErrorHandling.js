const errorHandling = data => {
  const { username, password, passwordConf } = data;

  let error = {
    status: false,
    text: ""
  };

  if (username.length < 5) {
    error.status = true;
    error.text = "Username should be at least 6 characters long";
  } else if (password.length < 7) {
    error.status = true;
    error.text = "Password must be at least 8 characters long";
  } else if (password !== passwordConf) {
    error.status = true;
    error.text = "Password must match";
  }

  return error;
};

export default errorHandling;
