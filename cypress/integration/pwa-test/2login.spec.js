let url = '/';
let baseUrl = 'https://dev.rctiplus.com';
let urlHomepage = baseUrl + '/';
let urlLogin = baseUrl + '/login';

let foot = '.footer-wrapper-list';
let bNext = '.btn-next';
let username = '#email';
let password = '#password';
let accountMenu = '.list-group-item';
let search = '.search-input';
let rightMenu = '.right-menu';
let dropDown = '.dropdown-item';
let swalTitle = '.swal2-title';
let swalConfirm = '.swal2-confirm';
let wording = '.invalid-feedback';

let uname = 'dikakoko04@gmail.com';
let pass = 'dikakoko';
let invalidUname = 'dikakoko04@gmail.cc';
let invalidPass = 'passwordsalah';
let invalidEmail = 'dikakoko.com';
let invalidPhone = '6767867887868';
let name = /dikakoko/;
let invalid = /Invalid/;
let alertText = /User has not been registered/;
let wordingPass = /Please Try Again Password Is Incorrect/;
let wordingEmail = /Please Try Again Email Is Incorrect/;
let wordingMinPass = /Password must at least be 8 character/;
let wordingPhone = /Please Try Again Phone Number Is Incorrect/;

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
    it('Login Test Positive', () => {
        cy.get(foot).eq(3).click();
        cy.get(bNext).click();

        cy.get(username).clear();
        cy.get(username).type(uname);
        cy.get(password).clear();
        cy.get(password).type(pass);
        cy.get(bNext).click();
        cy.wait(10000);
        cy.url().should('eq', urlHomepage);

        cy.get(foot).eq(3).click();
        cy.get(accountMenu).eq(0).should(($text) => {
            const text = $text.text();
            expect(text).to.match(name);
        });
        cy.wait(10000);
        cy.get(search).should('be.visible');

        cy.get(accountMenu).eq(0).click();
        cy.get(rightMenu).click();
        cy.get(dropDown).eq(1).click();
        cy.wait(10000);
        cy.url().should('eq', urlLogin);
    });

    it('Login Test Negative - Disable Button', () => {
        cy.get(foot).eq(3).click();
        cy.get(bNext).click();


        cy.get(bNext).should('be.disabled');
    });

    it('Login Test Negative - Enable Button', () => {
        cy.get(foot).eq(3).click();
        cy.get(bNext).click();

        cy.get(username).clear();
        cy.get(username).type('aaaaaa');
        cy.get(password).clear();
        cy.get(bNext).should('not.be.disabled');
    });

    it('Login Test Negative - User Not Registered', () => {
        cy.get(foot).eq(3).click();
        cy.get(bNext).click();

        cy.get(username).clear();
        cy.get(username).type(invalidUname);
        cy.get(password).clear();
        cy.get(password).type(pass);
        cy.get(bNext).click();

        cy.get(swalTitle).eq(0).should(($alertTitle) => {
            const alertTitle = $alertTitle.text();
            expect(alertTitle).to.match(invalid);
        });

        cy.get(swalTitle).eq(1).should(($alertTexts) => {
            const alertTexts = $alertTexts.text();
            expect(alertText).to.match(alertText);
        });

        cy.get(swalConfirm).click();
    });

    it('Login Test Negative - Invalid Password', () => {
        cy.get(foot).eq(3).click();
        cy.get(bNext).click();

        cy.get(username).clear();
        cy.get(username).type(uname);
        cy.get(password).clear();
        cy.get(password).type(invalidPass);
        cy.get(bNext).click();

        cy.get(wording).should(($inPass) => {
            const inPass = $inPass.text();
            expect(inPass).to.match(wordingPass);
        });
    });

    it('Login Test Negative - Invalid Email', () => {
        cy.get(foot).eq(3).click();
        cy.get(bNext).click();

        cy.get(username).clear();
        cy.get(username).type(invalidEmail);
        cy.get(password).clear();
        cy.get(password).type(invalidPass);
        cy.get(bNext).click();

        cy.get(wording).should(($inEmail) => {
            const inEmail = $inEmail.text();
            expect(inEmail).to.match(wordingEmail);
        });
    });

    it('Login Test Negative - Password Kurang dari 8', () => {
        cy.get(foot).eq(3).click();
        cy.get(bNext).click();

        cy.get(username).clear();
        cy.get(username).type(uname);
        cy.get(password).clear();
        cy.get(password).type('pass');
        cy.get(bNext).click();

        cy.get(wording).should(($inMinPass) => {
            const inMinPass = $inMinPass.text();
            expect(inMinPass).to.match(wordingMinPass);
        });
    });

    it('Login Test Negative - Invalid Phone Number', () => {
        cy.get(foot).eq(3).click();
        cy.get(bNext).click();

        cy.get(username).clear();
        cy.get(username).type(invalidPhone);
        cy.get(password).clear();
        cy.get(password).type(pass);
        cy.get(bNext).click();

        cy.get(wording).should(($inPhone) => {
            const inPhone = $inMinPass.text();
            expect(inMinPass).to.match(wordingPhone);
        });
    });
});