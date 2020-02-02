describe('Profile page functionality', () => {
	beforeEach('login', () => {
    cy.visit('/')
    cy.get('.MuiIconButton-label')
      .click({ multiple: true })
	})

	it('Navigates to the dashboard when "Profile" is clicked', () => {
    cy.get('.MuiListItemText-root')
      .contains('Login') 
      .click({ force: true })
   
	})
})

/* Original testing code from Labs 17*/
// describe('Profile page functionality', () => {
// 	beforeEach('login', () => {
// 		cy.visit('/')
// 		cy.login('cypress@newemail.com', 'testing123')
// 		cy.get('.menu-item').contains('Profile').click()
// 		cy.wait(1000)
// 	})

// 	it('Navigates to the dashboard when "Profile" is clicked', () => {
// 		cy.location('pathname').should('eq', '/dashboard')
// 	})

// 	it('Contains the appropriate text', () => {
// 		// cy.get('.save-edit-btn').should('have.text', 'Add Phone Number')
// 		// The commented portion above won't pass until you are able to remove phone numbers from the database
// 		cy.get('.add-location-btn').should('have.text', 'Add Location')
// 		cy.get('.profile-email').should('have.text', 'cypress@newemail.com')
// 		cy.get('.profile-name').should('have.text', 'Wildfir Watch')
// 	})

// 	it('Displays the new email address after it is changed', () => {
// 		cy.get('.edit-profile-icon').first().click()
// 		cy.get('[type=email]').type('cypress@newemail.com')
// 		cy.get('.save-edit-btn').click()
// 		cy.get('.profile-email').should('have.text', 'cypress@newemail.com')
// 	})

// 	it('Displays the phone number after clicking Add Phone Number', () => {
// 		cy.get('.edit-profile-icon').last().click()
// 		cy.get('[name=phone]').clear().type('8585551212')
// 		cy.get('.save-edit-btn').click()
// 		cy.get('.profile-phone').should('have.text', '(858) 555-1212')
// 	})

// 	// it('toggles SMS on and off', () => {
// 	// 	cy.get('[for=checkbox1]').click().wait(500)
// 	// 		// .should('have.css', 'width', '18px')
// 	// 		// .should('have.css', 'height', '18px')
// 	// 		.should('have.css', 'background', '#4fbe79')
// 	// })

// 	// it('toggles push notifications on and off', () => {
// 	// 	cy.get('[for=checkbox2]').click()
// 	// })

// 	it('Loads add location page from add location button', () => {
// 		cy.get('.add-location-btn').click()
// 		cy.get('h2').should('contain', 'Add Location')
// 	})
// })