/// <reference types="Cypress" />
import TextInputPage from 
"../../../support/pageObjects/webAutomation/UI_Validation/TextInputPage";

const page = new TextInputPage();

        
describe("web testing automation portfolio", function(){

    this.beforeEach(function(){

        cy.fixture("WebAutomationFixture").then(function(data){
            this.data=data
        }) 
    })

    beforeEach(function(){
        cy.visit(this.data.URL);
    });

    it ("Text Input", function(){

        page.getTextInput().click()

        let texto

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