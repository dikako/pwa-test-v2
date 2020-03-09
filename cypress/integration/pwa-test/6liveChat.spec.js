let url = '/';
let urlLive;

let sfooterMenu = '.footer-wrapper-list';
let stabLiveChat = '.live-chat-wrap';
let spopupLogin = '#swal2-content';
let scancel = '.swal2-cancel-custom';
let spopupAction = '.swal2-actions';
let sfusername = '#email';
let sfpassword = '#password';
let sbNext = '.btn-next';

let uname = 'dikakoko04@gmail.com';
let pass = 'dikakoko';

// let faker = require('faker');
// let r = faker.lorem.words(4);

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('Login Test', () => {
    beforeEach(() => {
        cy.viewport('iphone-6');
        cy.visit(url, {
            onBeforeLoad: function (win) {
                const promise = new Promise(function (resolve) { });
                return win.navigator.serviceWorker.register = () => {
                    return promise;
                }
            }
        });
        cy.wait(10000);
    });

    it('On Test - Chat Before Login', () => {
        cy.get(sfooterMenu).eq(1).click();
        cy.wait(5000);
        cy.url().then($urlLive => {
            urlLive = $urlLive;
            cy.log(urlLive);
        });

        cy.get(stabLiveChat).find('.btn').eq(0).click();

        cy.get(spopupLogin).should('have.text', 'Please Sign In\n\t\t\t\tWoops! Gonna sign in first!\n\t\t\t\tOnly a click away and you\n\t\t\t\tcan continue to enjoy\n\t\t\t\tRCTI+');
        cy.get(scancel).click();

        cy.get(stabLiveChat).find('.btn').eq(0).click();
        cy.get(spopupAction).find('button[type="button"]').eq(1).click();

        // Login
        cy.get(sfusername).clear();
        cy.get(sfusername).type(uname);
        cy.get(sfpassword).clear();
        cy.get(sfpassword).type(pass);
        cy.get(sbNext).click();
        cy.wait(20000);

        cy.url().should('eq', 'https://dev.rctiplus.com/tv/rcti');
        
        // Chat
        let chat = 'check ombak';
        cy.get(stabLiveChat).find('.btn').eq(0).click();
        cy.get('.col-9').find('#chat-input').type(chat);
        cy.get('.col-1').find('button[type="button"]').click();
        cy.get('.chat-message').find('.username').should('eq', 'dikakokojsjsjs');
        cy.get('.chat-message').find('.message').should('eq', chat);
    });

    it('On Test - Chat After Login', () => {
        cy.get(sfooterMenu).eq(3).click();

        cy.get('.sub-btn').find('button[type="button"]').click();
        cy.get(sfusername).clear();
        cy.get(sfusername).type(uname);
        cy.get(sfpassword).clear();
        cy.get(sfpassword).type(pass);
        cy.get(sbNext).click();
        cy.wait(20000);

        cy.get(sfooterMenu).eq(1).click();

        let chat = 'check ombak';
        cy.get(stabLiveChat).find('.btn').eq(0).click();
        cy.get('.col-9').find('#chat-input').type(chat);
        cy.get('.col-1').find('button[type="button"]').click();
        cy.get('.chat-message').find('.username').should('eq', 'dikakokojsjsjs');
        cy.get('.chat-message').find('.message').should('eq', chat);
    });
});