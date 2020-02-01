describe('testing the menu', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('.MuiIconButton-label')
      .click({ multiple: true })
  })

  it('opens the drawer', () => {
    cy.visit('/')
    cy.get('.MuiButtonBase-root.MuiIconButton-root.jss5')
      .click()
  })

  it('selects signup and Signup Modal pops up', () => {
    cy.visit('/')
    cy.get('.MuiButtonBase-root.MuiIconButton-root.jss5')
      .click()
    cy.get('.MuiListItemText-root')
      .contains('Signup')
      .click() 
  })

  it('selects login and Login Modal pops up', () => {
    cy.visit('/')
    cy.get('.MuiButtonBase-root.MuiIconButton-root.jss5')
      .click()
    cy.get('.MuiListItemText-root')
      .contains('Login')
      .click() 
  })

  it('selects checklist and navigates to the checklist', () => {
    cy.visit('/')
    cy.get('.MuiButtonBase-root.MuiIconButton-root.jss5')
      .click()
    cy.get('.MuiListItemText-root')
      .contains('Checklist')
      .click() 
    cy.location('pathname').should('eq', '/checklist')
  })
})

// cy.visit('/')
// cy.get('.react-geocoder')
// cy.get('input[type=text]').type('10899 Wilshire Blvd, Los Angeles, CA 90024', { force: true })
// cy.get('.fas.fa-search.fa-2x')
//   .click()