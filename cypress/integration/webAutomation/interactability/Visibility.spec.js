/// <reference types="Cypress" />
import VisibilityPage from 
"../../../support/pageObjects/webAutomation/interactability/VisibilityPage";

const page = new VisibilityPage();


//This Test should be executed HEADED.

        
describe("web testing automation portfolio", function(){

    this.beforeEach(function(){

        cy.fixture("WebAutomationFixture").then(function(data){
            this.data=data
        }) 
    })

    beforeEach(function(){
        
        cy.visit(this.data.URL);
    });

    it ("Visibility", function(){
        
        page.getVisibility().click()

        cy.viewport(1920, 1080); // Set the viewport to a specific size

        page.getHideButton().click()

        //Estos 5 casos cypress los detecta como no visibles automáticamente
        page.getRemovedButton().should('not.exist')
        page.getZeroWidthButton().should('not.be.visible')
        page.getTransparentButton().should('not.be.visible')
        page.getInvisibleButton().should('not.be.visible')
        page.getNotInDisplayButton().should('not.be.visible')

        //cuando el botón está detrás de otro elemento, cypress sigue 
        //interpretando visible=true, por lo que vamos a describir
        //los límites del elemento superpuesto y mediante una serie
        //de aserciones determinar que el botón no es visible.
        page.getHidingLayer().then(($overlay) => {
            const overlayClientRects = $overlay[0].getClientRects();
          
            // Combine all client rects to create a bounding box for the overlay
            const overlayBox = overlayClientRects[0];
            for (let i = 1; i < overlayClientRects.length; i++) {
              overlayBox.left = Math.min(overlayBox.left, overlayClientRects[i].left);
              overlayBox.top = Math.min(overlayBox.top, overlayClientRects[i].top);
              overlayBox.right = Math.max(overlayBox.right, overlayClientRects[i].right);
              overlayBox.bottom = Math.max(overlayBox.bottom, overlayClientRects[i].bottom);
            }
          
            // Check that the button is not fully contained in the overlay box
            expect(
              buttonRect.left >= overlayBox.left &&
              buttonRect.top >= overlayBox.top &&
              buttonRect.right <= overlayBox.right &&
              buttonRect.bottom <= overlayBox.bottom
            ).to.be.false;
         
                   
        })
        
      
        //Cuando el botón se encuentra fuera de la pantalla cypress también
        //continúa entendiendolo como visible=true, aunque para el usuario no
        //lo sea. Comprobamos que los límites del botón se encuentran fuera
        //de los límites visibles de la pantalla.
      
        page.getOffscreenButton().then($button => {
            //encontramos los límites del botón
            const buttonRect = $button[0].getBoundingClientRect();
            //encontramos los límites de nuestro visor web
            const viewportWidth = Cypress.config('viewportWidth') || window.innerWidth;
            const viewportHeight = Cypress.config('viewportHeight') || window.innerHeight;
      
            //comprobamos que el botón se encuentra fuera de los límites.
            expect(
                buttonRect.bottom < 0 ||
                buttonRect.top > viewportHeight ||
                buttonRect.right < 0 ||
                buttonRect.left > viewportWidth
            ).to.be.true;
        });
    })



})