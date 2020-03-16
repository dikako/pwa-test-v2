let url = {
    base: '/',
    exclusive: 'https://dev.rctiplus.com/exclusive',
    news: 'https://dev.rctiplus.com/trending',
    radio: 'https://dev.rctiplus.com/radio',
    home: 'https://dev.rctiplus.com/',
    live: 'https://dev.rctiplus.com/tv/rcti',
    library: 'https://dev.rctiplus.com/explores',
    account: 'https://dev.rctiplus.com/profile'
};

let selector = {
    logo: '.logo-top',
    list_menu_tengah: '.menu-item', //[Exclusive, News, Radio+]
    list_footer_menu: '.footer-wrapper-list' //[Home, Live Tv, Library, Account]
};

let exclusive = () => {
    cy.wait(2000);
    cy.get(selector.list_menu_tengah).eq(0).click();
    cy.wait(2000);
    cy.url().should('eq', url.exclusive);
}

let news = () => {
    cy.get(selector.list_menu_tengah).eq(1).click();
    cy.wait(2000);
    cy.url().should('eq', url.news);
}

let roov = () => {
    cy.get(selector.list_menu_tengah).eq(2).click();
    cy.wait(2000);
    cy.url().should('eq', url.radio);
}

let home = () => {
    cy.get(selector.list_footer_menu).eq(0).click();
    cy.wait(2000);
    cy.url().should('eq', url.home);
    cy.wait(2000);
};

let live = () => {
    cy.get(selector.list_footer_menu).eq(1).click();
    cy.wait(2000);
    cy.url().should('eq', url.live);
    cy.wait(2000);
}

let library = () => {
    cy.get(selector.list_footer_menu).eq(2).click();
    cy.wait(2000);
    cy.url().should('eq', url.library);
    cy.wait(2000);
}

let account = () => {
    cy.get(selector.list_footer_menu).eq(-1).click();
    cy.wait(2000);
    cy.url().should('eq', url.account);
    cy.wait(2000);
}

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('1. Homapage Positive Test', () => {
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
        cy.wait(5000);
    });


    it('On Test - Homepage Menu Tengah Test', () => {
        cy.get(selector.logo).should('be.visible');
        cy.get(selector.list_menu_tengah).eq(0).should('be.visible');
        cy.get(selector.list_menu_tengah).eq(0).should('have.text', 'Exclusive');
        cy.get(selector.list_menu_tengah).eq(1).should('be.visible');
        cy.get(selector.list_menu_tengah).eq(1).should('have.text', 'News');
        cy.get(selector.list_menu_tengah).eq(2).should('be.visible');
        cy.get(selector.list_menu_tengah).eq(2).should('have.text', 'Radio+');
    });


    it('On Test - Homepage Menu Bawah Test', () => {
        cy.get(selector.list_footer_menu).eq(0).should('be.visible');
        cy.get(selector.list_footer_menu).eq(0).should('have.text', 'Home');
        cy.get(selector.list_footer_menu).eq(1).should('be.visible');
        cy.get(selector.list_footer_menu).eq(1).should('have.text', 'Live TV');
        cy.get(selector.list_footer_menu).eq(2).should('be.visible');
        cy.get(selector.list_footer_menu).eq(2).should('have.text', 'Library');
        cy.get(selector.list_footer_menu).eq(3).should('be.visible');
        cy.get(selector.list_footer_menu).eq(3).should('have.text', 'Account');
    });


    it('On Test - Homepage Menu Direct Test Menu Tengah', () => {
        exclusive();
        news();
        roov();
    });


    it('On Test - Homepage Menu Direct Test Menu Footer', () => {
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
});