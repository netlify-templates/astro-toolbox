describe('empty spec', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Check for jokes', () => {
    cy.get('blockquote').should('be.not.empty')
  })
})