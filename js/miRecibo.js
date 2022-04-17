
let basico = 0;
let valorExtras = 0;
let sueldoBruto = 0;
const categoria = ["Maestranza", "Administrativo", "Vendedor", "Cajero", "Auxiliar", "Auxiliar Esp"];
const escalas = [79828.57, 80695.88, 80984.96, 80984.96, 80984.96, 81679.33];
const sac = [];

class Sueldo{
    constructor(basico, hsLaV, hsFS, ausencias, sindicato){
        this.basico = parseInt (basico);
        this.hsLaV = parseInt (hsLaV);
        this.hsFS = parseInt (hsFS);
        this.ausencias = parseInt (ausencias);
        this.sindicato = sindicato;              
    };

    calculohs(){
        if(this.sindicato == "Comercio"){
            valorExtras = (this.basico/200*this.hsLaV*1.5) + (this.basico/200*this.hsFS*2);
            return parseInt(valorExtras);
        }else{
            valorExtras = (this.basico/200*this.hsLaV*1.5) + (this.basico/200*this.hsFS*2);
            return parseInt(valorExtras);
        };
    };

    calculoBasico(){
        if(this.sindicato == "Comercio"){
            sueldoBruto = ( this.basico / 30 * (30-this.ausencias) ) * 1.0833;
            return parseInt(sueldoBruto);
        }else{
            sueldoBruto = this.basico / 30 * (30-this.ausencias);
            return parseInt(sueldoBruto);
        };
    };

    sueldoNeto() {
        if (this.sindicato == "Comercio") {
            let neto = ( this.calculoBasico() + this.calculohs() ) * 0.80;
            return parseInt(neto);
        }else{
            let neto = ( this.calculoBasico() + this.calculohs() ) * 0.83;
            return parseInt(neto);
        };
    };
};

document.getElementById("datosRecibo").addEventListener("submit", (e) =>{
   
    e.preventDefault();

let periodo = document.getElementById("periodo").value
let basico = parseInt(document.getElementById("Basico").value)
let hsLaV = parseInt(document.getElementById("HsExtrasLaV").value);
let hsFS = parseInt(document.getElementById("HsExtrasFS").value);
let ausencias = parseInt(document.getElementById("ausencias").value);    
let cat = document.getElementById("categorias").value;  



/*    if(periodo == "junio" || periodo == "diciembre"){   
    
        for (let i = 1 ; i <= 6; i++){
        sac.push(prompt("Ingresa tus sueldos netos de enero a junio, o de julio a diciembre para conocer tu Aguinaldo"));
    }   
        sac.sort((a, b) => b - a)

    };*/


    if(document.getElementById("comercio").value == true){
            console.log(true)
        /*const total1 = new Sueldo (escalas[categoria.indexOf(cat)], hsLaV, hsFS, ausencias, "Comercio");
        alert("Tu sueldo Neto sera de $" + total1.calculoBasico());
        alert("Tu sueldo Neto sera de $" + total1.calculohs());
        alert("Tu sueldo Neto sera de $" + total1.sueldoNeto())*/
        
    }else{
        console.log(false)
        /*const total1 = new Sueldo (basico, hsLaV, hsFS, ausencias, sindicato);
        alert("Tu sueldo Neto sera de $" + total1.calculoBasico());
        alert("Tu sueldo Neto sera de $" + total1.calculohs());
        alert("Tu sueldo Neto sera de $" + total1.sueldoNeto())*/
  
    };

})

/*function validacionSac(){
    if (sac.length == 0){
        return 0;
    }else{
        return sac[0];
    }
}*/


let input1  = document.getElementById("FC");
input1.addEventListener("input", (e) => {

    document.getElementById("Basico").removeAttribute("disabled")

  }
)







