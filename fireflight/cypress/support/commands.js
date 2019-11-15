import firebase from 'firebase';

const fbConfig = {
  apiKey: 'AIzaSyCrydaAdKVQgdiI2npa_9VmovXTcB0Ud3M',
  authDomain: 'wildfire-watch.firebaseapp.com',
  databaseURL: 'https://wildfire-watch.firebaseio.com',
  projectId: 'wildfire-watch',
  storageBucket: 'wildfire-watch.appspot.com'
}

firebase.initializeApp(fbConfig)

Cypress.Commands.add('login', (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      console.log('Firebase user:', user)
      const UID = user.user.uid
      const credentials = { UID }

      setErrorStatus(false)
      setErrorText('')

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
})

Cypress.Commands.add('logout', () => {
  return firebase.auth().signOut()
})

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })