let url = '/';

let logo = '.logo-top';
let menuc = '.menu-item'; //[Exclusive, News, Radio+]
let foot = '.footer-wrapper-list'; //[Home, Live Tv, Library, Account]
let mexclusive = 'https://dev.rctiplus.com/exclusive';
let mnews = 'https://dev.rctiplus.com/trending';
let mroov = 'https://dev.rctiplus.com/radio';
let mhome = 'https://dev.rctiplus.com/';
let mlive = 'https://dev.rctiplus.com/tv/rcti';
let mlibrary = 'https://dev.rctiplus.com/explores';
let maccount = 'https://dev.rctiplus.com/profile';

let exclusive = () => {
    cy.wait(10000);
    cy.get(menuc).eq(0).click();
    cy.wait(5000);
    cy.url().should('eq', mexclusive);
}

let news = () => {
    cy.get(menuc).eq(1).click();
    cy.wait(5000);
    cy.url().should('eq', mnews);
}

let roov = () => {
    cy.get(menuc).eq(2).click();
    cy.wait(5000);
    cy.url().should('eq', mroov);
}

let home = () => {
    cy.get(foot).eq(0).click();
    cy.wait(5000);
    cy.url().should('eq', mhome);
};

let live = () => {
    cy.get(foot).eq(1).click();
    cy.wait(5000);
    cy.url().should('eq', mlive);
}

let library = () => {
    cy.get(foot).eq(2).click();
    cy.wait(5000);
    cy.url().should('eq', mlibrary);
}

let account = () => {
    cy.get(foot).eq(-1).click();
    cy.wait(5000);
    cy.url().should('eq', maccount);
}

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('1. Homapage Positive Test', () => {
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
    it('Homepage Menu Tengah Test', () => {
        cy.get(logo).should('be.visible');

        cy.get(menuc).eq(0).should('be.visible');
        cy.get(menuc).eq(0).should('have.text', 'Exclusive');

        cy.get(menuc).eq(1).should('be.visible');
        cy.get(menuc).eq(1).should('have.text', 'News');

        cy.get(menuc).eq(2).should('be.visible');
        cy.get(menuc).eq(2).should('have.text', 'Radio+');
    });
    it('Homepage Menu Bawah Test', () => {
        cy.get(foot).eq(0).should('be.visible');
        cy.get(foot).eq(0).should('have.text', 'Home');

        cy.get(foot).eq(1).should('be.visible');
        cy.get(foot).eq(1).should('have.text', 'Live TV');

        cy.get(foot).eq(2).should('be.visible');
        cy.get(foot).eq(2).should('have.text', 'Library');

        cy.get(foot).eq(3).should('be.visible');
        cy.get(foot).eq(3).should('have.text', 'Account');
    });
    it('Homepage Menu Direct Test Menu Tengah', () => {
        exclusive();
        news();
        roov();
    });
    it('Homepage Menu Direct Test Menu Footer', () => {
        account();
        home();
        live();
        home();
        library();
        home();

        library();
        home();
        live();
        home();
        account();
        home();

        live();
        home();
        library();
        home();
        account();
        home();

        live();
        library();
        account();
        home();

        account();
        library();
        live();
        home();

        library();
        live();
        account();
        home();
    });
})