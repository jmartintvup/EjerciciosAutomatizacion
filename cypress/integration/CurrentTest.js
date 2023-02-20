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

        page.getTextInput().click()

        var texto

        //comprobamos que el texto inicial del botón no es el que vamos a introducir
        page.getUpdatingButton().click().then(($t)=>{
            texto = $t.text()
            expect(texto).to.not.eq('wawawa')
        })

        //escribes en la textbox
        page.getNewButtonName().type('wawawa')

        //Compruebo que el boton ha cambiado de nombre. 
        page.getUpdatingButton().click().then(($t)=>{
            texto = $t.text()
            expect(texto).to.eq('wawawa')
        })
        
    })
      
  })
