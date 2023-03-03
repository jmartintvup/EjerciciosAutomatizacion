/// <reference types="Cypress" />
import LoadDelayPage from 
"../../../support/pageObjects/WebAutomation/delay/LoadDelayPage"

const page = new LoadDelayPage();

        
describe("web testing automation portfolio", function(){

    this.beforeEach(function(){

        cy.fixture("WebAutomationFixture").then(function(data){
            this.data=data
        }) 
    })

    beforeEach(function(){
        cy.visit(this.data.URL);
    });

    it ("Load Delay", function(){
        
        page.getLoadDelay().should('be.visible').click()
        //Usando cypress, tal y como está así valdría dado que es capaz
        //de detectar el spinner. Pero en caso de que no lo hubiese, 
        //una buena manera de hacerlo sería con una escucha a un elemento
        //de la página destino

        //con este método esperaremos hasta 10s al botón de la página destino
        //antes de hacer click en él.

        page.getButtonNotID().should('be.visible', {timeout:10000}).click()
    })



})