let url = {
    base: '/'
};

let selector = {
    footer_menu: '.footer-wrapper-list', 
    list_program: '.col-4',
    wacth_trailer: '.watch-button-container'
};

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('Login Test', () => {
    beforeEach(() => {
        cy.viewport('iphone-6');
        cy.visit(url.base, {
            onBeforeLoad: function (win) {
                const promise = new Promise(function (resolve) { });
                return win.navigator.serviceWorker.register = () => {
                    return promise;
                }
            }
        });
        cy.wait(2000);
    });

    it('On Test - Library', () => {
        cy.get(selector.footer_menu).eq(2).click();
        cy.wait(2000);
        cy.get(selector.list_program).eq(0).click();
        cy.get(selector.wacth_trailer).find('.watch-button').click();
        cy.wait(5000);
    })
});