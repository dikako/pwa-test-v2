let url = '/';

let footerMenu = '.footer-wrapper-list';
let listLive = '.tv-wrap';

let urlRcti = 'https://dev.rctiplus.com/tv/rcti';
let urlMnctv = 'https://dev.rctiplus.com/tv/mnctv';
let urlGtv = 'https://dev.rctiplus.com/tv/gtv';
let urlInews = 'https://dev.rctiplus.com/tv/inews';

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

    it('On Test - Validate Url Live Stream', () => {
        cy.get(footerMenu).eq(1).click();
        cy.wait(5000);
        cy.url().should('eq', urlRcti);

        cy.get(listLive).find('.row').find('.text-center').eq(1).click();
        cy.wait(5000);
        cy.url().should('eq', urlMnctv);

        cy.get(listLive).find('.row').find('.text-center').eq(2).click();
        cy.wait(5000);
        cy.url().should('eq', urlGtv);

        cy.get(listLive).find('.row').find('.text-center').eq(3).click();
        cy.wait(5000);
        cy.url().should('eq', urlInews);
    })
    
});