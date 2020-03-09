let url = '/';

let sSearch = '.search-input';
let sLeftTopLink = '.left-top-link';
let sBtnLinkTopNav = '.btn-link-top-nav';
let sSwiperSlideCategory = '.swiper-slide';
let sTitleCategory = '.title';
let slideTitle = '.slide-title';
let searchCategoryResult = '.nav-tab-item';
let contentList = '.content-list strong';
let contentLists = '.content-list span';

let urlExplore = 'https://dev.rctiplus.com/explores';

let category = ['For You','Drama','Comedy', 'Sitcom', 'Talent Search', 'Animation', 'Variety/Musik', 'Special Event', 'Horror', 'Game Show'];
let categoryResult = ['Program', 'Episode', 'Extra', 'Clip', 'Photo'];


Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('Testing Search On Homepage', () => {
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

    it('On Test - Validate Direct after click search', () => {
        cy.get(sSearch).click();
        cy.wait(5000);

        if (
        cy.url('eq', urlExplore) ) {
            cy.log('Success')
            cy.url()
        } else {
            cy.log('Failed')
        }
    });

    it('On Test - Count Category', () => {
        cy.visit(urlExplore);
        let found = false;
        let count = 0;

        while (!found) {
            const nonExistent = Cypress.$(sSwiperSlideCategory);

            if (!nonExistent.length) {
                cy.reload();
                found = false;
                count = count + 1
                cy.wait(5000);

                if (count == 10) {
                    found = true;
                    cy.log('Element not found after 5 seconds..Exit from loop!!!');
                }
            } else {
                found = true;
            }
        }
    });

    it('On Test - Cek Category Is selected', () => {
        cy.visit(urlExplore);
        //cy.get(sSwiperSlideCategory).eq(0).click().check('.selected-slide-title');
        // cy.wait(20000)
        // For You
        // cy.get(sSwiperSlideCategory).eq(0).click();
        // cy.wait(5000);
        cy.get(slideTitle).eq(0).should('have.text', category[0]);
        cy.get(sTitleCategory).eq(0).should('have.text', category[0]);
       
        // Drama
        cy.get(sSwiperSlideCategory).eq(1).find('.slide-title').click();
        cy.wait(5000);
        cy.get(slideTitle).eq(1).should('have.text', category[1]);
        cy.get(sTitleCategory).eq(1).should('have.text', category[1]);

        // Comedy
        //cy.get(sSwiperSlideCategory).eq(2).click();
        // cy.wait(5000);
        cy.get(slideTitle).eq(2).should('have.text', category[2]);
        cy.get(sTitleCategory).eq(2).should('have.text', category[2]);

        // Sitcom
        // cy.get(sSwiperSlideCategory).eq(3).click();
        // cy.wait(5000);
        cy.get(slideTitle).eq(3).should('have.text', category[3]);
        cy.get(sTitleCategory).eq(3).should('have.text', category[3]);

        //
        // cy.get(sSwiperSlideCategory).eq(4).click();
        // cy.wait(5000);
        cy.get(slideTitle).eq(4).should('have.text', category[4]);
        cy.get(sTitleCategory).eq(4).should('have.text', category[4]);

        //
        // cy.get(sSwiperSlideCategory).eq(5).click();
        // cy.wait(5000);
        cy.get(slideTitle).eq(5).should('have.text', category[5]);
        cy.get(sTitleCategory).eq(5).should('have.text', category[5]);

        //
        // cy.get(sSwiperSlideCategory).eq(6).click();
        // cy.wait(5000);
        cy.get(slideTitle).eq(6).should('have.text', category[6]);
        cy.get(sTitleCategory).eq(6).should('have.text', category[6]);

        //
        // cy.get(sSwiperSlideCategory).eq(7).click();
        // cy.wait(5000);
        cy.get(sTitleCategory).eq(7).should('have.text', category[7]);
        cy.get(sTitleCategory).eq(7).should('have.text', category[7]);

        //
        // cy.get(sSwiperSlideCategory).eq(8).click();
        // cy.wait(5000);
        cy.get(sTitleCategory).eq(8).should('have.text', category[8]);
        cy.get(sTitleCategory).eq(8).should('have.text', category[8]);

        //
        // cy.get(sSwiperSlideCategory).eq(9).click();
        // cy.wait(5000);
        cy.get(sTitleCategory).eq(9).should('have.text', category[9]);
        cy.get(sTitleCategory).eq(9).should('have.text', category[9]);
    });

    it('On Test - Type on Search check Category Result', () => {
        cy.visit(urlExplore);

        //
        cy.get(sSearch).clear();
        cy.get(sSearch).type('Indonesian Idol');
        cy.get(searchCategoryResult).eq(0).click();
        cy.get(searchCategoryResult).eq(0).should('have.text', categoryResult[0]);

        cy.get(searchCategoryResult).eq(1).click();
        cy.get(searchCategoryResult).eq(1).should('have.text', categoryResult[1]);

        cy.get(searchCategoryResult).eq(2).click();
        cy.get(searchCategoryResult).eq(2).should('have.text', categoryResult[2]);

        cy.get(searchCategoryResult).eq(3).click();
        cy.get(searchCategoryResult).eq(3).should('have.text', categoryResult[3]);

        cy.get(searchCategoryResult).eq(4).click();
        cy.get(searchCategoryResult).eq(4).should('have.text', categoryResult[4]);
    });

    it('On Test - Search Not Found', () => {
        cy.visit(urlExplore);

        cy.get(sSearch).clear();
        cy.get(sSearch).type('sdjnfsdjjsdfbgfjbgsfj');
        cy.wait(5000);
        cy.get(contentList).should('eq', 'Ups! We can\'t find that.');
        cy.get(contentLists).should('eq', 'Try searching for another keyword, movie title, actor & actris, creator, writer or genre.');
    })
});