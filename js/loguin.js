
let usuario = "";
const BBDDUsuarios = [
    
    {usuario: nicolasl, clave: 12345}, 
    {usuario: tomasc, clave: 12345} 

];


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