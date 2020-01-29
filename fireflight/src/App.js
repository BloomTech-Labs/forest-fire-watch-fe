import React, { useState, useEffect, useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import axios from 'axios'
import ReactGa from 'react-ga'
import { createBrowserHistory } from 'history'

// import Navigation from "./components/Navigation";
import Home from './components/Home'
import Dashboard from './components/Dashboard/'
import AuthForms from './components/AuthForms/AuthForms'
import Address from './components/Address'
import HamburgerNavigation from './components/HamburgerNavigation'

import { GlobalContext } from './context/contextProvider'
import { UserDataProvider } from './context/UserDataContext'
import { FireDataContext } from './context/FireDataContext'
import AddressContext from './context/AddressContext'
import { haversineDistance } from './utils/haversineDistance'
import Checklist from './components/Checklist'

// import Modal from "./components/Modal/Modal"

// import * as Sentry from '@sentry/browser'

import * as v from './styles/vars'
import styled from 'styled-components'
import './styles/App.scss'

import fire from './config/fire'
import axiosWithAuth from './utils/axiosWithAuth'

// Sentry.init({
//   dsn: 'https://2281acb5134d4680927ead14de3c5727@sentry.io/1775951'
// })

require('dotenv').config()

const token = localStorage.getItem('token')

// AUTH FORM MODAL:
// Will refactor everything in regards to the auth form modal into one single component to clean up APP.js

function App() {
  // The 4 hooks below are used for toggling between the login, register, and forgot password forms.
  // These can most likely be refactored to use context API.
  const [showAuthForms, setShowAuthForms] = useState(false)
  const [loginFormStatus, setLoginFormStatus] = useState(true)
  const [registerFormStatus, setRegisterFormStatus] = useState(false)
  const [passwordFormStatus, setPasswordFormStatus] = useState(false)

  const [firebaseUser, setFirebaseUser] = useState({})

  const tracking = 'UA-149769097-1'
  if (process.env.REACT_APP_ENV === 'https://wildfire-watch.netlify.com/') {
    ReactGa.initialize(tracking)
    if (firebaseUser !== null) {
      ReactGa.set({
        userId: firebaseUser
      })
    }
  }

  const history = createBrowserHistory()
  history.listen(location => {
    ReactGa.set({ page: location.pathname })
    ReactGa.pageview(location.pathname)
  })

  const global = useContext(GlobalContext)
  const {
    fireDataState,
    getAllFires,
    setUserLocations,
    saveLocationMarker,
    userLocations
  } = useContext(FireDataContext)

  useEffect(() => {
    getAllFires()
    setUserLocations()
  }, [])

  useEffect(() => {
    if (token) {
      setUserLocations()
    }
  }, [fireDataState.allFires, fireDataState.selectedMarker])

  useEffect(() => {
    //getLogin gets login information upon page load here;
    const getLogin = async () => {
      try {
        let user = await global.state.remote.self()
        global.setUser(user.email)
      } catch (err) {
        localStorage.removeItem('token')
        global.setUser('')
        return <Redirect to="/" />
      }
    }
    if (token) {
      getLogin()
    }
  }, [])

  useEffect(() => {
    if (token) {
      const fetch = async () => {
        try {
          let temp = await global.state.remote.fetchLocations()
        } catch (err) {
          console.error(err)
        }
      }
      fetch()
    }
  }, [token])

  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        setFirebaseUser(user)
        console.log(firebaseUser)
      } else {
        setFirebaseUser(null)
        console.log('no user returned')
      }
    })
  }

  return (
    <div>
      <AddressContext>
        <HamburgerNavigation
          toggleAuthForms={setShowAuthForms}
          toggleLoginStatus={setLoginFormStatus}
          toggleRegisterStatus={setRegisterFormStatus}
        />
        <AuthForms
          showAuthForms={showAuthForms}
          setShowAuthForms={setShowAuthForms}
          loginFormStatus={loginFormStatus}
          registerFormStatus={registerFormStatus}
          setLoginFormStatus={setLoginFormStatus}
          setRegisterFormStatus={setRegisterFormStatus}
          passwordFormStatus={passwordFormStatus}
          setPasswordFormStatus={setPasswordFormStatus}
        />

        <UserDataProvider>
          <Route path="/dashboard" component={Dashboard} />
        </UserDataProvider>

        <Route
          exact
          path="/"
          render={() => (
            <Home
              setShowAuthForms={setShowAuthForms}
              setLoginFormStatus={setLoginFormStatus}
              setRegisterFormStatus={setRegisterFormStatus}
            />
          )}
        />

        <Route
          path="/home"
          render={() => (
            <Home
              setShowAuthForms={setShowAuthForms}
              setLoginFormStatus={setLoginFormStatus}
              setRegisterFormStatus={setRegisterFormStatus}
            />
          )}
        />
        <Route path="/address" component={Address} />
        <Route path="/checklist" component={Checklist} />
      </AddressContext>
    </div>
  )
}

export default App
