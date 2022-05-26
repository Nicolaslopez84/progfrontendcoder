

document.getElementById("loguearse").addEventListener("submit", (e) =>{
   
        e.preventDefault();
        let nombre = document.getElementById("nombre").value;
        sessionStorage.setItem("nombre", nombre);
        let usuario = document.getElementById("usuario").value;
        let password = document.getElementById("password").value;
        
        fetch (`http://localhost:3000/usuarios`)
        .then(res => res.json())
        .then(datos => {
            const bdUsers = datos;
            if (bdUsers.some((el) => el.usuario === usuario && el.password === password) == true){
            
                swal(`Bienvenido ${nombre}`,"", "success");
                sessionStorage.setItem("usuario", usuario);
                sessionStorage.setItem("password", password);  
                
                logueado(nombre);
                
            }else{
                
                swal("Ingresaste mal tus datos, volve a intentarlo","","warning");
                
            }
            
        })
        
    });

let sesionIniciada = sessionStorage.getItem("usuario");

//verifica si ya hay una sesion iniciada y la mantiene
if (!!sesionIniciada == true){

    let titulo = document.getElementById("tituloMiRecibo");
    titulo.innerText = `${sessionStorage.getItem("nombre")}, bienvenido a RH Lop Jobs`;
    document.getElementById("login").setAttribute("hidden","");
    document.getElementById("logout").removeAttribute("hidden");
    document.getElementById("btn__calcular").removeAttribute("hidden");
    document.getElementById("datos").removeAttribute("hidden");
}

//modifica el boton de inicio y habilita el boton calcular
function logueado(nombre){


        let titulo = document.getElementById("tituloMiRecibo");
        titulo.innerText = `${nombre}, bienvenido a RH Lop Jobs`;
        document.getElementById("login").setAttribute("hidden",""); 
        document.getElementById("logout").removeAttribute("hidden");
        document.getElementById("datos").removeAttribute("hidden");
        document.getElementById("btn__calcular").removeAttribute("hidden");  
    
}

//cierre de sesion
document.getElementById("logout").addEventListener ("click", () => {
     
        swal(`Hasta luego ${sessionStorage.getItem("usuario")}`, {
            button: false,

        });    

        sessionStorage.clear();
        sesionIniciada=""
        let titulo = document.getElementById("tituloMiRecibo");
        titulo.innerText = `Bienvenido a RH Lop Jobs`;
        document.getElementById("login").removeAttribute("hidden");
        document.getElementById("logout").setAttribute("hidden","");
        document.getElementById("btn__calcular").setAttribute("hidden","");
        document.getElementById("datos").setAttribute("hidden",""); 
        let tabla = document.getElementById("tabla__sueldos");
        tabla !== null && tabla.remove();
        let reciboAnterior = document.getElementById(`tabla__recibo`)
        reciboAnterior != null  && reciboAnterior.remove()
        
})



