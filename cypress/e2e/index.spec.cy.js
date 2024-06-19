describe('Luma Flow', () => {


  it('landingPage', () => {

    cy.landingPage()
   
  })

  it('createAccount', () => {

    cy.createAccount()


  })

  it('homePage', () => {

    cy.homePage()
  })

  it('hoodiesAndSwtshrt', () => {

    cy.hoodiesAndSwtshrtPage()

  })

  it('shippingAddress', () => {

    cy.shippingAddressPage()


  })

  it('logOut', () => {
    
    cy.logOutPage()

  })


})