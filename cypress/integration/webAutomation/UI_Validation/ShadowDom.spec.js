/// <reference types="Cypress" />
import ShadowDomPage from 
"../../../support/pageObjects/webAutomation/UI_Validation/ShadowDomPage";

const page = new ShadowDomPage();

        
describe("web testing automation portfolio", function(){

    this.beforeEach(function(){

        cy.fixture("WebAutomationFixture").then(function(data){
            this.data=data
        }) 
    })

    beforeEach(function(){
        cy.visit(this.data.URL);
    });

    it ("Shadow DOM", function(){

        page.getShadowDOM().click()

        var texto
        
        //generamos el texto
        page.getGenerateButton().click()

        //accedemos al texto generado y lo guardamos en texto
        page.getEditField().then(($t)=>{
            texto = $t.val()
        })

        //hacemos click en el botón que lo copia al portapapeles
        page.getCopyButton().click();

        //accedemos al portapapeles y comprobamos que el texto copiado
        //coincide con el texto generado.
        cy.window().then((win) => {
            win.navigator.clipboard.readText().then((text) => {
            expect(text).to.eq(texto);
            });
        });
    })


})