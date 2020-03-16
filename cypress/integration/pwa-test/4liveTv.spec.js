let url = {
    base: '/',
    base_url: 'https://dev.rctiplus.com',
};

let url_tv = {
    rcti: '/tv/rcti',
    mnctv: '/tv/mnctv',
    gtv: '/tv/gtv',
    inews: '/tv/inews'
};

let selector = {
    footer_menu: '.footer-wrapper-list',
    live_tv: '.tv-wrap'
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
    

    it('On Test - Validate Url Live Stream', () => {
        cy.get(selector.footer_menu).eq(1).click();
        cy.wait(5000);
        cy.url().should('eq', url.base_url + url_tv.rcti);
        cy.get(selector.live_tv).find('.row').find('.text-center').eq(1).click();
        cy.wait(5000);
        cy.url().should('eq', url.base_url + url_tv.mnctv);
        cy.get(selector.live_tv).find('.row').find('.text-center').eq(2).click();
        cy.wait(5000);
        cy.url().should('eq', url.base_url + url_tv.gtv);
        cy.get(selector.live_tv).find('.row').find('.text-center').eq(3).click();
        cy.wait(5000);
        cy.url().should('eq', url.base_url + url_tv.inews);
        cy.get(selector.live_tv).find('.row').find('.text-center').eq(0).click();
        cy.wait(5000);
        cy.url().should('eq', url.base_url + url_tv.rcti);
    })
    
});