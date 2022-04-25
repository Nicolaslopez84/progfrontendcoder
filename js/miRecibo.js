const categoria = ["Maestranza", "Administrativo", "Vendedor", "Cajero", "Auxiliar", "Auxiliar Esp"];
const escalas = [79828.57, 80695.88, 80984.96, 80984.96, 80984.96, 81679.33];
const sueldosCargados = [];


//evento que deshabilita el input "Categoria" si no sos de Comercio
document.getElementById("sindicato").addEventListener("input", () => {
    
    let sindicatoElegido = document.getElementById("sindicato").value;    

    if(sindicatoElegido == "Fuera de Convenio"){
    document.getElementById("categorias").setAttribute("disabled","")
    }else{
        document.getElementById("categorias").removeAttribute("disabled")   
    }
})

//evento para mostrar sueldos guardados
document.getElementById("btn__sueldos").addEventListener("click", () =>{
   
    let datosGuardados = document.getElementById("netos__guardados");
    const almacenados = JSON.parse(localStorage.getItem(sessionStorage.getItem("usuario")))

})


//evento para el calculo del sueldo neto
document.getElementById("datos__recibo").addEventListener("submit", (e) =>{
   
    e.preventDefault();

    let periodo = document.getElementById("periodo").value;
    let sindicatoElegido = document.getElementById("sindicato").value;
    let basico = parseInt(document.getElementById("Basico").value)
    let hsLaV = parseInt(document.getElementById("HsExtrasLaV").value);
    let hsFS = parseInt(document.getElementById("HsExtrasFS").value);
    let ausencias = parseInt(document.getElementById("ausencias").value);    
    let cat = document.getElementById("categorias").value;  

        if((basico > escalas[categoria.indexOf(cat)] && sindicatoElegido == "Comercio") || sindicatoElegido == "Fuera de Convenio"){

            const total1 = new Sueldo (basico, hsLaV, hsFS, ausencias, sindicatoElegido);
            
            alert("Tu sueldo Neto sera de $" + total1.sueldoNeto());
            sueldosCargados.push(new SueldosNetos(periodo, total1.sueldoNeto()));
            for (const acum of sueldosCargados){
                acum.guardarLocalStorage();
                }

        }else{
            
            const total1 = new Sueldo (escalas[categoria.indexOf(cat)], hsLaV, hsFS, ausencias, sindicatoElegido);
            alert("Tu sueldo Neto sera de $" + total1.sueldoNeto());
            sueldosCargados.push(new SueldosNetos(periodo, total1.sueldoNeto()));
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
    }

    guardarLocalStorage(){
        localStorage.setItem(sessionStorage.getItem("usuario"), JSON.stringify(sueldosCargados));

    }
}


//clase para los calculos del sueldo neto
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
            let valorExtras = (this.basico/200*this.hsLaV*1.5) + (this.basico/200*this.hsFS*2);
            return parseInt(valorExtras);
        }else{
            let valorExtras = (this.basico/200*this.hsLaV*1.5) + (this.basico/200*this.hsFS*2);
            return parseInt(valorExtras);
        };
    };

    calculoBasico(){
        if(this.sindicato == "Comercio"){
            let sueldoBruto = ( this.basico / 30 * (30-this.ausencias) ) * 1.0833;
            return parseInt(sueldoBruto);
        }else{
            let sueldoBruto = this.basico / 30 * (30-this.ausencias);
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


/*function validacionSac(){
    if (sac.length == 0){
        return 0;
    }else{
        return sac[0];
    }
}*/

/*    if(periodo == "junio" || periodo == "diciembre"){   
    
        for (let i = 1 ; i <= 6; i++){
        sac.push(prompt("Ingresa tus sueldos netos de enero a junio, o de julio a diciembre para conocer tu Aguinaldo"));
    }   
        sac.sort((a, b) => b - a)

    };*/




