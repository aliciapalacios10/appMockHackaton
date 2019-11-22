//Func. que muestra los marcadores y mapa

let locationsInfo = [];

const getLocations = () => {
    fetch('electricCharger.json')
        .then(response => response.json())
        .then(locations => {

            locations.forEach(location => {
                let locationData = {

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

                console.log(location.name);

                // locationsInfo.filter(location =>
                //     location.cargador === carg
                // )

            });

            // console.log('COORDENADAS',locationInfo);


            // let names = [];
            // locations.forEach(location => {
            //     let allNames = {
            //             name:(location.name),
            //     };
            //     names.push(allNames)
            // });
            // console.log(names);

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
    let map = new google.maps.Map(document.getElementById('map'), {
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

    let marker = new google.maps.Marker({
        position: obj,
        title: 'Tu ubicacion',
        icon: 'img/ubication.png'
    });
    marker.setMap(map);

    let markers = locationsInfo.map(place => {
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
    time.value = "";
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

// History
const history = () =>{
    document.getElementById('today').innerHTML = `${d}/${m}/${y}`;
    document.getElementById('energy').innerHTML = "aqui va la carga";
    document.getElementById('total').innerText = "qui va el precio;"
};
// history();


//Llamados a func.
document.getElementById("date").innerHTML = `${d-7}/${m}/${y} - ${d}/${m}/${y}`;
document.getElementById("date2").innerHTML = `${d}/${m}/${y}`;
document.getElementById('pay').addEventListener('click',history);

