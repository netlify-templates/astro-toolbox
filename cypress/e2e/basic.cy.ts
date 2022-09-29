describe('Basic specs', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Check buttons', () => {
    cy.get('.bttns a').should('have.attr', 'href')
  })
})