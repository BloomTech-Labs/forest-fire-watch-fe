describe('Add location page', () => {
	before('login', () => {
		cy.visit('/')
		cy.login('cypress@testing.com', 'testing123')
		cy.get('.menu-item').contains('Profile').click()
		cy.wait(2000)
	})
	it('Navigates to the add location page from the add location button', () => {
		cy.get('.add-location-btn').click()
	})
	it('Allows address input')
})