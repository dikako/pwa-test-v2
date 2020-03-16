let url = {
    base: '/',
    register: '/register', 
    forget_password: '/forget-password', 
    forget_password_verify_otp: '/forget-password/verify-otp', 
    register_phone_step2: '/register/phone/step2', 
    register_phone_step3: '/register/phone/step3', 
    register_interest: '/register/Interest', 
    edit_profile: '/edit-profile', 
    user_edit_form_field: '/user/edit/form-field', 
    user_change_password: '/user/change-password', 
    user_change_password_verify_otp: '/user/change-password/verify-otp', 
    user_edit_interest: '/user/edit/interest',
    login: '/login'
};

let selector = {
    button_login: '.btn-next',
    input_username: '#email',
    input_password: '#password',
    list_menu_account: '.list-group-item',
    footer_menu: '.footer-wrapper-list'
};

let user = {
    email: 'dikakoko04@gmail.com',
    password: 'dikakoko',
    fullname: /dikakoko/
};

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

describe('10. Url Protected', () => {
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

    it('On Test -  Condition Login', () => {
        login();
        cy.visit(url.register);
    });
    
    afterEach(() => {
        cy.saveLocalStorage();
    });
});

function login(){
    cy.visit(url.login);
    cy.get(selector.input_username).clear();
    cy.get(selector.input_username).type(user.email);
    cy.get(selector.input_password).clear();
    cy.get(selector.input_password).type(user.password);
    cy.wait(2000);
    cy.get(selector.button_login).click();
    cy.wait(10000);
    cy.get(selector.footer_menu).eq(3).click();
    cy.get(selector.menu_account).eq(0).should(($text) => {
        const text = $text.text();
        expect(text).to.match(user.fullname);
        cy.wait(2000);
    });
};




