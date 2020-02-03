describe('registration form', () => {
  beforeEach('login', () => {
    cy.visit('/')
    cy.get('.MuiIconButton-label')
      .click({ multiple: true })
  })
  
  it('clicks Login from the menu and Login Form pops up ', () => {
    cy.get('.MuiListItemText-root')
      .contains('Signup') 
      .click({ force: true })
  })

  it('greets with Welcome Back', () => {
    cy.contains('h2', "Welcome Back")
  })
})

/* Original testing code from Labs 17*/
// describe('registration form', () => {
// 	beforeEach('login', () => {
// 		cy.visit('/')
// 		cy.get('.menu-item').contains('Sign Up').click()
// 		cy.wait(1000)
//     })

//     it('greets with Create an Account', () => {
//         cy.contains('h2', 'Create an Account')
//     })

//     it('requires email', () => {
//         cy.get('[name=firstName]').type('Cypress')
//         cy.get('[name=lastName]').type('Testing')
//         cy.get('[name=password]').type('testing123')
//         cy.get('[name=passwordConf]').type('testing123{enter}')
//         cy.contains('Your email is required')
//     })

//     it('requires password', () => {
//         cy.get('[name=firstName]').type('Cypress')
//         cy.get('[name=lastName]').type('Testing')
//         cy.get('[name=email]').type('cypress@newemail.com{enter}')
//         cy.contains('The password must be 6 characters long or more.')
//     })

//     it('requires password confirmation', () => {
//         cy.get('[name=firstName]').type('Cypress')
//         cy.get('[name=lastName]').type('Testing')
//         cy.get('[name=email]').type('cypress@newemail.com')
//         cy.get('[name=password]').type('testing123{enter}')
//         cy.contains('Your passwords do not match')
//     })

//     it('requires first and last name', () => {
//         cy.get('[name=email]').type('cypress@newemail.com{enter}')
//         cy.get('[name=password]').type('testing123')
//         cy.get('[name=passwordConf]').type('testing123{enter}')
//         cy.contains('Your full name is required')
//     })

//     it('requires last name', () => {
//         cy.get('[name=firstName]').type('Cypress')
//         cy.get('[name=email]').type('cypress@newemail.com{enter}')
//         cy.get('[name=password]').type('testing123')
//         cy.get('[name=passwordConf]').type('testing123{enter}')
//         cy.contains('Your full name is required')
//     })

//     it('requires first name', () => {
//         cy.get('[name=lastName]').type('Testing')
//         cy.get('[name=email]').type('cypress@newemail.com{enter}')
//         cy.get('[name=password]').type('testing123')
//         cy.get('[name=passwordConf]').type('testing123{enter}')
//         cy.contains('Your full name is required')
//     })

//     it('contains a Create Account button', () => {
//         cy.get('button').should('contain', 'Create Account')
//     })
// })