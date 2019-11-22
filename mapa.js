//Func. que muestra los marcadores y mapa
const printTarget = document.getElementById("target");

let locationsInfo = [];

const getLocations = () => {
    fetch('https://cors-anywhere.herokuapp.com/https://api-electric-charger.herokuapp.com/electricCharger')
        .then(response => response.json())
        .then(locations => {

        // Yael
        let date = locations;
        console.log(date);
    
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
                                ${element.state.toUpperCase()}
                            </div>
                            <div class="date" id="type">
                                <img class="icon-target" src="img/tools-and-utensils.png">
                                ${element.plug_type.slice(0,-5)}
                                </br>
                                ${element.plug_type.slice(4,8)}
                            </div>
                            <div class="date" id="price">
                                <img class="icon-target" src="img/coin.png">
                                ${element.kw_price}</div>
                            </div>
                            <div class="btn">
                                <input type="button" class="button" id="btn_charge" value="CARGAR">
                                <input type="button" class="button" id="btn_reserve" value="RESERVAR">
                            </div>
                    </div>
                    `
            });
    
            // console.log(str);
            // let newArray=[]
            
            printTarget.innerHTML = str;
            console.log(printTarget)
    
            const container = document.querySelector("container")
            console.log(container);
    
    
        }
    
        target(date)

            let locationsInfo = [];

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

