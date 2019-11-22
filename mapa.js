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

window.addEventListener('load',getLocations);



//Func. conteo de carga
const time = document.getElementById('time');
const timeButton = document.getElementById('timeButton');
document.getElementById('countDown');
// function
const showTime =  () => {
    const timeValue = time.value;
    let contador = timeValue;
    countDown.textContent = contador;
    setTimeout(function () {
        document.getElementById('end').innerHTML=`<p>Carga completada</p><button>Pagar</button>`;
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
// show count Down
timeButton.addEventListener('click', showTime);


//carrusel
$('#blogCarousel').carousel({
    interval: 5000
});

const printData = () => {
    fetch('electricCharger.json')
        .then(response => response.json())
        .then(locations => {

            locations.forEach(place => {
        let card = `
                        <div class="card" style="width: 13rem;">
                            <div class="card-body">
                                <h5 class="card-title">${place.name}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">Tipo de cargador: ${place.plug_type}.</h6>
                                <p class="card-text">Precio: ${place.kw_price}/min.</p>
                                <p class="card-text">Estado: ${place.state}.</p>
                                <a href="#" class="card-link">Reservar</a>
                                <a href="#" class="card-link">Cargar</a>
                            </div>
                        </div>

`;
        document.getElementById('cards').insertAdjacentHTML("beforeend", card);
    });
    return printData;
})
};

printData();


