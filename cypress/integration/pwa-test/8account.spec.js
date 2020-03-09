let url = '/';
let urlAccount = 'https://dev.rctiplus.com/profile';
let urlEditProfile = 'https://dev.rctiplus.com/edit-profile';
let urlQrCode = 'https://dev.rctiplus.com/qrcode';
let urlHistory = 'https://dev.rctiplus.com/history';
let urlMylist = 'https://dev.rctiplus.com/mylist';
let urlConWacthing = 'https://dev.rctiplus.com/continue-watching';
let urlTnc = 'https://dev.rctiplus.com/terms-&-conditions';
let urlPP = 'https://dev.rctiplus.com/privacy-policy';
let urlContacUs = 'https://dev.rctiplus.com/contact-us';
let urlFaq = 'https://dev.rctiplus.com/faq';

let sfooterMenu = '.footer-wrapper-list';
let susername = '#email';
let spassword = '#password';
let sbutton = '.btn-next';
let smenuAccount = '.list-group-item';
let seditProfile = '.form-group';
let snotif = '.top-notification-container';
let headerTitle = '.header-nav-verif';

let uname = 'dikakoko04@gmail.com';
let pass = 'dikakoko';
let maxminInterest = 'Cannot choose more than 3 interests';
let playstoreDownload = 'To be able to see and watching your downloaded file, please download RCTI+ application on Playstore';

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('Account Test', () => {
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

    it('On Test - Account Login', () => {
        cy.get(sfooterMenu).eq(3).click();
        cy.get('.sub-btn').find('button[type="button"]').click();

        cy.get(susername).clear();
        cy.get(susername).type(uname);
        cy.get(spassword).clear();
        cy.get(spassword).type(pass)
        cy.get(sbutton).click();
        cy.wait(5000);
    });

    it('On Test - Edit Profile [Nickname]', () => {
        cy.get(sfooterMenu).eq(3).click();
        cy.get(smenuAccount).eq(0).click();
        cy.wait(5000);
        cy.url().should('eq', urlEditProfile);

        cy.get(seditProfile).eq(0).click();
        cy.get(seditProfile).eq(0).find('.input-group').find('input[type="text"]').clear();
        cy.get(seditProfile).eq(0).find('.input-group').find('input[type="text"]').type('dikako');
        cy.get(seditProfile).eq(1).find('.btn-next').click();
        cy.wait(5000);
    });

    it('On Test - Edit Profile [Fullname]', () => {
        cy.get(sfooterMenu).eq(3).click();
        cy.get(smenuAccount).eq(0).click();
        cy.wait(5000);
        cy.url().should('eq', urlEditProfile);

        cy.get(seditProfile).eq(1).click();
        cy.get(seditProfile).eq(0).find('.input-group').find('input[type="text"]').clear();
        cy.get(seditProfile).eq(0).find('.input-group').find('input[type="text"]').type('Dika Koko');
        cy.get(seditProfile).eq(0).find('.btn-next').click();
        cy.wait(5000);
    });

    it('On Test - Edit Profile [Birthday]', () => {
        cy.get(sfooterMenu).eq(3).click();
        cy.get(smenuAccount).eq(0).click();
        cy.wait(5000);
        cy.url().should('eq', urlEditProfile);

        cy.get(seditProfile).eq(2).click();
        cy.get(seditProfile).eq(0).find('input[type="text"]').clear();
        cy.get(seditProfile).eq(0).find('input[type="text"]').type('23011998');
        cy.get(seditProfile).eq(0).find('.btn-next').click();
        cy.wait(5000);
    });

    it('On Test - Edit Profile [Birthday]', () => {
        cy.get(sfooterMenu).eq(3).click();
        cy.get(smenuAccount).eq(0).click();
        cy.wait(5000);
        cy.url().should('eq', urlEditProfile);

        cy.get(seditProfile).eq(3).click();
        cy.get(seditProfile).eq(0).find('.input-group').find('.form-control-ff').select('Male');
        cy.get(seditProfile).eq(0).find('.btn-next').click();
        cy.wait(5000);
    });

    it('On Test - Edit Profile [Phone Number]', () => {
        cy.get(sfooterMenu).eq(3).click();
        cy.get(smenuAccount).eq(0).click();
        cy.wait(5000);
        cy.url().should('eq', urlEditProfile);

        cy.get(seditProfile).eq(4);
    });

    it('On Test - Edit Profile [Email]', () => {
        cy.get(sfooterMenu).eq(3).click();
        cy.get(smenuAccount).eq(0).click();
        cy.wait(5000);
        cy.url().should('eq', urlEditProfile);

        cy.get(seditProfile).eq(5);
    });

    it('On Test - Edit Profile [Interest]', () => {
        cy.get(sfooterMenu).eq(3).click();
        cy.get(smenuAccount).eq(0).click();
        cy.wait(5000);
        cy.url().should('eq', urlEditProfile);

        cy.get(seditProfile).eq(6);

        // Before
        cy.get('.col-6').eq(2).click();
        cy.get('.col-6').eq(5).click();
        cy.get('.col-6').eq(7).click();

        // After 
        cy.get('.col-6').eq(0).click();
        cy.get('.col-6').eq(1).click();
        cy.get('.col-6').eq(2).click();
        cy.get('.btn-next-position').find('.btn-next');
        cy.wait(5000);

        cy.get(seditProfile).eq(6);

        // Before 2
        cy.get('.col-6').eq(0).click();
        cy.get('.col-6').eq(1).click();
        cy.get('.col-6').eq(2).click();

        // After 2
        cy.get('.col-6').eq(2).click();
        cy.get('.col-6').eq(5).click();
        cy.get('.col-6').eq(7).click();
        cy.get('.btn-next-position').find('.btn-next');
        cy.wait(5000);
    });

    it('On Test - Edit Profile [Interest] Negative Scenario', () => {
        cy.get(sfooterMenu).eq(3).click();
        cy.get(smenuAccount).eq(0).click();
        cy.wait(5000);
        cy.url().should('eq', urlEditProfile);

        cy.get(seditProfile).eq(6);
        cy.wait(5000);
        cy.get('.swal2-content').find('#swal2-content').should('have.text', maxminInterest);
        cy.wait(5000);
        cy.get('.swal2-actions').find('.swal2-confirm').click();
    });

    it('On Test - Scan QRCODE', () => {
        cy.get(sfooterMenu).eq(3).click();
        cy.get(smenuAccount).eq(1).click();
        cy.wait(5000);
        cy.url().should('eq', urlQrCode);
        cy.get(headerTitle).find('p').should('have.text', 'Scan QR Code');
    });

    it('On Test - History', () => {
        cy.get(sfooterMenu).eq(3).click();
        cy.get(smenuAccount).eq(2).click();
        cy.wait(5000);
        cy.url().should('eq', urlHistory);
        cy.get(headerTitle).find('p').should('have.text', 'History');
    });

    it('On Test - Download', () => {
        cy.get(sfooterMenu).eq(3).click();
        cy.get(smenuAccount).eq(3).click();
        cy.wait(5000);
        cy.get('.swal2-content').find('#swal2-content').should('have.text', playstoreDownload);
        cy.get('.swal2-actions').find('button[type="button"]').click();
        cy.wait(5000);
        cy.url().should('eq', urlAccount);
    });

    it('On Test - MyList', () => {
        cy.get(sfooterMenu).eq(3).click();
        cy.get(smenuAccount).eq(4).click();
        cy.wait(5000);
        cy.url().should('eq', urlMylist);
        cy.get(headerTitle).find('p').should('have.text', 'My List');
    });

    it('On Test - Continue Watching', () => {
        cy.get(sfooterMenu).eq(3).click();
        cy.get(smenuAccount).eq(5).click();
        cy.wait(5000);
        cy.url().should('eq', urlConWacthing);
        cy.get(headerTitle).find('p').should('have.text', 'Continue Watching');
    });

    it('On Test - Terms and Conditions', () => {
        cy.get(sfooterMenu).eq(3).click();
        cy.get(smenuAccount).eq(6).click();
        cy.wait(5000);
        cy.url().should('eq', urlTnc);
        cy.get(headerTitle).find('p').should('have.text', 'Terms and Conditions');
    });

    it('On Test - Privacy Policy', () => {
        cy.get(sfooterMenu).eq(3).click();
        cy.get(smenuAccount).eq(7).click();
        cy.wait(5000);
        cy.url().should('eq', urlPP);
        cy.get(headerTitle).find('p').should('have.text', 'Privacy Policy');
    });

    it('On Test - Contact Us', () => {
        cy.get(sfooterMenu).eq(3).click();
        cy.get(smenuAccount).eq(8).click();
        cy.wait(5000);
        cy.url().should('eq', urlContacUs);
        cy.get(headerTitle).find('p').should('have.text', 'Contact Us');
    });

    it('On Test - Faq', () => {
        cy.get(sfooterMenu).eq(3).click();
        cy.get(smenuAccount).eq(9).click();
        cy.wait(5000);
        cy.url().should('eq', urlFaq);
        cy.get(headerTitle).find('p').should('have.text', 'Faq');
    });    
});