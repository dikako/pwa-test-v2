let url = {
    base: '/',
};

let selector = {
    footer_menu: '.footer-wrapper-list',
    button_login: '.btn-next',
    input_username: '#email',
    input_password: '#password',
    menu_account: '.list-group-item',
    input_search: '.search-input',
    three_dot: '.right-menu',
    list_three_dot: '.dropdown-item',
    popup_text: '#swal2-content',
    popup_confirm: '.swal2-confirm',
    alert: '.invalid-feedback'
};

let user = {
    email: 'dikakoko04@gmail.com',
    password: 'dikakoko',
    fullname: /dikakoko/,
    email_not_register: 'dikakoko04@gmail.cc',
    invalid_email: 'dikakoko.com',
    invalid_password: 'passwordsalah',
    invalid_phone: '6767867887868',
};

let wording_popup = {
    not_register: /User has not been registered/,
};

let wording = {
    invalid_password: /Please Try Again Password Is Incorrect/,
    invalid_email: /Please Try Again Email Is Incorrect/,
    minimal_password: /Password must at least be 8 character/,
    invalid_phone: /Please Try Again Phone Number Is Incorrect/
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


    it('Login Test Positive', () => {
        toLoginPage();
        cy.get(selector.input_username).clear();
        cy.get(selector.input_username).type(user.email);
        cy.get(selector.input_password).clear();
        cy.get(selector.input_password).type(user.password);
        cy.get(selector.button_login).click();
        
        cy.wait(20000);
        cy.get(selector.footer_menu).eq(3).click();
        cy.get(selector.menu_account).eq(0).should(($text) => {
            const text = $text.text();
            expect(text).to.match(user.fullname);
        });
        cy.wait(5000);
        cy.get(selector.input_search).should('be.visible');
        cy.get(selector.menu_account).eq(0).click();
        cy.get(selector.three_dot).find('.dropdown').find('button[type="button"]').click();
        cy.get(selector.list_three_dot).eq(1).click();
        cy.wait(2000);
    });


    it('Login Test Negative - Disable Button', () => {
        toLoginPage();
        cy.get(selector.button_login).should('be.disabled');
    });


    it('Login Test Negative - Enable Button', () => {
        toLoginPage();
        cy.get(selector.input_username).clear();
        cy.get(selector.input_username).type('aaaaaa');
        cy.get(selector.input_password).clear();
        cy.get(selector.button_login).should('not.be.disabled');
    });


    it('Login Test Negative - User Not Registered', () => {
        toLoginPage();
        cy.get(selector.input_username).clear();
        cy.get(selector.input_username).type(user.email_not_register);
        cy.get(selector.input_password).clear();
        cy.get(selector.input_password).type(user.password);
        cy.get(selector.button_login).click();
        cy.wait(5000);
        cy.get(selector.popup_text).should(($alertText) => {
            const alertText = $alertText.text();
            expect(alertText).to.match(wording_popup.not_register);
        });
        cy.get(selector.popup_confirm).click();
    });


    it('Login Test Negative - Invalid Password', () => {
        toLoginPage();
        cy.get(selector.input_username).clear();
        cy.get(selector.input_username).type(user.email);
        cy.get(selector.input_password).clear();
        cy.get(selector.input_password).type(user.invalid_password);
        cy.get(selector.button_login).click();
        cy.wait(5000);
        cy.get(selector.alert).should(($inPass) => {
            const inPass = $inPass.text();
            expect(inPass).to.match(wording.invalid_password);
        });
    });

    it('Login Test Negative - Invalid Email', () => {
        toLoginPage();
        cy.get(selector.input_username).clear();
        cy.get(selector.input_username).type(user.invalid_email);
        cy.get(selector.input_password).clear();
        cy.get(selector.input_password).type(user.invalid_password);
        cy.get(selector.button_login).click();
        cy.get(selector.alert).should(($inEmail) => {
            const inEmail = $inEmail.text();
            expect(inEmail).to.match(wording.invalid_email);
        });
    });


    it('Login Test Negative - Password Kurang dari 8', () => {
        toLoginPage();
        cy.get(selector.input_username).clear();
        cy.get(selector.input_username).type(user.email);
        cy.get(selector.input_password).clear();
        cy.get(selector.input_password).type('pass');
        cy.get(selector.button_login).click();
        cy.get(selector.alert).should(($inMinPass) => {
            const inMinPass = $inMinPass.text();
            expect(inMinPass).to.match(wording.minimal_password);
        });
    });


    it('Login Test Negative - Invalid Phone Number', () => {
        toLoginPage();
        cy.get(selector.input_username).clear();
        cy.get(selector.input_username).type(user.invalid_phone);
        cy.get(selector.input_password).clear();
        cy.get(selector.input_password).type(user.password);
        cy.get(selector.button_login).click();
        cy.get(selector.alert).should(($inPhone) => {
            const inPhone = $inPhone.text();
            expect(inPhone).to.match(wording.invalid_phone);
        });
    });


    afterEach(() => {
        cy.saveLocalStorage();
    });
});


function toLoginPage() {
    cy.get(selector.footer_menu).eq(3).click();
    if (cy.get(selector.button_login).eq(1).should('be.visible')){
        cy.get(selector.button_login).eq(1).click();
    } else {
        cy.get(selector.button_login).click();
    }
    cy.wait(2000);
};