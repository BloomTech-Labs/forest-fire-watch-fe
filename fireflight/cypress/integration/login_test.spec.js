
describe('opening hamburger menu to get all nav items', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('.MuiIconButton-label')
      .click({ multiple: true })
  })

  it('clicks Login from the menu and Login Form pops up ', () => {
    cy.visit('/')
    cy.get('.MuiButtonBase-root.MuiIconButton-root.jss5')
      .click()
    cy.get('.MuiListItemText-root')
      .contains('Login')
      .click() 
  })
  
  it('greets with Welcome Back', () => {
    cy.contains('h2', "Welcome Back")
  })
  //checks for email error message after clicking the Sign In button
  it('requires email', () => {
    cy.visit('/')
    cy.get('.MuiButtonBase-root.MuiIconButton-root.jss5')
      .click()
    cy.get('.MuiListItemText-root')
      .contains('Login')
      .click() 
    cy.get('input[type=text]').type('cypress@newemail.com', { force: true })
    cy.get('.default-btn')
      .contains('Sign In')
      .click({force: true})
    cy.contains('The password is invalid or the user does not have a password.')
  })
})
/*To understand Cypress a little more comment all code out but this */ 
// describe('My First Test', function() {
//   it('Visits the Kitchen Sink', function() {
//     cy.visit('https://example.cypress.io')
//   })
// })

/* Original testing code from Labs 17*/
// describe('login form', () => {
//     beforeEach(() => {
//         cy.visit('/')
//         cy.get('.menu-item')
//             .contains('Sign In')
//             .click()
//     })

//     it('greets with Welcome Back', () => {
//         cy.contains('h2', "Welcome Back")
//     })
//     //checks for email error message after clicking the Sign In button
//     it('requires email', () => {
//         cy.get('[name=password]').type('testing123')
//         cy.get('[type=submit]').click()
//         cy.contains('The email address is badly formatted.')
//     })
//     //checks for missing password error message after hitting the enter key
//     it('requires password', () => {
//         cy.get('[name=email]').type('cypress@newemail.com{enter}')
//         cy.contains('The password is invalid or the user does not have a password.')
//     })
//     // checks for error message when email address is not associated with an account
//     it('produce error message when there is no account', () => {
//         cy.get('[name=email]').type('press@testing.com')
//         cy.get('[name=password]').type('testing123{enter}')
//         cy.contains('There is no user record corresponding to this identifier. The user may have been deleted.')
//     })
// })