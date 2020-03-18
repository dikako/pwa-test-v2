Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

let faker = require('faker');
let randomUsername = faker.internet.userName();

it('Test', () => {
    cy.visit('https://rc-chat-api.rctiplus.com/test/test');

    cy.get('#username').clear();
    cy.get('#username').type('user');

    for (let i=0; i<100; i++){
        
let randomChat = faker.lorem.words(4);
    cy.get('#m').clear()
    cy.get('#m').type(randomChat);
    cy.get('button').click();
    }
});