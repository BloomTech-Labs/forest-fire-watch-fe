describe('Loads the sign up modal', function() {
  it('loaded the staging URl', function() {
    cy.visit('http://wildfire-watch-staging.netlify.com')
    cy.contains('Sign In').click()
  })
})
