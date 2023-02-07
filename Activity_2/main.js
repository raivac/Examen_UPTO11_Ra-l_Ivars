/********************************* OBJETO JUEGO *******************************/
function Juego() {

    this.estado;
    this.letrasFrase = [];
    this.letrasTesteadas = [];
    this.intentos = 5;
}

let juego = new Juego();



/********************************* FUNCION QUE LLAMA AL FETCH *******************************/

async function obtenerPalabras() {

    //pedimos el numerro de palabras y lo parseamos
    let numeroPalabras = parseInt(prompt("Con cuantas palabras quieres jugar ? (menos de 10)"));

    try {
        //llamamos el fetch con el numero de palabras
        let respuesta = await fetch(`https://puzzle.mead.io/puzzle?wordCount=${numeroPalabras}`);

        let resultado = await respuesta.json();

        //guardamos el resultado
        let palabras = resultado.puzzle;

        //metemos las letras y los espacion en el array del objeto juego
        for (let i = 0; i < palabras.length; i++) {
            juego.letrasFrase[i] = palabras[i];
        }
        console.log(juego.letrasFrase);

    } catch (error) {
        alert(error);
    }
}





/********************************* FUNCION INSERTAR ASTERISCOS *******************************/

//funcion que instertara las letras de las palabras con *
function insertarLetra() {

    //cogemos el div(donde se irán poniendo las letras como * y los espacios)
    let frase = document.getElementById("frase");
    //cogemos el parrafo donde iran los intentos
    let intentos = document.getElementById("intentos");
    
    for (let i = 0; i < juego.letrasFrase.length; i++) {

        if (juego.letrasFrase[i]!== " ") {

            frase.textContent += "*";
        }
        else {
            frase.textContent += " ";
        }
    }
    intentos.textContent = `INTENTOS: ${juego.intentos}`;
}



/********************************* FUNCION COMPROBAR LETRAS Y AÑADIR LAS QUE ESTEN BIEN*******************************/

//funcion para comprobar las letras testeadas.
function comprobarLetra() {

    for (let i = 0; i < juego.letrasFrase.length; i++) {
        if(!juego.letrasFrase.includes(juego.letrasFrase.length[i])){
            juego.intentos--;
        }
    }

    frase.addEventListener("keypress", (ev) => {
    });
}

/********************************* FUNCION INICIO DEL JUEGO*******************************/


//funcion inicial la cual iniciara el juego y cambiara el estado de esta
async function iniciarJuego() {

    //cuando se inicie el juego cambiamos el estado a jugando.
    juego.estado = "jugando";

    //llamamos a la funcion para obtener las palabras
    await obtenerPalabras();
    //llamamos a la funcion para que inserle la frase sin mostrarla
    await insertarLetra();
    console.log(insertarLetra());

    //si se pulsa reiniciar se volvera a llamar a la funcion de iniciar juego
    let reiniciar = document.getElementById('reiniciar');
    reiniciar.addEventListener("click", () => {
        iniciarJuego();
    });
}



/********************************* INICIO DEL JUEGO ******************************/

//iniciamos el juego :)
iniciarJuego();