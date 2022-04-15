
let login = prompt("hola! Queres loguearte? S/N");
let usuario = "";

if(login == "S"){
    usuario = prompt ("Hola!Ingresa tu nombre");
    let clave = prompt ("Ahora ingresa tu clave");
    if(usuario == "nicolas" && clave == "12345"){    
        alert("Bienvenido "+ usuario);
    }else{    
        for(let i = 2 ; i>= 1; i--){
            alert("ingresaste mal tus datos, te quedan " + i + " intentos");
            usuario = prompt ("Hola!Ingresa tu usuario");
            clave = prompt ("Ahora ingresa tu clave");
                if(usuario == "nicolas" && clave == "12345"){
                    alert("Bienvenido " + usuario);
                break;
                };
        };
    };
};

let basico = 0;
let valorExtras = 0;
let sueldoBruto = 0;
const categoria = ["maest", "adm", "vend", "caj", "aux", "aux esp"];
const escalas = [79828.57, 80695.88, 80984.96, 80984.96, 80984.96, 81679.33];

class Sueldo{
    constructor(basico, basicoCom, hsLaV, hsFS, ausencias, sindicato){
        this.basico = parseInt (basico);
        this.basicoCom = basicoCom;  
        this.hsLaV = parseInt (hsLaV);
        this.hsFS = parseInt (hsFS);
        this.ausencias = parseInt (ausencias);
        this.sindicato = sindicato;              
    };

    calculohs(){
        if(this.sindicato == "comercio"){
            valorExtras = (this.basicoCom/200*this.hsLaV*1.5) + (this.basicoCom/200*this.hsFS*2);
            return valorExtras;
        }else{
            valorExtras = (this.basico/200*this.hsLaV*1.5) + (this.basico/200*this.hsFS*2);
            return valorExtras;
        };
    };

    calculoBasico(){
        if(this.sindicato == "comercio"){
            sueldoBruto = this.basicoCom / 30 * (30-this.ausencias);
            return sueldoBruto;
        }else{
            sueldoBruto = this.basico / 30 * (30-this.ausencias);
            return sueldoBruto;
        };
    };

    sueldoNeto() {
        if (this.sindicato == "comercio") {
            let neto = ( this.calculoBasico() * 1.0833 + this.calculohs() + sac[0]/2 ) * 0.80;
            return parseInt(neto);
        }else{
            let neto = ( this.calculoBasico() + this.calculohs() + sac[0]/2 ) * 0.83;
            return parseInt(neto);
        };
    };
};

alert("Hola " + usuario + "! vamos a ayudarte a calcular tu sueldo del mes. Adelante!");
let periodo = prompt("Que mes vas a liquidar?");
let sindicato = prompt("Indicanos 'Comercio' si estas dentro de convenio o 'Fuera de convenio'");
let hsLaV = prompt("Ingresa las horas extras que hiciste de lunes a viernes");
let hsFS = prompt("Ahora ingresa las horas extras durante fines de semana o feriados");
let ausencias = prompt("Excelente!!!Ahora decinos si tuviste ausencias injustificadas");    
let cat = "";  
const sac = [];

    if(periodo == "junio" || periodo == "diciembre"){   
    for (let i = 1 ; i <= 6; i++){
        sac.push(prompt("Ingresa tus sueldos netos de enero a junio, o de julio a diciembre para conocer tu Aguinaldo"));
    };
    sac.sort((a, b) => b - a);
    }

    if(sindicato == "comercio"){
        cat = prompt("Sos del sindicato de Comercio, indicanos tu categoria: maest, adm, vend, caj, aux, aux esp");

        while(categoria.includes(cat) == false){
            cat = prompt("La categoria que ingresaste no es valida, volve a intertarlo")
        };

        const total1 = new Sueldo (0, escalas[categoria.indexOf(cat)], hsLaV, hsFS, ausencias, sindicato);
        alert("Tu sueldo Neto sera de $" + total1.sueldoNeto());

    }else{
        basico = prompt("Ingresa tu sueldo basico");
        const total1 = new Sueldo (basico, 0, hsLaV, hsFS, ausencias, sindicato);
        alert("Tu sueldo Neto sera de $" + total1.sueldoNeto());
    };

















