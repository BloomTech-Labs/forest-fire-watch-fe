describe('add location page', () => {
	before('login', () => {
		cy.visit('/')
		cy.login('cypress@newemail.com', 'testing123')
		cy.get('.menu-item').contains('Profile').click()
		cy.wait(2000)
	})

	it('navigates to the add location page from the add location button', () => {
		cy.get('.add-location-btn').click()
		cy.get('h2').contains('Add Location')
	})

	it('contains the necessary text', () => {
		cy.get('label').first().should('contain', 'Address')
		cy.get('label').last().should('contain', 'Radius')

		cy.get('.radius-text').should('contain', 'Choose the miles from this location that you wish to be notified of fires within.')
		cy.get('.default-btn').should('contain', 'Save Location')

		cy.get('.profile-item').contains('Home')
		cy.get('.profile-item').contains('Profile')
		cy.get('.profile-item').contains('Logout')
	})
})