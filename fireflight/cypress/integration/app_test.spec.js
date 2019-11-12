describe('Loads the sign up modal', function() {
  it('loaded the staging URl', function() {
    cy.visit('http://wildfire-watch-staging.netlify.com')
    cy.get('.menu-item')
      .contains('Sign In')
      .click()

    cy.get('.model-wrapper').should('have.css','opacity', '1')
  })
})
