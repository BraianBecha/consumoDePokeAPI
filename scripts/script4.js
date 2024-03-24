
let arrayPokemonsPresentacion=[];
let a =[];
let b=[];
let max;
let cantDispPokemons;  
let flag1=0; 
let linkApi="https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";
let linkApiPorPokemon ="https://pokeapi.co/api/v2/pokemon/";
let innerGuardados = document.getElementById("contenedorDeGuardados");
let innerCard = document.getElementById("contenedorDeTarjetas");
let innerNumber = document.getElementById("contadorDePokemons");
let innerMain = document.getElementById("main1")
let innerDescription =document.getElementById("listaDescripciones");
let innerAbility=document.getElementById("listaHabilidades")
let innerTitle = document.getElementById("pokemonTitle")
let innerContenedorDeImagenesDetalle = document.getElementById("contenedorDeImagenesDetalle");
let presentacionPokemon={name :"", weight : 0, order : 0, ability:[] , url:"" ,abilities:[] ,images:{}}//objeto tipo pokemon
let cardsPokemon
let arrayPokemonsJson = []
let pokemonsGuardados =[]
let activarListaGuardados = false;
let unPokemonDetalle = Object.create(presentacionPokemon);

fetch(linkApi)
.then(resp=>resp.json())
.then(resp=>setMax(resp.count))
  
oculto("verPokemonsGuardados")


function visible(etiqueta){
    let div = document.getElementsByClassName(etiqueta);
    div.style.visibility ='visible'
   
  }
  function oculto(etiqueta){
    try{
    let div = document.getElementById(etiqueta);
    div.style.visibility = 'hidden';
    }
    catch{
        console.log(`no se halló elemento ${etiqueta} en HTML para ocultarlo`)
    }
  }

function verGuardados() {
   
    try {let poketarjetas = [];
        
        abrirVentana(1)
        }
    catch(error) {
        console.error(error);
                 }

};

function abrirVentana(x){
    switch(x)
    {
        case 1:
window.open("./guardados.html")
    }
}


function guardarUnPokemon(x){
    let pokemonAGuardar = arrayPokemonsJson.find((element) => element.name == x);
    pokemonsGuardados.push(pokemonAGuardar);         
    localStorage.setItem('pokemonsGuardadosLS', JSON.stringify(pokemonsGuardados));
    visible("verPokemonsGuardados");
   
}
function eliminarUnPokemon(name,array){
     pokemonsGuardados= pokemonsGuardados.filter(pokemonElement=> pokemonElement.name!=name);
     console.log(`se elimino un pokemon ${name}`)
     localStorage.setItem('pokemonsGuardadosLS', JSON.stringify(pokemonsGuardados));
     }

function guardarArray(x){
    arrayApi=x

}



 async function descargarPokemons(q){
  let flag=1;
      for(i=1;i<=max;i+=1){      
       
        if(i==max){flag=0}//significa que se está en el ultimo elemento a peidir a la api
        
        await  buscarUnPokemon(linkApiPorPokemon,i) 
              .then(res => {
                if(res!=0){
            var unPokemonPresentacion=Object.create(presentacionPokemon);             
                       
                 unPokemonPresentacion.name=res.name
                 unPokemonPresentacion.weight=res.weight   
                 unPokemonPresentacion.order=res.order                 
                 res.abilities.forEach(element => {unPokemonPresentacion.ability.push(element.ability.name)});  
                 unPokemonPresentacion.url=res.url 
                 unPokemonPresentacion.abilities=res.abilities
                 unPokemonPresentacion.images=res.sprites

               setArrayPokemonsJson(unPokemonPresentacion,q)
               imprimirCantidad(arrayPokemonsJson.length)   
                          
               let unapoketarjeta= generarUnaTarjeta(unPokemonPresentacion)
                 imprimirUnaTarjeta(unapoketarjeta,0)
                 
                 }
                else{ if(flag==0){si
                    if(q==1){ //q=1 significa que el usuario no desea descargar los pokemons, solo verlos
                                    descargarArchivoJson();//En caso de que justo el ultimo elemento a peticionar de 404, se fuerza la descarga 
                            } 
                            if(q==0)
                            {
                                let unapoketarjeta= generarUnaTarjeta(unPokemonPresentacion)   //se imprime el ultimo pokemon                             
                                  imprimirUnaTarjeta(unapoketarjeta,0)
                            }                                
                    }
                }} )              
                      
        }
       
        
    

};

async function buscarUnPokemon(x,i){ 
    try {
        const response = await fetch(`${x}${i}/`);
             if (!response.ok) {
                  return 0; // Devuelve 0 si la respuesta no es exitosa
        }
        const data = await response.json();  
        
                    return data;
    } catch (error) {
        console.error('Error al buscar el Pokémon:', error);
        return null; 
    }

}

function generarUnaTarjeta(x){  

    let stringTarjeta=` <div class="pokeTarjeta">
           
    <div>
    <img class="image" src="${x.images.front_default}" alt="MDN logo">
    </div> 
    <div class="buttons">    
    <button class="button1" onclick="guardarUnPokemon('${x.name}')"> guardar</button>    
    <button class="button1" onclick="verEnDetalle('${x.name}')"> ver más</button>     
    <button class="button1" onclick="eliminarUnPokemon('${x.name}')"> eliminar de guardados</button>   
    </div>    
    <div class="list1">   
       <ol>
           <li>Name: ${x.name} </li>
           <li>Weight: ${x.weight}</li>
           <li>Order: ${x.order}</li>
       </ol>
    </div>
             
   
</div>` 
      
          return stringTarjeta
}
        
    
function imprimirUnaTarjeta(x,y){    
    let stringHTML=" "
    stringHTML=x.toString(); 
     
    switch(y){
        case 0:
        innerCard.insertAdjacentHTML("beforeend",stringHTML);
        break;
        case 1:
        innerGuardados.insertAdjacentHTML("beforeend",stringHTML);
        break;
    }

    }


function imprimirCantidad(x){
     innerNumber.innerHTML=`<p>se encontraron ${x} pokemons</p>` 
}

function imprimirNombre(x){
    innerTitle.innerHTML=`${x}`
}
 

function setearCantidadDePokemons(x){
    cantDispPokemons=x;
}
function setMax(x){
    max=x
   
}

function setArrayPokemonsJson(unPokemonJson,q){
    if(q==0){
        
    arrayPokemonsJson.push(unPokemonJson)
    localStorage.setItem('arrayPokemonsJson', JSON.stringify(arrayPokemonsJson))
}
else { //q==1 significa que se quiere descargar
    
    arrayPokemonsJson.push(unPokemonJson)
    descargarArchivoJson()
    localStorage.setItem('arrayPokemonsJson', JSON.stringify(arrayPokemonsJson))
}

};

function descargarArchivoJson(){

try{
    
    let archivoJson= JSON.stringify(arrayPokemonsJson)
    const blob = new Blob([archivoJson], { type: 'application/json' });
    const fileName = 'pokeapi.json';
    saveAs(blob, fileName);
}
catch{error => {
    console.error('Se produjo un error al descargar el archivo json:', error);
              }
            }

        }



function verEnDetalle(x){
    console.log(`entrada a ver en detalle ${x}`)
    console.log(`arrayPokemonsJson es ${arrayPokemonsJson}`)
    let  unPokemonDetalleAGuardar= arrayPokemonsJson.find((element) => element.name==x);
    localStorage.setItem('unPokemonDetalle', JSON.stringify(unPokemonDetalleAGuardar));
    console.log(`unPokemonDetalle es ${unPokemonDetalle}`)
    
    window.open("./endetalle.html")

}

async function imprimirHabilidadesDetalle(x) {
    
    let arrayDescripciones = await generarDescripciones(x);    
    arrayDescripciones.forEach((desc) => {console.log(`se imprime desc ${desc}`)
        innerDescription.innerHTML += `<li class="textoDescriptivo">${desc}</li>`});
         x.abilities.forEach((y)=>{innerAbility.innerHTML+=`<li id="">${y.ability.name}</li>`})
         
}

async function generarDescripciones(unPokemonDetalle) {
    let arrayPromesas = unPokemonDetalle.abilities.map(x=>buscarDescripciones(x));
    let arrayDescripciones = await Promise.all(arrayPromesas);
    return arrayDescripciones;
}


function imprimirImagenesDetalle(x){
    let arrayImagenes=obtenerImagenes(x.images)
    arrayImagenes.forEach((ima)=>{console.log(`ima es ${ima}`); innerContenedorDeImagenesDetalle.innerHTML +=` <img id="imgDetail" src="${ima}" alt="">`})    
}
async function buscarDescripciones(x){    
    let effects =[]
await fetch(x.ability.url)
    .then(resp=>resp.json())
    .then(y=>{y.effect_entries.forEach((x)=>{
        if(x.language.name=="en"){ 
        effects.push(x.effect)}}
    )})   
return effects
}


function obtenerImagenes(x){
 
    const imageUrls = [];

    function extraerUrls(obj) {
        for (const key in obj) { 
            if (obj[key] !== null && typeof obj[key] === 'string') {
                if (obj[key].endsWith('.png') || obj[key].endsWith('.gif')) {
                    console.log("push imageUrls")
                    imageUrls.push(` ${obj[key]} `);
                }
            } else if (typeof obj[key] === 'object') {
                extraerUrls(obj[key]);
            }
        }
    }

    extraerUrls(x);
    return imageUrls;

}
