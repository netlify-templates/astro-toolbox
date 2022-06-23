describe('empty spec', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('passing test', () => {
    expect(true).to.equal(true)
  })
  // it('renders the image', () => {
  //   cy.get('img')
  //   .should('be.visible')
  //   .and(($img) => {
  //     expect($img[0].naturalWidth).to.be.greaterThan(0);
  //   })
  })
})