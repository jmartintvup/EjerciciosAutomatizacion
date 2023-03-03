/// <reference types="Cypress" />
import SampleAppPage from 
"../../../support/pageObjects/webAutomation/UI_Validation/SampleAppPage";

const page = new SampleAppPage();

        
describe("web testing automation portfolio", function(){

    this.beforeEach(function(){

        cy.fixture("WebAutomationFixture").then(function(data){
            this.data=data
        }) 
    })

    beforeEach(function(){
        cy.visit(this.data.URL);
    });


    it ("Sample App", function(){
        

        //accedemos a la página web
        cy.visit(this.data.URL)
      

        page.getSampleApp().click()

        page.getLogin().click()
        page.getLoginStatus().should('have.text', 'Invalid username/password')
        page.getUserName().type(this.data.userName)
        page.getPassword().type(this.data.password)
        page.getLogin().click()
        page.getLoginStatus().should('have.text', 'Welcome, '+this.data.userName +'!')
    })

})