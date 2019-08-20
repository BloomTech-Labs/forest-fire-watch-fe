import React, { useState,useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import FireContext from '../context/contextProvider'
import axios from "axios";

function Register() {
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const [passwordConf,setPasswordConf]=useState('')

  const [loading, setLoading] = useState(false);
  const [badPassword, setBadPassword] = useState(false);

  const data=useContext(FireContext)

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (password === passwordConf) {
      //need this from backend
      const url = "";
      const newUser = { username, password };
      axios
        .post(url, newUser)
        .then(res => {
          setUsername("");
          setPassword("");
          setPasswordConf("");
          setLoading(false);
          console.log(res.body);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setBadPassword(true);
    }
  }

  if (data.token!=null) {
    console.log(localStorage.getItem('token'));
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        Registration Page!
        <form onSubmit={handleSubmit}>
          <label>
            Username
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={username}
              onChange={e=>setUsername(e.value)}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={e=>setPassword(e.value)}
            />
          </label>
          <label>
            Confirm Password
            <input
              type="password"
              name="passwordConf"
              placeholder="Confirm password"
              value={passwordConf}
              onChange={e=>setPasswordConf(e.value)}
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Register"}
          </button>
          {badPassword ? <p>"Your passwords don't match"</p> : <></>}
        </form>
        <p>
          Already a member? Log in <Link to="/login">here</Link>
        </p>
      </div>
    );
  }
}

export default Register;
