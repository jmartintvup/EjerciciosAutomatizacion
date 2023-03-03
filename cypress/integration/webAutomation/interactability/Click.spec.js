/// <reference types="Cypress" />
import ClickPage from 
"../../../support/pageObjects/WebAutomation/interactability/ClickPage"

const page = new ClickPage();

        
describe("web testing automation portfolio", function(){

    this.beforeEach(function(){

        cy.fixture("WebAutomationFixture").then(function(data){
            this.data=data
        }) 
    })

    beforeEach(function(){
        cy.visit(this.data.URL);
    });

    it ("Click", function(){
        
        page.getClick().click()

        //El problema con este test era que el botón no registra bien los 
        //clicks falsos. Aquí comprobamos primero que el botón sea visible,
        //que la clase inicial es btn-primary y que después del click es
        //btn-success

        page.getBadButton()
        .should('have.class', 'btn-primary')
        .click()
        .should('have.class', 'btn-success')
    })


})