import firebase from 'firebase';

Cypress.Commands.add('login', (email, password) => {
	cy.get('.menu-item')
      .contains('Sign In')
      .click()

    cy.get('[name=email]').type(email)
    cy.get('[name=password]').type(password)
    cy.get('[type=submit]').click()
    cy.wait(3000)
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