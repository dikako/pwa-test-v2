let url = "/trending";

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
        cy.wait(10000);
    });

    it('View & Click 50x', () => {
        cy.get('.article-thumbnail-container').eq(3).click();

    });
});

function loginNews() {
    cy.visit('https://rc-cms-news2.mncplus.com/');
    cy.wait(5000);
    cy.get('input[name="username"]').type('admincmsnews');
    cy.get('input[name="password"]').type('admincmsnews');
    cy.get('button[type="submit"]').click();

    cy.get('.treeview ').eq(0).click();
    cy.get('.treeview-menu').find('.treeview ').eq(3).click();
}