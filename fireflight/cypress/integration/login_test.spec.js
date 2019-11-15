import { config } from '../../src/config/fire'

describe('Firebase email + password authentication', () => {
  const email = 'cypress@testing.com'
  const password = 'testing123'

  it('loaded the staging URL', () => {
    cy.visit('http://wildfire-watch-staging.netlify.com')
  })

  it('Can login with modal', () => {
    cy.get('.menu-item')
      .contains('Sign In')
      .click()

    cy.get('.model-wrapper').should('have.css', 'opacity', '1')
    cy.get('.form-heading').should('have.text', 'Welcome Back')

    cy.get('[name=email]').type(email)
    cy.get('[name=password]').type(password)
    cy.get('[type=submit]').click()

    cy.get('.model-wrapper').should('have.css', 'opacity', '0')
  })

  it('Can logout with logout button', () => {
    cy.get('.menu-item')
      .contains('Sign In')
      .click()

    cy.get('[name=email]').type(email)
    cy.get('[name=password]').type(password)
    cy.get('[type=submit]').click()
    cy.wait(1000)

    cy.get('.menu-item')
      .contains('Logout')
      .click()
  })
})
