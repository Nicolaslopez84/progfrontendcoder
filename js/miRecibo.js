const categoria = ["Maestranza", "Administrativo", "Vendedor", "Cajero", "Auxiliar", "Auxiliar Esp"];
const escalas = [79828.57, 80695.88, 80984.96, 80984.96, 80984.96, 81679.33];
const sueldosCargados = [];
const DateTime = luxon.DateTime ;
let i = 0
let total1 = {}

//evento que deshabilita el input "Categoria" si no sos de Comercio
document.getElementById("sindicato").addEventListener("input", () => {
    
    let sindicatoElegido = document.getElementById("sindicato").value;    

    sindicatoElegido == "Fuera de Convenio" ? document.getElementById("categorias").setAttribute("disabled","") 
    : document.getElementById("categorias").removeAttribute("disabled")   
    
})


//evento para el calculo del sueldo neto
document.getElementById("datos__recibo").addEventListener("submit", (e) =>{
   
    e.preventDefault();
    let reciboAnterior = document.getElementById(`tabla__recibo`)
    reciboAnterior != null  && reciboAnterior.remove()
    let tablaAnterior = document.getElementById(`tabla__sueldos`)
    tablaAnterior != null  && tablaAnterior.remove()
    let periodo = document.getElementById("periodo").value;
    let fIngreso = document.getElementById("FIngreso").value;
    let sindicatoElegido = document.getElementById("sindicato").value;
    let basico = parseInt(document.getElementById("Basico").value)
    let hsLaV = parseInt(document.getElementById("HsExtrasLaV").value);
    let hsFS = parseInt(document.getElementById("HsExtrasFS").value);
    let ausencias = parseInt(document.getElementById("ausencias").value);    
    let cat = document.getElementById("categorias").value; 
    JSON.stringify(periodo, fIngreso, sindicatoElegido, basico, hsLaV, hsFS, ausencias, cat)

        if((basico > escalas[categoria.indexOf(cat)] && sindicatoElegido == "Comercio") || sindicatoElegido == "Fuera de Convenio"){
            
            let datosRecibo = [basico, hsLaV, hsFS, ausencias, sindicatoElegido, periodo]
            sessionStorage.setItem("recibo", JSON.stringify(datosRecibo))
            total1 = new Sueldo (fIngreso, basico, hsLaV, hsFS, ausencias, sindicatoElegido);
            SeguroDeCalcular(total1.sueldoNeto())
            sueldosCargados.push(new SueldosNetos(periodo, total1.sueldoNeto()));
            for (const acum of sueldosCargados){
                acum.guardarLocalStorage();
                }

        }else{
            let escalaElegida = escalas[categoria.indexOf(cat)]
            let datosRecibo = [escalaElegida, hsLaV, hsFS, ausencias, sindicatoElegido, periodo]
            sessionStorage.setItem("recibo", JSON.stringify(datosRecibo))
            total1 = new Sueldo (fIngreso, escalas[categoria.indexOf(cat)], hsLaV, hsFS, ausencias, sindicatoElegido);
            SeguroDeCalcular(total1.sueldoNeto())
            sueldosCargados.push(new SueldosNetos(periodo, total1.sueldoNeto()));
            for (const acum of sueldosCargados){
                acum.guardarLocalStorage();
            }
        }
        mostrarRecibo();

})


//clase para el armado del JSON
class SueldosNetos{
    constructor(periodo, neto)
    {
        this.periodo = periodo.toUpperCase();
        this.neto = neto;
    };
    
    guardarLocalStorage(){
        localStorage.setItem(sessionStorage.getItem("usuario"), JSON.stringify(sueldosCargados));
    };

};

//clase para los calculos del sueldo neto
class Sueldo{
    constructor(FIngreso, basico, hsLaV, hsFS, ausencias, sindicato){
        this.FIngreso = FIngreso;
        this.basico = basico;
        this.hsLaV = parseInt (hsLaV);
        this.hsFS = parseInt (hsFS);
        this.ausencias = parseInt (ausencias);
        this.sindicato = sindicato;              
    };

    calculoAntiguedad(){
        let antiguedad = 0;
        let fechaIngresada = DateTime.fromISO(this.FIngreso);
        let t = DateTime.now();
        let difYears = parseInt(t.diff(fechaIngresada, 'months').as(`years`));
        if (difYears >= 1){
            for(let i = 0; i <= difYears; i++){
                antiguedad = i * 1 / 100;
            };
            return antiguedad;
        }else{return 0};    
    };

    calculoHs50(){
            let hs50 = ( this.basico / 200 * this.hsLaV * 1.5 );
            return hs50;
    };     
            
    calculoHs100(){ 
            let hs100 = ( this.basico / 200*this.hsFS*2 );
            return hs100;
    };

    calculoAusencias(){
            let aus = -( this.basico / 30 * this.ausencias );
            return aus;
    };

    calculoBruto (){   
            let sBruto = this.basico * (1 + this.calculoAntiguedad()) + this.calculoHs50() + this.calculoHs100() + this.calculoAusencias();
            return sBruto;
    };

    sueldoNeto() {
        if (this.sindicato == "Comercio") {
            let neto = this.calculoBruto() * 1.0833 * 0.80;
            return parseInt(neto);
        }else{
            let neto = this.calculoBruto() * 0.83;
            return parseInt(neto);
        };
    };
};

//evento para mostrar sueldos guardados en localstorage
document.getElementById("btn__sueldos").addEventListener("click", () =>{
    
    let tablaAnterior = document.getElementById(`tabla__sueldos`)
    tablaAnterior != null  && tablaAnterior.remove()

    let almacenados = JSON.parse(localStorage.getItem(sessionStorage.getItem("usuario")))
    let datosTabla = "";
        
        const padreTablas = document.getElementById(`sueldos__guardados`)
        const tabla = document.createElement(`table`)
        tabla.setAttribute(`class`,`table table-striped`)
        tabla.setAttribute(`id`, `tabla__sueldos`)
        tabla.innerHTML =
            `<thead id="tabla__encabezado">
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Periodo</th>
                        <th scope="col">Neto</th>
                    </tr>
            </thead>`
        padreTablas.appendChild(tabla)
        const encabezadoTabla = document.querySelector(`#tabla__encabezado`)
        const cuerpoTabla = document.createElement(`tbody`)   
        cuerpoTabla.setAttribute(`id`, `tabla__cuerpo`)
        encabezadoTabla.insertAdjacentElement("afterend", cuerpoTabla)
        
        for (let i = 0; i < almacenados.length; i++) {  
            datosTabla += 
                `<tr id="tabla__sueldos">
                <th scope="row">${i+1}</th>
                <td>${almacenados[i].periodo}</td>
                <td>${almacenados[i].neto} pesos</td>
                </tr>`
            }
        
        cuerpoTabla.innerHTML = datosTabla
        datosTabla.appendChild(cuerpoTabla)

})


//funcion para mostrar el recibo de sueldo
function mostrarRecibo(){

        const padreTablas = document.getElementById(`recibo`)
        const tabla = document.createElement(`table`)
        tabla.setAttribute(`class`,`table table-striped`)
        tabla.setAttribute(`id`, `tabla__recibo`)
        tabla.innerHTML =
            `<thead id="tabla2__encabezado">
                <tr>
                <th scope="col">Concepto</th>
                <th scope="col">Unidades</th>
                <th scope="col">Valor en $</th>
                </tr>
            </thead>`
        padreTablas.appendChild(tabla)
        const encabezadoTabla = document.querySelector(`#tabla2__encabezado`)
        const cuerpoTabla = document.createElement(`tbody`)   
        cuerpoTabla.setAttribute(`id`, `tabla2__cuerpo`)
        encabezadoTabla.insertAdjacentElement("afterend", cuerpoTabla)
        let datosRecibo = JSON.parse(sessionStorage.getItem("recibo"))
        let miRecibo = ""
        miRecibo +=
        `<tr>
            <td>Sueldo Basico</td>
            <td>30</td>
            <td>${datosRecibo[0]}</td>
        </tr>
        <tr>
            <td>Hs al 50%</td>
            <td>${datosRecibo[1]}</td>
            <td>${parseInt(total1.calculoHs50())}</td>
        </tr>
        <tr>
            <td>Hs al 100</td>
            <td>${datosRecibo[2]}</td>
            <td>${parseInt(total1.calculoHs100())}</td>
        </tr>
        <tr>
            <td>Ausencias</td>
            <td>${datosRecibo[3]}</td>
            <td>${parseInt(total1.calculoAusencias())}</td>
        </tr>
        <tr>
            <td>Antiguedad</td>
            <td>${total1.calculoAntiguedad()*100}</td>
            <td>${parseInt(datosRecibo[0] * total1.calculoAntiguedad())}</td>
        </tr>
        <tr>
            <td>Presentismo</td>
            <td>8.33%</td>
            <td>${parseInt(total1.calculoBruto()* (datosRecibo[4] == "Comercio" ? 0.0833 : 0))}</td>
        </tr>
        <tr>
        <td>Sueldo Bruto ${parseInt(total1.calculoBruto())}</td>
        <td>Retenciones ${parseInt(total1.calculoBruto () * (datosRecibo[4] == "Comercio" ? 0.8 : 0.83)) }</td>
        <td>Sueldo Neto ${total1.sueldoNeto()}</td>
        </tr>
        `
        cuerpoTabla.innerHTML = miRecibo
        miRecibo.appendChild(cuerpoTabla)

}


//evento para impresion del recibo
document.getElementById("btn__imprimir").addEventListener("click", () => {
    let datosRecibo = JSON.parse(sessionStorage.getItem("recibo"))
    let mywindow = window.open('', 'PRINT', 'height=400,width=600');
    mywindow.document.write(`<html><head><h2>Mi Recibo de sueldo periodo: ${datosRecibo[5]}</h2><br><br>`);
    mywindow.document.write(`<style>#tabla2__cuerpo{width:100%;border-collapse:collapse;margin:16px 0 16px 0;}#tabla2__cuerpo th{border:1px solid #ddd;padding:4px;background-color:#d4eefd;text-align:left;font-size:15px;}#tabla2__cuerpo td{border:1px solid #ddd;text-align:left;padding:6px;}</style>`);
    mywindow.document.write(`</head><body >`);
    mywindow.document.write(document.getElementById('recibo').innerHTML);
    mywindow.document.write(`</body></html>`);
    mywindow.print();
    mywindow.close();
  
})


//funciones sweetalert
function SeguroDeCalcular (total){

    swal({
        title: "Seguro de hacer el calculo?",
        text: "Al calcular se eliminaran los datos guardados en sesiones anteriores",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
        swal("Tu sueldo Neto sera de $" + total, {
            icon: "success",
        });
        } else {
        swal("Vuelve a intentarlo",
        {   buttons: false,
            timer: 1000});
        }
    });

};






