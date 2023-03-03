/// <reference types="Cypress" />
import LayersPage from 
"../../../support/pageObjects/webAutomation/interactability/LayersPage";

const page = new LayersPage();

        
describe("web testing automation portfolio", function(){

    this.beforeEach(function(){

        cy.fixture("WebAutomationFixture").then(function(data){
            this.data=data
        }) 
    })

    beforeEach(function(){
        cy.visit(this.data.URL);
    });

    it ("Hidden Layers", function(){
        
        page.getHiddenLayers().click()

        //cuando intentas hacer click y te da el error que incluya el texto
        // is being covered by...
        //el test pasa como OK, porque no es posible hacer click.

        page.getGreenButtonHidden().then(() => {

            cy.on('fail', (error, runnable) => {

                //if the error does not in
                if (!error.message.includes('is being covered by another element:')) {
                    throw error
                }
    
            })
          })
    
        page.getGreenButtonHidden().click()

        cy.on('uncaught:exception', (err) => {
            expect(err.message).to.include('is being covered by another element:')
            return false
        })
    })




})