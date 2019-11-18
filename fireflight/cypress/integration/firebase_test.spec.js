describe('Firebase email + password authentication', () => {
  // Test user account, tests will fail if user is not in firebase
  const email = 'cypress@newemail.com'
  const password = 'testing123'

  it('Can login with modal', () => {
    // Click Sign In on the navigation bar
    cy.get('.menu-item')
      .contains('Sign In')
      .click()
    // Confirm login modal appears
    cy.get('.model-wrapper').should('have.css', 'opacity', '1')
    cy.get('.form-heading').should('have.text', 'Welcome Back')
    // Login
    cy.get('[name=email]').type(email)
    cy.get('[name=password]').type(password)
    cy.get('[type=submit]').click()
    //Confirm modal goes away
    cy.get('.model-wrapper').should('have.css', 'opacity', '0')
  })

  it('Can logout with logout button', () => {
    cy.login('cypress@newemail.com', 'testing123')
    cy.wait(3000)

    cy.get('.menu-item')
      .contains('Logout')
      .click()
  })
})