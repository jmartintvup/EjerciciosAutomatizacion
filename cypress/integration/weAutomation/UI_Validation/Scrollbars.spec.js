/// <reference types="Cypress" />
import ScrollBarPage from 
"../../../support/pageObjects/webAutomation/UI_Validation/ScrollbarsPage";

const page = new ScrollBarPage();

        
describe("web testing automation portfolio", function(){

    this.beforeEach(function(){

        cy.fixture("WebAutomationFixture").then(function(data){
            this.data=data
        }) 
    })

    beforeEach(function(){
        cy.visit(this.data.URL);
    });

    it ("Scrollbars", function(){

        page.getScrollbars().click()

        //centramos el botón y hacemos click en él.
        page.getHidingButton().scrollIntoView().click()
    })



})