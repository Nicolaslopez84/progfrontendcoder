
class Sueldo{
    constructor(basico, hsLaV, hsFS, ausencias, sindicato){
        this.basico = parseInt (basico);
        this.hsLaV = parseInt (hsLaV);
        this.hsFS = parseInt (hsFS);
        this.ausencias = parseInt (ausencias);
        this.sindicato = sindicato;
    }

    sueldoNeto() {
        if (this.sindicato == "comercio") {
            let neto = ( this.basico/30*(30-this.ausencias) + (this.basico/200*this.hsLaV*1.5) + (this.basico/200*this.hsFS*2) ) * 0.8
            return neto;
        }else{
            let neto = ( this.basico/30*(30-this.ausencias) + (this.basico/200*this.hsLaV*1.5) + (this.basico/200*this.hsFS*2) ) * 0.83
            return neto;
            }
    }
}

const total1 = new Sueldo (1000,0,10,1,"comercio");
alert(total1.sueldoNeto());

