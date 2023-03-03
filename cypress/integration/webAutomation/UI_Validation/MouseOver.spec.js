/// <reference types="Cypress" />
import MouseOverPage from 
"../../../support/pageObjects/webAutomation/UI_Validation/MouseOverPage";

const page = new MouseOverPage();

        
describe("web testing automation portfolio", function(){

    this.beforeEach(function(){

        cy.fixture("WebAutomationFixture").then(function(data){
            this.data=data
        }) 
    })

    beforeEach(function(){
        cy.visit(this.data.URL);
    });

    it ("Mouse Over", function(){
    
        page.getMouseOver().click()
      
        //comprobamos que el clickCount comienza a 0
        page.getClickCount().should('have.text','0')        
        
        //Colocamos el ratón encima del botón, lo que genera un cambio del DOM
        page.getDynamicButton().trigger('mouseenter')

        //seleccionamos el nuevo elemento y hacemos click 2 veces
        page.getActiveLink().should('be.visible').click().click()

        //Comprobamos que se ha hecho click dos veces.
        page.getClickCount().should('have.text','2')
    })


})