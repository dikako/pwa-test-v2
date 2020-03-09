let url = '/';

let footerMenu = '.footer-wrapper-list';

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

    it('On Test - blblbl', () => {
        
    })
});