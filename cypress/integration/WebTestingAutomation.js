/// <reference types="Cypress" />
import webAutomationPage from "../support/pageObjects/WebAutomationPage"
import 'cypress-wait-until';
import 'cypress-xpath';



describe("web testing automation interview", function(){


    this.beforeEach(function(){

        cy.fixture("WebAutomationFixture").then(function(data){
            this.data=data
        }) 
    })



    it ("dynamicID", function(){
        

        //para acceder a las funciones del page object
        const page = new webAutomationPage();

        //accedemos a la página web
        cy.visit(this.data.URL)

        page.getDynamicID().click()

        page.getButtonNotID()


    })

    it ("Class Atribute", function(){
        

        //para acceder a las funciones del page object
        const page = new webAutomationPage();

        //accedemos a la página web
        cy.visit(this.data.URL)

        page.getClassAtribute().click()

        page.getBlueButtonClassAttr().click()


    })

    it ("Hidden Layers", function(){
        

        //para acceder a las funciones del page object
        const page = new webAutomationPage();

        //accedemos a la página web
        cy.visit(this.data.URL)

        page.getHiddenLayers().click()

        //cuando intentas hacer click y te da el error que incluya el texto
        // is being covered by...
        //el test pasa como OK, porque no es posible hacer click.

        page.getGreenButtonHidden().click({timeout:100}).then(() => {
            cy.on('fail', (error, runnable) => {
                if (!error.message.includes('is being covered by another element:')) {
                    throw error
                }
    
            })
          })
        page.getGreenButtonHidden().click()

   

    })

    it ("Load Delay", function(){
        

        //para acceder a las funciones del page object
        const page = new webAutomationPage();

        //accedemos a la página web
        cy.visit(this.data.URL)

        page.getLoadDelay().should('be.visible').click()
        //Usando cypress, tal y como está así valdría dado que es capaz
        //de detectar el spinner. Pero en caso de que no lo hubiese, 
        //una buena manera de hacerlo sería con una escucha a un elemento
        //de la página destino

        //con este método esperaremos hasta 10s al botón de la página destino
        //antes de hacer click en él.

        page.getButtonNotID().should('be.visible', {timeout:10000}).click()
    })

    it ("AJAX Data", function(){
        

        //para acceder a las funciones del page object
        const page = new webAutomationPage();

        //accedemos a la página web
        cy.visit(this.data.URL)

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

    it ("Client Side Delay", function(){
        

        //para acceder a las funciones del page object
        const page = new webAutomationPage();

        //accedemos a la página web
        cy.visit(this.data.URL)

        //prácticamente el mismo test que el anterior. Lo que cambia es
        //que uno es por un AJAX y el otro por JS.
        page.getClientSideDelay().click()

        page.getAJAXButton().click()

        page.getAJAXText().click()


    })

    it ("Click", function(){
        

                
        //para acceder a las funciones del page object
        const page = new webAutomationPage();

        //accedemos a la página web
        cy.visit(this.data.URL)

        page.getClick().click()

        //El problema con este test era que el botón no registra bien los 
        //clicks falsos. Aquí comprobamos primero que el botón sea visible,
        //que la clase inicial es btn-primary y que después del click es
        //btn-success
        page.getBadButton().should('have.class', 'btn-primary')
        .click().should('have.class', 'btn-success')




    })

    it ("Text Input", function(){
        

        //para acceder a las funciones del page object
        const page = new webAutomationPage();

        //accedemos a la página web
        cy.visit(this.data.URL)

        page.getTextInput().click()

        var texto

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

    it ("Scrollbars", function(){
        

        //para acceder a las funciones del page object
        const page = new webAutomationPage();

        //accedemos a la página web
        cy.visit(this.data.URL)

        
        page.getScrollbars().click()

        //centramos el botón y hacemos click en él.
        page.getHidingButton().scrollIntoView().click()

    })

    it ("Dynamic Table", function(){
        

        //para acceder a las funciones del page object
        const page = new webAutomationPage();

        //accedemos a la página web
        cy.visit(this.data.URL)

        page.getDynamicTable().click()

        //declaramos las variables que nos van a hacer falta para
        //resolver el ejercicio

        var index
        var firstCPUValue
        var secondCPUValue

        //seleccionamos en la tabla la fila "columnheader" y después la celda
        //que contiene "CPU"

        page.getHeaderRow().contains('CPU').then((cell) => {

            //guardamos el índice de la celda "CPU"

            index = cell.index();
            cy.log(index)

            //Encontramos la fila que contiene "Chrome" y luego
            //en esa fila vamos a la celda correspondiente al índice
            //de la columna "CPU". Almacenamos el valor en la variable
            //"firstCPUValue"

            page.getContentRows().contains('Chrome').parent()
            .children().eq(index).then((value)=>{
            firstCPUValue = value.text()
            cy.log(firstCPUValue)
            })

        });

        //Seleccionamos el texto cuyo valor queremos validar y usamos regex
        //para eliminar todos los elementos del texto que no correspondan a 
        //números o el símbolo '%'. Almacenamos el valor en "secondCPUValue"

        cy.contains('Chrome CPU').invoke('text')
            .then((text) => {
                const regex = /\d+(\.\d+)?%/;
                const result = text.match(regex);
                secondCPUValue = String(result[0]);
                cy.log(secondCPUValue)

                //Validamos si firstCPUValue y secondCPUValue son iguales.
            }).then(()=>{
                expect(firstCPUValue).to.eq(secondCPUValue)
            });

        

    })

    it ("Verify Text", function(){
        

        //para acceder a las funciones del page object
        const page = new webAutomationPage();

        //accedemos a la página web
        cy.visit(this.data.URL)
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

    it ("Progress Bar", function(){
        //para acceder a las funciones del page object
        const page = new webAutomationPage();

        //accedemos a la página web
        cy.visit(this.data.URL)
        

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

    it ("Visibility", function(){
        
    //para acceder a las funciones del page object
      const page = new webAutomationPage();

      //accedemos a la página web
      cy.visit(this.data.URL)
      

      page.getVisibility().click()

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
      page.getOverlappedButton().then(($button) => {
        const buttonRect = $button[0].getBoundingClientRect();
        page.getHidingLayer().then(($overlay) => {
          const overlayRect = $overlay[0].getBoundingClientRect();
          
          //comprobamos que los bordes del botón están dentro de los bordes
          //de la layer que lo cubre
          expect(
            buttonRect.left >= overlayRect.left &&
            buttonRect.top >= overlayRect.top &&
            buttonRect.right <= overlayRect.right &&
            buttonRect.bottom <= overlayRect.bottom
          ).to.be.true;
          
        });
      });
      

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

    it ("Sample App", function(){
        
      //para acceder a las funciones del page object
      const page = new webAutomationPage();

      //accedemos a la página web
      cy.visit(this.data.URL)
      

      page.getSampleApp().click()

      page.getLogin().click()
      page.getLoginStatus().should('have.text', 'Invalid username/password')
      page.getUserName().type("nonEmptyUsername")
      page.getPassword().type("pwd")
      page.getLogin().click()
      page.getLoginStatus().should('have.text', 'Welcome, nonEmptyUsername!')
        
        
        

    })

    it ("Mouse Over", function(){
        
      //para acceder a las funciones del page object
      const page = new webAutomationPage();

      //accedemos a la página web
      cy.visit(this.data.URL)
      
    
      page.getMouseOver().click()
      
      //comprobamos que el clickCount comienza a 0
      page.getClickCount().should('have.text','0')
    
      //Colocamos el ratón encima del botón, lo que genera un cambio del DOM
      page.getDynamicButton().trigger('mouseenter')

      //seleccionamos el nuevo elemento y hacemos click 2 veces
      page.getActiveLink().should('be.visible').click().click()

      //Comprobamos que se ha hecho click dos veces.
      page.getClickCount().should('have.text','2')

    })

    it ("Non-Breaking Space", function(){

      //para acceder a las funciones del page object
      const page = new webAutomationPage();

      //accedemos a la página web
      cy.visit(this.data.URL)
      
    
      page.getNonBreakingSpace().click()

      //reemplazamos el espacio entre "My" y "Button" por un
      //nonBreakingSpaceCharacter.
      //Ahora el selector Xpath funciona
      //(Dejo el selector explícito para que se vea mejor)
      cy.xpath("//button[text()='My\u00A0Button']").click();

      
    })

    it ("Overlapped Element", function(){
        

      //para acceder a las funciones del page object
      const page = new webAutomationPage();

      //accedemos a la página web
      cy.visit(this.data.URL)
      
    
      page.getOverlappedElement().click()

      //seleccionamos el elemento, lo centramos con las barras de navegación,
      //escribimos en él y comprobamos que se ha escrito en él.
      page.getName().scrollIntoView().type('1234qwerty')
      .should('have.value','1234qwerty')


    })

    it ("Shadow DOM", function(){
        //para acceder a las funciones del page object
        const page = new webAutomationPage();

        //accedemos a la página web
        cy.visit(this.data.URL)
        
        
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