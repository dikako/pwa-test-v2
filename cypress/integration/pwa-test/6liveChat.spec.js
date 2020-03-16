let url = {
    base: '/'
};

let selector = {
    footer_menu: '.footer-wrapper-list',
    tab_chat: '.live-chat-wrap',
    popup_login: '#swal2-content',
    popup_cancel: '.swal2-cancel-custom',
    popup_action: '.swal2-actions',
    input_username: '#email',
    input_password: '#password',
    button_login: '.btn-next'
};

let wording_popup = {
    login: 'Please Sign In\n\t\t\t\tWoops! Gonna sign in first!\n\t\t\t\tOnly a click away and you\n\t\t\t\tcan continue to enjoy\n\t\t\t\tRCTI+'
};

let user = {
    email: 'dikakoko04@gmail.com',
    password: 'dikakoko',
    nickname: 'dikakokojsjsjs'
};

let text = {
    chat: 'Rcti+ Emang Mantab'
}

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorage", () => {
    Object.keys(localStorage).forEach(key => {
        LOCAL_STORAGE_MEMORY[key] = localStorage[key];
    });
});

Cypress.Commands.add("restoreLocalStorage", () => {
    Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
        localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    });
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
        cy.wait(10000);
    });


    it('On Test - Chat Before Login', () => {
        cy.get(selector.footer_menu).eq(1).click();
        cy.wait(5000);
        cy.get(selector.tab_chat).find('.btn').eq(0).click();
        cy.get(selector.popup_login).should('have.text', wording_popup.login);
        cy.get(selector.popup_cancel).click();
        cy.get(selector.tab_chat).find('.btn').eq(0).click();
        cy.get(selector.popup_action).find('button[type="button"]').eq(1).click();
        login();
        chat();
    });


    it('On Test - Chat After Login', () => {
        toLoginPage();
        login();
        cy.get(selector.footer_menu).eq(1).click();
        chat();
    });

    afterEach(() => {
        cy.saveLocalStorage();
    });
});


function chat() {
        cy.get(selector.tab_chat).find('.btn').eq(0).click();
        cy.get('.col-9').find('#chat-input').type(text.chat);
        cy.get('.col-1').find('button[type="button"]').click();
        cy.get('.chat-message').find('.username').should('eq', user.nickname);
        cy.get('.chat-message').find('.message').should('eq', text.chat);
};


function toLoginPage() {
    cy.get(selector.footer_menu).eq(3).click();
    if (cy.get(selector.button_login).eq(1).should('be.visible')){
        cy.get(selector.button_login).eq(1).click();
    } else {
        cy.get(selector.button_login).click();
    }
    cy.wait(2000);
};

function login() {
    cy.get(selector.input_username).clear();
    cy.get(selector.input_username).type(user.email);
    cy.get(selector.input_password).clear();
    cy.get(selector.input_password).type(user.password);
    cy.get(selector.button_login).click();
    cy.wait(10000);
};