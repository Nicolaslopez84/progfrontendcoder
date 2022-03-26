
let usuario = prompt ("Hola!Ingresa tu usuario");
let clave = prompt ("Ahora ingresa tu clave");
if(usuario == "nicolas" && clave == "12345")
    {
        alert("Bienvenido");
    }else{    
        for(let i = 2 ; i>= 1; i--){
            alert("ingresaste mal tus datos, te quedan " + i + " intentos");
            usuario = prompt ("Hola!Ingresa tu usuario");
            clave = prompt ("Ahora ingresa tu clave");
                if(usuario == "nicolas" && clave == "12345"){
                    alert("bienvenido");
                break;
                };
        };
    };




/*if(usuario == "nicolas" && clave == "12345"){
    alert("Bienvenido, ya podes difrutar de tu espacio para clientes");}
    else{
        


/*for (let i = 3 ; i >= 0 ; i--){
    console.log(i)
};*/

/*function saludos(){
    console.log("hola");
};

saludos();*/



