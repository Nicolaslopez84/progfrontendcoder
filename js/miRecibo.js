const categoria = ["Maestranza", "Administrativo", "Vendedor", "Cajero", "Auxiliar", "Auxiliar Esp"];
const escalas = [79828.57, 80695.88, 80984.96, 80984.96, 80984.96, 81679.33];
const sueldosCargados = [];
const DateTime = luxon.DateTime ;


//evento que deshabilita el input "Categoria" si no sos de Comercio
document.getElementById("sindicato").addEventListener("input", () => {
    
    let sindicatoElegido = document.getElementById("sindicato").value;    

    sindicatoElegido == "Fuera de Convenio" ? document.getElementById("categorias").setAttribute("disabled","") 
    : document.getElementById("categorias").removeAttribute("disabled")   
    
})

//evento para mostrar sueldos guardados 
document.getElementById("btn__sueldos").addEventListener("click", () =>{
   
    let datosGuardados = document.getElementById("netos__guardados");
    let almacenados = JSON.parse(localStorage.getItem(sessionStorage.getItem("usuario")))
    let tabla = "";
    almacenados != undefined && armarTabla()
    
    function armarTabla(){
        for (let i = 0; i < almacenados.length; i++) {  
        tabla += 
        `<tr id="tabla__sueldos">
        <th scope="row">${i+1}</th>
        <td>${almacenados[i].periodo}</td>
        <td>${almacenados[i].neto} pesos</td>
        </tr>`
        }
    }
    
    datosGuardados.innerHTML = tabla
 
})


//evento para eliminar la tabla de sueldos guardados
document.getElementById("btn__eliminar").addEventListener("click", () =>{
        
    let tabla = document.getElementById("tabla__sueldos");
    tabla !== null && tabla.remove()
        
})


//evento para el calculo del sueldo neto
document.getElementById("datos__recibo").addEventListener("submit", (e) =>{
   
    e.preventDefault();

    let periodo = document.getElementById("periodo").value;
    let fIngreso = document.getElementById("FIngreso").value;
    let sindicatoElegido = document.getElementById("sindicato").value;
    let basico = parseInt(document.getElementById("Basico").value)
    let hsLaV = parseInt(document.getElementById("HsExtrasLaV").value);
    let hsFS = parseInt(document.getElementById("HsExtrasFS").value);
    let ausencias = parseInt(document.getElementById("ausencias").value);    
    let cat = document.getElementById("categorias").value;  

        if((basico > escalas[categoria.indexOf(cat)] && sindicatoElegido == "Comercio") || sindicatoElegido == "Fuera de Convenio"){

            const total1 = new Sueldo (fIngreso, basico, hsLaV, hsFS, ausencias, sindicatoElegido);
            let total = total1.sueldoNeto()
            SeguroDeCalcular(total)
            sueldosCargados.push(new SueldosNetos(periodo, total));
            for (const acum of sueldosCargados){
                acum.guardarLocalStorage();
                }

        }else{
            
            const total1 = new Sueldo (fIngreso, escalas[categoria.indexOf(cat)], hsLaV, hsFS, ausencias, sindicatoElegido);
            let total = total1.sueldoNeto()
            SeguroDeCalcular(total)
            sueldosCargados.push(new SueldosNetos(periodo, total));
            for (const acum of sueldosCargados){
                acum.guardarLocalStorage();
            }
        }
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

//evento para impresion del recibo

document.getElementById("btn__imprimirRecibo").addEventListener("clic", () => {




    }
)


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






