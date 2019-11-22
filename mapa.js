//Func. que muestra los marcadores y mapa

let locationsInfo = [];
let markers;
let filtered=[];
let map;
let marker;
let myPrice= document.querySelector(".precio")
let myConnector=document.querySelector(".conector")
let myState=document.querySelector(".estado")

// Yael
//FUncion para imprimir las tarjetas
const printTarget = document.getElementById("target");

let target = (data) => {
    let str = '';
    data.forEach(element =>{
        let i=0;
        str +=
            `<div id="card${element.id}" class="container">
                <div class="title">
                    Mirna Guzman
                </div>
                <div class="date-marca" id="marca">
                    ${element.name}
                </div>
                <div class="container_date">
                    <div class="date" id="status">
                        <img class="icon-target" src="img/electric-station.png">
                        ${element.estatus.toUpperCase()}
                    </div>
                    <div class="date" id="type">
                        <img class="icon-target" src="img/tools-and-utensils.png">
                        ${element.cargador.slice(0,2)}
                        </br>
                        ${element.cargador.slice(3,8)}
                    </div>
                    <div class="date" id="price">
                        <img class="icon-target" src="img/coin.png">
                        ${element.costo}</div>
                    </div>
                    <div class="btn">
                        <a href="#contador"><input type="button" class="button" id="btn_charge" value="CARGAR"></a>
                        <input type="button" class="button" id="btn_reserve" value="RESERVAR">
                    </div>
            </div>
            `
    });    
    printTarget.innerHTML = str;
};

const getLocations = () => {
    fetch('https://cors-anywhere.herokuapp.com/api-electric-charger.herokuapp.com/electricCharger')
        .then(response => response.json())
        .then(locations => {

            locations.forEach(location => {
                let locationData = {
                    id:location.id,
                    position: {
                        lat: Number(location.geolocation.latitude),
                        lng: Number(location.geolocation.longitude)
                    },
                    name: location.name,
                    cargador:location.plug_type,
                    costo:location.kw_price,
                    estatus: location.state,
                };

                locationsInfo.push(locationData);

                // console.log(location.name);

            });

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((data) => {
                    let currentPosition = {
                        lat: data.coords.latitude,
                        lng: data.coords.longitude
                    };
                    dibujarMapa(currentPosition, locationsInfo)
                })
            }
        })

};

window.addEventListener('load',getLocations);


const dibujarMapa = (obj, locationsInfo) => {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: obj,
        styles:[
            {
                "featureType": "landscape",
                "stylers": [
                    {
                        "color": "#e6e9ec"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.terrain",
                "stylers": [
                    {
                        "color": "#e6e9ec"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.terrain",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e6e9ec"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "stylers": [
                    {
                        "color": "#a4dbb2"
                    }
                ]
            },
            {
                "featureType": "road",
                "stylers": [
                    {
                        "color": "#b0c1dd"
                    }
                ]
            },
            {
                "featureType": "water",
                "stylers": [
                    {
                        "color": "#acd5f5"
                    }
                ]
            }
        ]
    });

    marker = new google.maps.Marker({
        position: obj,
        title: 'Tu ubicacion',
        icon: 'img/ubication.png'
    });
    marker.setMap(map);

    markers = locationsInfo.map(place => {
        if (place.estatus === 'free'){
            return new google.maps.Marker({
                position: place.position,
                map: map,
                title: place.name,
                icon: 'img/free.png'
            });
        } else {
            return new google.maps.Marker({
                position: place.position,
                map: map,
                title: place.name,
                icon: 'img/busy.png'
            })
        }

    })

};


myPrice.addEventListener("click", (e) => {
    selectedPrice = event.target.innerText
    selectedPrice=selectedPrice.slice(1)
    console.log(`Holis, el precio es ${event.target.innerText}`)
    filtered=locationsInfo.filter(location => location.costo === selectedPrice);
    console.log(filtered);
    target(filtered)


        navigator.geolocation.getCurrentPosition((data)=>{
            let currentPosition = {
                lat: data.coords.latitude,
                lng: data.coords.longitude
            };
            dibujarMapa(currentPosition, filtered)
        })
});

myConnector.addEventListener("click", (event) => {
    let criterion= event.target.innerText
    console.log(criterion);
    filtered=locationsInfo.filter(location => (location.cargador).includes(criterion));
    console.log(filtered);
    target(filtered)

    // if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((data)=>{
            let currentPosition = {
                lat: data.coords.latitude,
                lng: data.coords.longitude
            };
            dibujarMapa(currentPosition, filtered)
        })
});

myState.addEventListener("click", (event) => {
    let estado= event.target.dataset.value
    console.log(`el estado es: ${estado}`);
    filtered=locationsInfo.filter(location => location.estatus === estado);
    console.log(filtered);
    target(filtered)

    // if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((data)=>{
            let currentPosition = {
                lat: data.coords.latitude,
                lng: data.coords.longitude
            };
            dibujarMapa(currentPosition, filtered)
        })
});


window.addEventListener('load',getLocations);


const pay =()=> {
    document.getElementById('end').className = "visible";
};


//Func. conteo de carga
const time = document.getElementById('time');
const timeButton = document.getElementById('timeButton');
document.getElementById('countDown');

// function
const showTime =  () => {
    const timeValue = time.value;
    let contador = timeValue;
    countDown.textContent = contador;
    setTimeout( () => {
        // document.getElementById('end').innerHTML=`<p>Carga completada</p><button>Pagar</button>`;
        pay();
    }, timeValue * 1000);
    const countDownValue = setInterval( ()=> {
        if (contador > 0) {
            countDown.textContent = contador;
            contador--;
            countDown.textContent = contador;
        } else {
            clearInterval(countDownValue);
        }
    }, 1000);


};

const show =()=>{
    document.getElementById("containerLoading").className = "visible";
};

const sendInfo=()=>{
    showTime();
    show();
    // time.value = "";
};
timeButton.addEventListener('click', sendInfo);


//Record
n =  new Date();
//Año
y = n.getFullYear();
//Mes
m = n.getMonth() + 1;
//Día
d = n.getDate();

let time1 = time.value;

let time2 = time.value;
// History
const history = () =>{
    document.getElementById('today').innerHTML = `${d}/${m}`;
    document.getElementById('energy').innerHTML = time1*30;
    document.getElementById('total').innerText = time2*25;
};
// history();


//Llamados a func.
document.getElementById("date").innerHTML = `${d-7}/${m}/${y} - ${d}/${m}/${y}`;
document.getElementById("date2").innerHTML = `Fecha: ${d}/${m}/${y}`;
document.getElementById('pay').addEventListener('click',history);
