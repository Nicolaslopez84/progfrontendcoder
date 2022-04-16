
const BBDDUsuarios = [

    {usuario: "nicolasl", password: "12345"}, 
    {usuario: "tomasc", password: "12345"} 

];


document.getElementById("loguearse").addEventListener("submit", (e) =>{
   
    e.preventDefault();
    let nombre = document.getElementById("nombre").value;
    let usuario = document.getElementById("usuario").value;
    let password = document.getElementById("password").value;
    
    if (BBDDUsuarios.some((el) => el.usuario === usuario && el.password === password) == true){
        
        alert(`Bienvenido ${nombre}`);
        let titulo = document.getElementById("tituloMiRecibo");
        titulo.innerText = `${nombre}, bienvenido a RH Lop Jobs`;
        let logueado = document.getElementById("login");
        logueado.className = "btn btn-success align-self-center m-1";
        logueado.innerText = `${usuario}`;
     

    }else{
        
        alert(`ingresaste mal tus datos, volve a intentarlo`);
        
    }
    
});









