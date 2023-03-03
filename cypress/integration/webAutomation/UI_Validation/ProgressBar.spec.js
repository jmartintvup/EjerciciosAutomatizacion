/// <reference types="Cypress" />
import 'cypress-wait-until';
import ProgressBarPage from '../../../support/pageObjects/webAutomation/UI_Validation/ProgressBarPage'

const page = new ProgressBarPage();

        
describe("web testing automation portfolio", function(){

    this.beforeEach(function(){

        cy.fixture("WebAutomationFixture").then(function(data){
            this.data=data
        }) 
    })

    beforeEach(function(){
        cy.visit(this.data.URL);
    });

    it ("Progress Bar", function(){

        page.getProgressBar().click()

        //hago click en el botón de start para que empiece a avanzar la
        //barra de progreso

        page.getStartButton().click();

        //Escuchamos la barra de progreso hasta que su attr "style"
        //llegue a 75
        cy.waitUntil(() => {
            return page.getProgressBarElement()
            .should('have.attr', 'style')
            .then((style) => {

            //accedemos a style y sacamos sólo su valor numérico
            const width = parseInt(style.split(':')[1], 10);

            //imprimimos el valor actual
            cy.log("Progress: "+width)

            //si llega a 75 hacemos click en el botón
            if (width >= 75) {
                return page.getStopButton().click();
            }

            //mientras no llegue a 75, devolvemos false para mantenernos
            //en el waitUntil()
            return false; 
            })

        //le damos hasta 1min para llegar a 75, y comprobamos el valor
        //de >width cada 0.05s. Este intervalo se puede cambiar.
        }, { timeout: 60000, interval:50});     
            
    })


})