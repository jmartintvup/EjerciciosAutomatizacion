/// <reference types="Cypress" />
import AJAXPage from 
"../../../support/pageObjects/WebAutomation/delay/AJAXPage"

const page = new AJAXPage();

        
describe("web testing automation portfolio", function(){

    this.beforeEach(function(){

        cy.fixture("WebAutomationFixture").then(function(data){
            this.data=data
        }) 
    })

    beforeEach(function(){
        cy.visit(this.data.URL);
    });


    it ("AJAX Data", function(){
        

        //click para acceder a la página de AJAX
        page.getAJAX().click()

        //click en el botón para hacer la request
        page.getAJAXButton().click()

        //como el contenido se añade al dom de forma visible, no vale con
        //poner el timeout en el should, dado que sólo esperaría el
        //tiempo predefinido (4s en mi caso) en encontrar el texto en el dom.
        //Yo he alterado el timeout en el apartado de pageObject
        page.getAJAXText().should('be.visible').click()
    })

})