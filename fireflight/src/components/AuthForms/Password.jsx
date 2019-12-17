import React, { useState, useContext, useEffect } from 'react'
import { GlobalContext } from '../../context/contextProvider'
import useInput from '../../utils/useInput'
import fire from '../../config/fire'
import { ErrorText } from '../../styles/Forms'
function Password({
  toggle,
  setShowAuthForms,
  setRegisterStatus,
  setLoginStatus,
  setPasswordFormStatus
}) {
  //useInput is a custom hook that should be used for all controlled inputs
  const [email, setEmail, handleEmail] = useInput('', 'email')
  const [loading, setLoading] = useState(false)
  const [errorStatus, setErrorStatus] = useState(false)
  const [errorText, setErrorText] = useState({})
  //get global context (think redux store)
  const context = useContext(GlobalContext)

  //view context once / example of how to use
  useEffect(() => {
    console.log('Context from Global Context: ', context)
  }, [context])

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    // const credentials = { email };

    // setErrorStatus(false);
    // setErrorText("");

    // context.state.remote
    //   .login(credentials)
    //   .then(res => {
    //     setEmail("");
    //     setLoading(false);
    //     setShowAuthForms(false);
    //   })
    //   .catch(err => {
    //     setErrorText("Email is Invalid");
    //     setErrorStatus(true);
    //     setLoading(false);
    //   });
    if (email) {
      fire
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          // Email sent.
          setLoading(false)
          setShowAuthForms(false)
          setPasswordFormStatus(false)
        })
        .catch(error => {
          // An error happened.
          console.log(error)
        })
    }
    else {
      setLoading(false)
      setErrorStatus(true)
      setErrorText("Please enter an email")
    }
  }

  return (
    <div className="password-reset-container login-page-container">
      <button
        className="form-close-btn"
        onClick={() => {
          setShowAuthForms(false)
          setPasswordFormStatus(false)
        }}
      >
        x
      </button>
      <h2 className="form-heading">Password Reset</h2>
      <label>
        Enter your email address and we'll send you a link to reset your
        password.
      </label>
      <br />
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
          {errorStatus ? (
            <ErrorText>{errorText}</ErrorText>
          ) : (
              <ErrorText></ErrorText>
            )}
          <br />
          <button className="default-btn" type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Send Email'}
          </button>
        </div>
        <p>
          Need to create an account?
          <button
            className="create-an-account"
            onClick={() => {
              setRegisterStatus(true)
              setPasswordFormStatus(false)
            }}
          >
            Sign up Here
          </button>
        </p>
      </form>
      {/* Remove Registration split */}
      {/* <LoginSplitContainer>
        <LoginSplit toggle={toggle} />
      </LoginSplitContainer> */}
    </div>
  )
}

export default Password
