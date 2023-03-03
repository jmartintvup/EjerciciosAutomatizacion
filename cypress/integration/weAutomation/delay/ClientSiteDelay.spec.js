/// <reference types="Cypress" />
import ClientDelayPage from 
"../../../support/pageObjects/WebAutomation/delay/ClientDelayPage"

const page = new ClientDelayPage();

        
describe("web testing automation portfolio", function(){

    this.beforeEach(function(){

        cy.fixture("WebAutomationFixture").then(function(data){
            this.data=data
        }) 
    })

    beforeEach(function(){
        cy.visit(this.data.URL);
    });

    it ("Client Side Delay", function(){
        
        //prácticamente el mismo test que el anterior. Lo que cambia es
        //que uno es por un AJAX y el otro por JS.
        page.getClientSideDelay().click()

        page.getAJAXButton().click()

        page.getAJAXText().click()
    })



})