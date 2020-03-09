let url = '/';
let femail = '#email';
let fpassword = '#password';
let fpassword2 = '#password2';
let bnext = '.btn-next';
let registerLink = '.text-red';
let foot = '.footer-wrapper-list';
let bNext = '.btn-next';
let registerBy = '.nav-signup-item';
let alert = '.invalid-feedback';

let onEmail = /Email/;
let wordPassmin8 = /Password must at least 8 characters/;
let wordpass8 = /please try again, email has been taken/;
let wordPassNotSame = /Password must match/;
let wordInEmail = /Please Try Again Email Is Incorrect/;
let wordInPhone = /Please Try Again Phone Number Is Incorrect/;
let pass6 = 'dididi';
let pass8 = 'passwords';
let readyEmail = 'dikakoko04@gmail.com';
let readyPhone = "082278843303";
let inEmail = 'dikakoko.com';
let inPhone = '568457645786';

let faker = require('faker');
let remail = faker.internet.email();
let rphone = faker.phone.phoneNumber('0832########');

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('Register Test', () => {
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

    it('Negative - Register Test By Email [Invalid Email]', () => {
        cy.get(foot).eq(3).click();
        cy.get(bNext).click();
        cy.get(registerLink).eq(0).click();

        cy.get(registerBy).eq(0).should(($byEmail) => {
            const byEmail = $byEmail.text();
            expect(byEmail).to.match(onEmail);
        });

        cy.get(femail).clear();
        cy.get(femail).type(inEmail);
        cy.get(fpassword).clear();
        cy.get(fpassword).type(pass8);
        cy.get(fpassword2).clear();
        cy.get(fpassword2).type(pass8);
        cy.get(bNext).click();

        cy.get(alert).should(($alertPassmin8) => {
            const alertPassmin8 = $alertPassmin8.text();
            expect(alertPassmin8).to.match(wordInEmail);
        });
    });

    it('Negative - Register Test By Email [Password -8]', () => {
        cy.get(foot).eq(3).click();
        cy.get(bNext).click();
        cy.get(registerLink).eq(0).click();

        cy.get(registerBy).eq(0).should(($byEmail) => {
            const byEmail = $byEmail.text();
            expect(byEmail).to.match(onEmail);
        });

        cy.get(femail).clear();
        cy.get(femail).type(remail);
        cy.get(fpassword).clear();
        cy.get(fpassword).type(pass6);
        cy.get(fpassword2).clear();
        cy.get(fpassword2).type(pass6);
        cy.get(bNext).click();

        cy.get(alert).should(($alertPassmin8) => {
            const alertPassmin8 = $alertPassmin8.text();
            expect(alertPassmin8).to.match(wordPassmin8);
        });
    });

    it('Negative - Register Test By Email [Akun Sudah Register]', () => {
        cy.get(foot).eq(3).click();
        cy.get(bNext).click();
        cy.get(registerLink).eq(0).click();

        cy.get(registerBy).eq(0).should(($byEmail) => {
            const byEmail = $byEmail.text();
            expect(byEmail).to.match(onEmail);
        });

        cy.get(femail).clear();
        cy.get(femail).type(readyEmail);
        cy.get(fpassword).clear();
        cy.get(fpassword).type(pass8);
        cy.get(fpassword2).clear();
        cy.get(fpassword2).type(pass8);
        cy.get(bNext).click();

        cy.get(alert).should(($alertPassmin8) => {
            const alertPassmin8 = $alertPassmin8.text();
            expect(alertPassmin8).to.match(wordpass8);
        });
    });

    it('Negative - Register Test By Email [Password Tidak Sama]', () => {
        cy.get(foot).eq(3).click();
        cy.get(bNext).click();
        cy.get(registerLink).eq(0).click();

        cy.get(registerBy).eq(0).should(($byEmail) => {
            const byEmail = $byEmail.text();
            expect(byEmail).to.match(onEmail);
        });

        cy.get(femail).clear();
        cy.get(femail).type(remail);
        cy.get(fpassword).clear();
        cy.get(fpassword).type(pass8);
        cy.get(fpassword2).clear();
        cy.get(fpassword2).type(remail);
        cy.get(bNext).click();

        cy.get(alert).should(($alertPassmin8) => {
            const alertPassmin8 = $alertPassmin8.text();
            expect(alertPassmin8).to.match(wordPassNotSame);
        });
    });

    it('Negative - Register Test By Phone [Invalid Phone]', () => {
        cy.get(foot).eq(3).click();
        cy.get(bNext).click();
        cy.get(registerLink).eq(0).click();

        cy.get(registerBy).eq(0).should(($byEmail) => {
            const byEmail = $byEmail.text();
            expect(byEmail).to.match(onEmail);
        });

        cy.get(femail).clear();
        cy.get(femail).type(inPhone);
        cy.get(fpassword).clear();
        cy.get(fpassword).type(pass8);
        cy.get(fpassword2).clear();
        cy.get(fpassword2).type(pass8);
        cy.get(bNext).click();

        cy.get(alert).should(($alertPassmin8) => {
            const alertPassmin8 = $alertPassmin8.text();
            expect(alertPassmin8).to.match(wordInPhone);
        });
    });

    it('Negative - Register Test By Phone [Password -8]', () => {
        cy.get(foot).eq(3).click();
        cy.get(bNext).click();
        cy.get(registerLink).eq(0).click();

        cy.get(registerBy).eq(0).should(($byEmail) => {
            const byEmail = $byEmail.text();
            expect(byEmail).to.match(onEmail);
        });

        cy.get(femail).clear();
        cy.get(femail).type(rphone);
        cy.get(fpassword).clear();
        cy.get(fpassword).type(pass6);
        cy.get(fpassword2).clear();
        cy.get(fpassword2).type(pass6);
        cy.get(bNext).click();

        cy.get(alert).should(($palertPassmin8) => {
            const palertPassmin8 = $palertPassmin8.text();
            expect(palertPassmin8).to.match(wordPassmin8);
        });
    });


});
