/// <reference types="Cypress" />
import DynamicTablePage from 
"../../../support/pageObjects/webAutomation/UI_Validation/DynamicTablePage";

const page = new DynamicTablePage();

        
describe("web testing automation portfolio", function(){

    this.beforeEach(function(){

        cy.fixture("WebAutomationFixture").then(function(data){
            this.data=data
        }) 
    })

    beforeEach(function(){
        cy.visit(this.data.URL);
    });

    it ("Dynamic Table", function(){
        
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

            page.getContentRowsChrome()
                .eq(index)
                    .then((value)=>{
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


})