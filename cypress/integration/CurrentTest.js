/// <reference types="Cypress" 

import webAutomationPage from "../support/pageObjects/WebAutomationPage";
import 'cypress-wait-until';
import 'cypress-xpath';





describe("web testing automation interview", function(){


    this.beforeEach(function(){

        cy.fixture("webAutomationFixture").then(function(data){
            this.data=data
        }) 
    })

        

    it ("TestActual", function(){
    
            //para acceder a las funciones del page object
      const page = new webAutomationPage();

      //accedemos a la página web
      cy.visit(this.data.URL)
      
    
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
