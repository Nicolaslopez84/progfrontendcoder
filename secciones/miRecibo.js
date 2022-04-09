
class Sueldo{
    constructor(basico, hsLaV, hsFS, ausencias, sindicato){
        this.basico = parseInt (basico);
        this.hsLaV = parseInt (hsLaV);
        this.hsFS = parseInt (hsFS);
        this.ausencias = parseInt (ausencias);
        this.sindicato = sindicato;
    }
    calculohs(){
        let valorExtras = (this.basico/200*this.hsLaV*1.5) + (this.basico/200*this.hsFS*2);
        return valorExtras;
    }
    calculoBasico(){
        let valorBruto = this.basico/30*(30-this.ausencias);
        return valorBruto;
    }
    sueldoNeto() {
        if (this.sindicato == "comercio") {
            let neto = ( this.calculoBasico() * 1.0833 + this.calculohs() ) * 0.80;
            return alert(neto);
        }else{
            let neto = ( this.calculoBasico() + this.calculohs() ) * 0.83;
            return alert(neto);
            }
    }
}

const total1 = new Sueldo (1000,0,10,1,"comercio");
total1.sueldoNeto();




