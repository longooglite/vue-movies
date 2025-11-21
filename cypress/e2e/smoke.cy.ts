describe('App loads', () => {
	it('visits the home page', () => {
		cy.visit('/');
		cy.location('pathname').should('eq', '/');
	});
});


