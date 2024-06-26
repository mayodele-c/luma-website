let sel
import { faker } from '@faker-js/faker';
const checkStock = 'In stock';
before(() => {
    Cypress.on('uncaught:exception', () => {
        return false
    })

    cy.fixture('selectors').then((selectors) => {
        sel = selectors
    })

    cy.visit('/')

})


Cypress.Commands.add('landingPage', () => {


    cy.get(sel.landingPage.landingPageMsg).should('have.text', 'This is a demo store to test your test automaiton scripts. No orders will be fulfilled. If you are facing any issue, email us at hello@softwaretestingboard.com.')
    cy.get(sel.landingPage.createAccount).eq(0).click()
})

Cypress.Commands.add('createAccount', () => {

    const password = Cypress.env('password');

    cy.get(sel.createAccountPage.createAccountPageMsg).should('have.text', 'Create New Customer Account')
    cy.get(sel.createAccountPage.firstName).type(faker.person.firstName())
    cy.get(sel.createAccountPage.lastName).type(faker.person.lastName())
    cy.get(sel.createAccountPage.email).type(faker.internet.email())
    cy.get(sel.createAccountPage.password).type(password)
    cy.get(sel.createAccountPage.confirmPassword).type(password)
    cy.get(sel.createAccountPage.createAccountButton).click()

})

Cypress.Commands.add('homePage', () => {
    cy.get(sel.homePage.whatIsNew).click()
    cy.get(sel.homePage.hoodAndSwtshrt).eq(1).click({ force: true })

})

Cypress.Commands.add('hoodiesAndSwtshrtPage', () => {
    cy.get(sel.hoodiesAndSwtshrtPage.makeParentVisible).invoke('css', 'display', 'block') // Make the parent element visible
    cy.get(sel.hoodiesAndSwtshrtPage.sortBy).eq(0).select('Price')
    cy.get(sel.hoodiesAndSwtshrtPage.sortBy).eq(0).select('Position')
    cy.get(sel.hoodiesAndSwtshrtPage.sortBy).eq(0).select('Product Name')
    cy.get(sel.hoodiesAndSwtshrtPage.sleeveSwtshrt).eq(0).realHover()
    cy.get(sel.hoodiesAndSwtshrtPage.sleeveSwtshrt).eq(0).click()

    cy.get(sel.hoodiesAndSwtshrtPage.inStock).invoke('text').then((message) => {
        expect(message).to.contain('In stock')

        if (message) {
            // Text found, click the button
            cy.get(sel.hoodiesAndSwtshrtPage.medium).should('be.visible').click()
            cy.log('Text found and button clicked')
        } else {
            // Text not found, navigate back
            cy.log('Text not found, navigating back')
            cy.get(sel.homePage.hoodAndSwtshrt).eq(1).click({ force: true })
        }
    });

    cy.get(sel.hoodiesAndSwtshrtPage.purple).should('be.visible').click()
    cy.get(sel.hoodiesAndSwtshrtPage.quantity).clear()
    cy.get(sel.hoodiesAndSwtshrtPage.quantity).type('2')
    cy.get(sel.hoodiesAndSwtshrtPage.scroll).eq(0).click()
    cy.get(sel.hoodiesAndSwtshrtPage.addToCart).click()
    cy.get(sel.hoodiesAndSwtshrtPage.successMsg).should('include.text', 'You added')
    cy.get(sel.hoodiesAndSwtshrtPage.cart).click()
    cy.get(sel.hoodiesAndSwtshrtPage.seeDetails).click()
    cy.get(sel.hoodiesAndSwtshrtPage.checkoutBtn).click()

})

Cypress.Commands.add('shippingAddressPage', () => {
    cy.get(sel.shippingAddressPage.company).should('be.visible').and('exist').type(faker.company.name())
    cy.get(sel.shippingAddressPage.streetAdd).type(faker.address.streetAddress())
    cy.get(sel.shippingAddressPage.city).type(faker.address.city())
    cy.get(sel.shippingAddressPage.state).select('California')
    cy.get(sel.shippingAddressPage.postCode).type(faker.address.zipCode())
    cy.get(sel.shippingAddressPage.phoneNumber).type(faker.phone.number())
    cy.get(sel.shippingAddressPage.shippingMethod).eq(1).click()
    cy.get(sel.shippingAddressPage.next).click()
    cy.get(sel.shippingAddressPage.placeOrder).should('be.visible').and('exist').click()
    cy.get(sel.shippingAddressPage.orderMsg).should('be.visible').and('exist').should('include.text', 'Your order number is: ')
   // cy.get(sel.shippingAddressPage.continueShopping).click()

})

Cypress.Commands.add('logOutPage', () => {
    cy.get(sel.logOutPage.dropdown).should('be.visible').eq(0).click()
    cy.get(sel.logOutPage.signOut).eq(0).click()



})





