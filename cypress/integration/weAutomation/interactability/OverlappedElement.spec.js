/// <reference types="Cypress" />
import OverlappedPage from 
"../../../support/pageObjects/webAutomation/interactability/OverlappedPage";

const page = new OverlappedPage();

        
describe("web testing automation portfolio", function(){

    this.beforeEach(function(){

        cy.fixture("WebAutomationFixture").then(function(data){
            this.data=data
        }) 
    })

    beforeEach(function(){
        cy.visit(this.data.URL);
    });

    it ("Overlapped Element", function(){
        

        page.getOverlappedElement().click()

        //seleccionamos el elemento, lo centramos con las barras de navegación,
        //escribimos en él y comprobamos que se ha escrito en él.
        page.getName().scrollIntoView().type('1234qwerty')
        .should('have.value','1234qwerty')
    })

})