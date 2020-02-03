/*Map Legend was moved into the Hamburger Menu */
describe('map legend', () => {
    beforeEach(() => {
        cy.visit('/')
    })
    it('toggles when "Map Legend" is clicked', () => {
        cy.get('.legend-title').wait(1000).click()
        cy.get('.legend-item').should('not.be.visible')
    
        cy.get('.legend-title')
          .wait(2000)
          .click()
        cy.get('.legend-item').should('be.visible')
      })
      it('contains the appropriate text', () => {
          cy.get('.legend-title').should('have.text', 'Map Legend')
          cy.get('.legend-item > h5').should(($h5s) => {
            expect($h5s.eq(0), 'first item').to.contain('Your searched location')
            expect($h5s.eq(1), 'second item').to.contain('Your saved locations')
            expect($h5s.eq(2), 'third item').to.contain('Active Fire')
            expect($h5s.eq(3), 'fourth item').to.contain('Fire Within Radius')
          })
      })
      it('icons are visible', () => {
          cy.get('.legend-item > img').should(($imgs) => {
              expect($imgs.eq(0)).to.be.visible
              expect($imgs.eq(1)).to.be.visible
              expect($imgs.eq(2)).to.be.visible
              expect($imgs.eq(3)).to.be.visible
          })
      })
})