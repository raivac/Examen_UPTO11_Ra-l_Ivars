// api key : 82005d27a116c2880c8f0fcb866998a0


/************* FUNCION GENERAL ************/
function funcionGeneral() {

    var icono = document.getElementById("icono")

    //cogemos la latitud y la longitud para pasarselas al fetch
    navigator.geolocation.getCurrentPosition(async pos => {

        var lat = pos.coords.latitude;

        var lon = pos.coords.longitude;

        var apikey = "82005d27a116c2880c8f0fcb866998a0"

        try {
            //llamamos a la api para que nos devuelva el json con los datros
            let respuesta = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`);

            //obtenemos la respuesta del fetch
            let resultado = await respuesta.json();
            console.log(resultado);

            //cambiamos el icono
            var icono = document.getElementById("icono");
            icono.setAttribute("src",`./icons/${resultado.weather[0].icon}.png`);

            //cambiamos la temperatua
            var temp = document.getElementById("temp");
            var tc = resultado.main.temp - 273.15;
            var tf = tc*1.8+32;
            temp.textContent =  Math.floor(tc) +"°C";


            //funcion que permitira cambiar de temperatura entre celsius io fahrenheit.
            temp.addEventListener("click",()=>{

                if(temp.textContent == Math.floor(tc) +"°C"){
                    temp.textContent =  Math.floor(tf) +"°F";
                }
                else{
                    temp.textContent =  Math.floor(tc) +"°C";
                }
            })
            
            //cambiamos la descripcion
            var desc = document.getElementById("desc");
            desc.textContent=resultado.weather[0].description;

            //agregamos la ubicacion
            var ubi = document.getElementById("ubi");
            ubi.textContent=resultado.name + ", "+resultado.sys.country;
            
        }
        catch (error) {
            console.log(error);
        }


    }, showError);
    
    //funcion qu emostrara una alerta en caso de error
    function showError(error) {
        alert(error.message);
    }
}


//llamamos a la funcion principal
funcionGeneral();




