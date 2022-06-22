describe('empty spec', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('test true', () => {
    expect(true).to.equal(true)
  })
  // it('renders the image', () => {
  //   cy.get('img')
  //   .should('be.visible')
  //   .and(($img) => {
  //     expect($img[0].naturalWidth).to.be.greaterThan(0);
  //   })
  // })
})