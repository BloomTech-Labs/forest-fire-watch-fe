import { openDB } from 'idb'
import { config } from '../../src/config/fire'

describe('Firebase email + password authentication', () => {
  const email = 'cypress@testing.com'
  const password = 'testing123'
  console.log('config.apiKey', config.apiKey)

  context('via UI', () => {
    // clear saved authentication data before each test
    // forcing the application to be signed out
    beforeEach(() => indexedDB.deleteDatabase('firebaseLocalStorageDb'))

    beforeEach(() => {
      // if wanted, can wait for the identity call to go through
      // cy.server()
      // cy.route(
      //   'POST',
      //   `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.apiKey}`
      // ).as('identity')
      // cy.visit('/')
      // cy.wait('@identity')

      cy.visit('/')
    })

    it('Can login with modal', () => {
      cy.get('.menu-item')
        .contains('Sign In')
        .click()

      cy.get('.model-wrapper').should('have.css', 'opacity', '1')
      cy.get('.form-heading').should('have.text', 'Welcome Back')

      cy.get('[name=email]').type(email)
      cy.get('[name=password]').type(password)
    })
  })

  // context.only('via cy.request', () => {
  //   beforeEach(() => {
  //     indexedDB.deleteDatabase('firebaseLocalStorageDb')
  //   })

  //   beforeEach(() => {
  //     // from Firebase config, same as index.html
  //     const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.apiKey}`
  //     cy.request({
  //       method: 'POST',
  //       url: endpoint,
  //       form: true,
  //       body: {
  //         email: email,
  //         password: password,
  //         returnSecureToken: true
  //       }
  //     })
  //       .its('body')
  //       // sure, use async / await functions for 3rd party code
  //       // parcel bundler transpiles them nicely to promise-returning code
  //       .then(async body => {
  //         const db = await openDB('firebaseLocalStorageDb', 1, {
  //           upgrade(db) {
  //             db.createObjectStore('firebaseLocalStorage', {
  //               keyPath: 'fbase_key',
  //               autoIncrement: false
  //             })
  //           }
  //         })
  //         console.log('db', db)
  //         const fbase_key = `firebase:authUser:${config.apiKey}:[DEFAULT]`
  //         const value = {
  //           appName: '[DEFAULT]',
  //           // createdAt: String(+new Date()),
  //           displayName: body.displayName,
  //           email: body.email,
  //           emailVerified: false,
  //           isAnonymous: false,
  //           // lastLoginAt: String(+new Date()),

  //           providerData: [
  //             {
  //               displayName: body.displayName,
  //               email: body.email,
  //               providerId: 'password',
  //               uid: body.email
  //             }
  //           ],
  //           apiKey: config.apiKey,
  //           authDomain: config.authDomain,

  //           stsTokenManager: {
  //             accessToken: body.idToken,
  //             apiKey: config.apiKey
  //             //       expirationTime: +new Date() + 1000000
  //           },
  //           uid: body.localId
  //         }
  //         console.log('value', value)
  //         console.log('await', fbase_key)

  //         await db.add('firebaseLocalStorage', {
  //           fbase_key,
  //           value
  //         })
  //       })
  //   })
  //   it('loaded the staging URL', () => {
  //     cy.visit('/')
  //   })
  //   //     it('greets with Welcome Back', () => {
  //   //       cy.contains('h2', 'Welcome Back')
  //   //     })

  //   //     it('links to #/register', () => {
  //   //       cy.contains('Need to create an account?')
  //   //         .contains('Sign up Here')
  //   //         .should('button', '#/register')
  //   //     })
  //   //     it('requires email', () => {})
  //   //     it('requires password', () => {})
  //   //     it('requires valid username and password', () => {})
  //   //     it('navigates to #/ on successful login', () => {})
  // })
})
