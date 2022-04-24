
const BBDDUsuarios = [

    {usuario: "nicolasl", password: "12345"}, 
    {usuario: "tomasc", password: "12345"} 

];


document.getElementById("loguearse").addEventListener("submit", (e) =>{
   
        e.preventDefault();
        let nombre = document.getElementById("nombre").value;
        sessionStorage.setItem("nombre", nombre);
        let usuario = document.getElementById("usuario").value;
        let password = document.getElementById("password").value;
        
        if (BBDDUsuarios.some((el) => el.usuario === usuario && el.password === password) == true){
            
            alert(`Bienvenido ${nombre}`);
            sessionStorage.setItem("usuario", usuario);
            sessionStorage.setItem("password", password);  
            
            logueado(nombre);
            
    
        }else{
            
            alert(`ingresaste mal tus datos, volve a intentarlo`);
            
        }
        
    });

let sesionIniciada = sessionStorage.getItem("usuario");

//verifica si ya hay una sesion iniciada y la mantiene
if (!!sesionIniciada == true){

    let titulo = document.getElementById("tituloMiRecibo");
    titulo.innerText = `${sessionStorage.getItem("nombre")}, bienvenido a RH Lop Jobs`;
    document.getElementById("login").setAttribute("hidden","");
    document.getElementById("logout").removeAttribute("hidden");
    document.getElementById("btn__calcular").removeAttribute("hidden");
}

//modifica el boton de inicio y habilita el boton calcular
function logueado(nombre){


        let titulo = document.getElementById("tituloMiRecibo");
        titulo.innerText = `${nombre}, bienvenido a RH Lop Jobs`;
        document.getElementById("login").setAttribute("hidden","");
        document.getElementById("logout").removeAttribute("hidden");
        document.getElementById("btn__calcular").removeAttribute("hidden");  
    
}

//cierre de sesion
document.getElementById("logout").addEventListener ("click", () => {
     
        alert("Hasta luego")
        sessionStorage.clear()
        sesionIniciada=""
        let titulo = document.getElementById("tituloMiRecibo");
        titulo.innerText = `Bienvenido a RH Lop Jobs`;
        document.getElementById("login").removeAttribute("hidden");
        document.getElementById("logout").setAttribute("hidden","");
        document.getElementById("btn__calcular").setAttribute("hidden","");


})



