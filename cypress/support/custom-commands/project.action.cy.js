let sel
import { faker } from '@faker-js/faker';
before(()  => {
    Cypress.on('uncaught:exception', () => {
        return false
    })

    cy.fixture('selectors').then((selectors) => {
        sel = selectors
      })

    cy.visit('/')

})


Cypress.Commands.add('homepage', () => {


    cy.get(sel.homePage.homePageMsg).should('have.text', 'This is a demo store to test your test automaiton scripts. No orders will be fulfilled. If you are facing any issue, email us at hello@softwaretestingboard.com.')
    cy.get(sel.homePage.createAccount).eq(0).click()
})

Cypress.Commands.add('createAccount', () => {

    cy.get(sel.createAccountPage.createAccountPageMsg).should('have.text', 'Create New Customer Account')
    cy.get(sel.createAccountPage.firstName).type(faker.person.firstName())
    cy.get(sel.createAccountPage.lastName).type(faker.person.lastName())
    cy.get(sel.createAccountPage.email).type(faker.internet.email())
    cy.get(sel.createAccountPage.password).type('Aa1234!#')
    cy.get(sel.createAccountPage.confirmPassword).type('Aa1234!#')
    cy.get(sel.createAccountPage.createAccountButton).click()


})