import React, { useState, useContext, useEffect } from 'react'
import { GlobalContext } from '../../context/contextProvider'
import useInput from '../../utils/useInput'
import { FireDataContext } from '../../context/FireDataContext'
import ReactGA from 'react-ga'
import { ErrorText } from '../../styles/Forms'
import fire from '../../config/fire'

function Login({
  toggle,
  setShowAuthForms,
  setRegisterStatus,
  setLoginStatus,
  setPasswordFormStatus,
  toggleForgotPassword
}) {
  //useInput is a custom hook that should be used for all controlled inputs
  const [email, setEmail, handleEmail] = useInput('', 'email')
  const [password, setPassword, handlePassword] = useInput('', 'password')
  const [loading, setLoading] = useState(false)
  const [errorStatus, setErrorStatus] = useState(false)
  const [errorText, setErrorText] = useState({})
  //get global context (think redux store)
  const context = useContext(GlobalContext)
  const { saveLocationMarker } = useContext(FireDataContext)

  //view context once / example of how to use
  useEffect(() => {
    console.log(context)
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log('Firebase user:', user)
        const UID = user.user.uid
        const credentials = { UID }

        setErrorStatus(false)
        setErrorText('')

        // Still needed even though we added Firebase because we return the JWT and store in localStorage
        context.state.remote
          .login(credentials)
          .then(res => {
            ReactGA.event({
              category: 'User',
              action: 'Logged in'
            })
            setEmail('')
            setPassword('')
            setLoading(false)
            setShowAuthForms(false)
            if (localStorage.getItem('address')) {
              saveLocationMarker()
            }
          })
          .catch(err => {
            // User not found
            setErrorText({ message: err.response.data.error })
            setErrorStatus(true)
            setLoading(false)
          })
      })
      .catch(err => {
        // catching the entire firebase sign in
        console.log(err)
        setErrorText(err)
        setErrorStatus(true)
        setLoading(false)
      })
  }

  return (
    <div className="login-page-container">
      <button
        className="form-close-btn"
        onClick={() => setShowAuthForms(false)}
      >
        x
      </button>
      <h2 className="form-heading">Welcome Back</h2>
      <form className="auth-form-container" onSubmit={handleSubmit}>
        <div className="input-containers">
          <label htmlFor="email">Email Address</label>
          <input
            className="form-input"
            type="text"
            name="email"
            value={email}
            onChange={handleEmail}
            placeholder=""
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            placeholder=""
          />
          {errorStatus ? <ErrorText>{errorText.message}</ErrorText> : null}

          <button className="default-btn" type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Sign In'}
          </button>
          <br />
          <span className="forgot-pw">
            <button
              onClick={() => {
                setPasswordFormStatus(true)
                setLoginStatus(false)
              }}
            >
              Forgot your Password?
            </button>
          </span>
        </div>
        <p className="modal-crosslink">
          Need to create an account?
          <button className="create-an-account" onClick={toggle}>
            Sign up Here
          </button>
        </p>
      </form>
    </div>
  )
}

export default Login
