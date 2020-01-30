describe('goes to Checklist', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('.MuiIconButton-label')
      .click({ multiple: true })
  })

  it('Navigates to the "Checklist" when clicked and checks all boxes', () => {
      cy.get('.MuiListItemText-root')
        .contains('Checklist') 
        .click({ force: true })
      cy.location('pathname').should('eq', '/checklist')
      cy.get('[type="checkbox"]').check()
  })
})