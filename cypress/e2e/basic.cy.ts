describe('Basic specs', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Check for jokes link', () => {
    cy.get('.jokes-link').should('have.attr', 'href').and('include', 'api/joke')
  })
})