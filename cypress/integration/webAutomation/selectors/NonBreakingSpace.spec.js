/// <reference types="Cypress" />
import 'cypress-xpath';
import NBSPage from '../../../support/pageObjects/webAutomation/selectors/NBSPage';

const page = new NBSPage();

        
describe("web testing automation portfolio", function(){

    this.beforeEach(function(){

        cy.fixture("WebAutomationFixture").then(function(data){
            this.data=data
        }) 
    })

    beforeEach(function(){
        cy.visit(this.data.URL);
    });


    it ("Non-Breaking Space", function(){


        //accedemos a la página web
        cy.visit(this.data.URL)
      
        page.getNonBreakingSpace().click()
    
        //reemplazamos el espacio entre "My" y "Button" por un
        //nonBreakingSpaceCharacter.
        //Ahora el selector Xpath funciona
        //(Dejo el selector explícito para que se vea mejor)
        cy.xpath("//button[text()='My\u00A0Button']").click();
    })


})

