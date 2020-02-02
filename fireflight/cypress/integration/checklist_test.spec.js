describe('goes to Checklist', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('.MuiIconButton-label')
      .click({ multiple: true })
  })

  it('Navigates to the "Checklist" when clicked and checks all boxes, navigates away and back. Returns to all boxes still checked', () => {
    cy.get('.MuiButtonBase-root.MuiIconButton-root.jss5')
      .click()
    cy.get('.MuiListItemText-root')
      .contains('Checklist')
      .click() 
    cy.location('pathname').should('eq', '/checklist')
    cy.get('[type="checkbox"]').check()
    cy.get('.MuiButtonBase-root.MuiIconButton-root.jss5')
      .click()
    cy.get('.MuiListItemText-root')
      .contains('Home')
      .click()
    cy.location('pathname').should('eq', '/')
    cy.get('.MuiButtonBase-root.MuiIconButton-root.jss5')
      .click()
    cy.get('.MuiListItemText-root')
      .contains('Checklist')
      .click() 
    cy.location('pathname').should('eq', '/checklist')
  })

  
})