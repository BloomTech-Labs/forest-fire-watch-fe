describe('Wildfire Watch Home Page', () => {
  it('loaded the staging URL', () => {
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
    cy.get('.create-an-account')
      .contains('Sign up Here')
      .click()
    cy.get('.register-page-container').should('be.visible')
    cy.get('.form-heading').should('have.text', 'Create an Account')
  })

  it('Switches to login modal from register', () => {
    cy.get('.create-an-account')
      .contains('Sign In Here')
      .click()
    cy.get('.login-page-container').should('be.visible')
    cy.get('.form-heading').should('have.text', 'Welcome Back')
  })

  it('switches to password reset modal from login', () => {
    cy.get('.forgot-pw').click()
    cy.get('.password-reset-container').should('be.visible')
    cy.get('.form-heading').should('have.text', 'Password Reset')
  })

  it('Switches to register modal from password reset', () => {
    cy.get('.password-reset-container').should('be.visible')
    cy.get('.create-an-account')
      .contains('Sign up Here')
      .click()
    cy.get('.register-page-container').should('be.visible')
    cy.get('.password-reset-container').should('not.exist')
    cy.get('.form-heading').should('have.text', 'Create an Account')
  })
})
