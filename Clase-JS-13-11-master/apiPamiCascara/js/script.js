const keyWe = "886bed8860f03910923884a6acc78fd3";




window.addEventListener('load', function () {
    cargarSelectCiudades();
    document.getElementById('selCiudades').addEventListener('change', traerPronostico);

});

function cargarSelectCiudades() {
    traerCiudades();
};

function traerCiudades() {
    /*ajax  */
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                let datos = JSON.parse(xhr.responseText);
                ciudades = parsearArgentina(datos);
                let selCiudades = document.getElementById('selCiudades');
                for (ciudad of ciudades) {
                    let opcion = document.createElement('option');
                    opcion.setAttribute('value', ciudad.id);
                    let texto = document.createTextNode(ciudad.nombre);
                    opcion.appendChild(texto);
                    selCiudades.appendChild(opcion);
                }
            }
            else {

                console.error(xhr.status + " , " + xhr.statusText);
            }
        }
        else {

        }


    }
    xhr.open('GET', './city.list.json');
    xhr.send();
};

function parsearArgentina(arr) {

    return arr.filter(ciudad => ciudad.country === "AR")
        .map(ciudad => ({ id: ciudad.id, nombre: ciudad.name + "," + ciudad.country }));


}


function traerPronostico() {

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                let pronostico = JSON.parse(xhr.responseText);
                actualizarPronostico(pronostico);
                
                /*console.log(pronostico);*/
                
                /*
                                for (ciudad of ciudades){
                                    let opcion = document.createElement('option');
                                    opcion.setAttribute ('value', ciudad.id);
                                    let texto = document.createTextNode(ciudad.nombre);
                                    opcion.appendChild (texto);
                                    selCiudades.appendChild (opcion);*/
            }
            else {

                console.error(xhr.status + " , " + xhr.statusText);
            }
        }
        else {
        }

    }
    let x =  ("https://api.openweathermap.org/data/2.5/weather?id=" + (document.getElementById('selCiudades').value) + "&lang=es&units=metric&APPID=" + keyWe);
    xhr.open('GET',x, true);
    xhr.send();
}





/*function armarURL (){
    let idCiudad = document.getElementById('selCiudades').value;
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + idCiudad + "&lang=es&units=metric&APPID=" + apiKey ;
return url;
}*/
function actualizarPronostico (pronostico){
       document.getElementById("temperatura").innerText = "Temperatura: " + (pronostico.main.temp);
       document.getElementById("humedad").innerText = "Humedad: " + (pronostico.main.humidity);
       document.getElementById("presion").innerText = "Presión: " + (pronostico.main.pressure);
       document.getElementById("viento").innerText = "Viento: " + (pronostico.wind.speed);
       document.getElementById("minmax").innerText = "Máxima: " + (pronostico.main.temp_max);
       
       document.getElementById ("imagen").setAttribute('src',"http://openweathermap.org/img/w/" + pronostico.weather[0].icon + ".png");
document.getElementById ("imagen").setAttribute('style', 'width:90px');


       }
/*


"viento">Viento: -- Km/h</div>
"card-title">Pronóstico para hoy</h4>
"card-text text-left" id="descripcion">Se espera </div>
"minmax">Máxima: --°C / Minima: ° C</div>*/


function traerFecha()
{
    let fecha = new(Date)
    return fecha;
}