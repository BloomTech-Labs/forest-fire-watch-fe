// atleast 6 characters for username
// atleast 8 characters for the password
// atleast 1 special character for password
// username and password is not blank

const errorHandling = data => {
  const { username, password, passwordConf } = data;

  let error = false;

  if (username.length < 6) {
    error = "Username should be at least 6 characters long";
  } else if (password.length < 8) {
  }

  return error;
};

export default errorHandling;
