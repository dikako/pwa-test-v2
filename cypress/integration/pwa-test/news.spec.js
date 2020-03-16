let listKanal = ".item-link";
let addButton = ".add-tab-button";
let url = "/";

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('9. News - Cek Kanal Default', () => {
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
        cy.wait(2000);
    });

    it('On Test - Default Kanal', () => {
        cy.visit('https://dev.rctiplus.com/trending');
        cy.wait(2000);
        cy.get(listKanal).should('have.length', 3);
    });

    it('On Test - Validate Url [Default Kanal]', () => {
        cy.visit('https://dev.rctiplus.com/trending');
        cy.wait(2000);

        cy.get(listKanal).eq(0).click();
        cy.wait(2000);
        cy.url().should('eq', '');

        cy.get(listKanal).eq(1).click();
        cy.wait(2000);
        cy.url().should('eq', '');

        cy.get(listKanal).eq(2).click();
        cy.wait(2000);
        cy.url().should('eq', '')
    });

    it('On Test - Validate + Kanal', () => {
        cy.visit('https://dev.rctiplus.com/trending');
        cy.wait(2000);

        cy.get(addButton).should('be.visible');
        cy.get(addButton).click();
    })
});