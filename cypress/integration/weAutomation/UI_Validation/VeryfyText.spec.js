/// <reference types="Cypress" />
import VerifyTextPage from 
"../../../support/pageObjects/webAutomation/UI_Validation/VerifyTextPage";

const page = new VerifyTextPage();

        
describe("web testing automation portfolio", function(){

    this.beforeEach(function(){

        cy.fixture("WebAutomationFixture").then(function(data){
            this.data=data
        }) 
    })

    beforeEach(function(){
        cy.visit(this.data.URL);
    });

    it ("Verify Text", function(){
        
        var text1
        var text2

        page.getVerifyText().click()

        //seleccionamos todo el texto,
        //incluso el que se formaría de forma dinámica.
        page.getAllText().then((f)=>{
            text1 = f.text()
            cy.log(text1)
        })

        //aquí primero separamos el que se podría cambiar (el span)
        // y después hacemos una búsqueda con el "welcome" + el 
        //texto dinámico. 
        //posteriormente comprobamos que ambos textos coinciden. 
        page.getOnlyVariableText().then((g)=>{
            text2 = g.text()
            cy.contains(" Welcome " + text2 + "!").then((h)=>{
                expect(h.text()).to.eq(text1)
            })
        })

    })


})