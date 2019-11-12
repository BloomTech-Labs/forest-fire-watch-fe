describe('Wildfire Watch App', function() {
  it('loaded the staging URL', function() {
    cy.visit('http://wildfire-watch-staging.netlify.com')
  })
  
  it('loads the login modal upon clicking "sign in"', () => {
    cy.get('.menu-item')
      .contains('Sign In')
      .click()

    cy.get('.model-wrapper').should('have.css', 'opacity', '1')
    cy.get('.form-heading').should('have.text', 'Welcome Back')
  })

  it('Switches to register modal from login', () => {
    cy.get('.create-an-account').click()
    cy.get('.register-page-container').should('be.visible')
    cy.get('.form-heading').should('have.text', 'Create an Account')
  })
})
