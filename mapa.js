//Func. que muestra los marcadores y mapa

let locationsInfo = [];
let markers;
let filtered=[];
let map;
let marker;
let myPrice= document.querySelector(".precio")
let myConnector=document.querySelector(".conector")
let myState=document.querySelector(".estado")

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

// let filterLocations= (criterio) => {
//     let criterion= criterio;
//     console.log(criterion);
//     filtered=locationsInfo.filter(location => (location.cargador).includes(criterion));
//     console.log(filtered);

//     // if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition((data)=>{
//             let currentPosition = {
//                 lat: data.coords.latitude,
//                 lng: data.coords.longitude
//             };
//             dibujarMapa(currentPosition, filtered)
//         })
// };

// let filterByPrice = (e) => {
//     selectedPrice = event.target.innerText
//     console.log(`Holis, el precio es ${event.target.innerText}`)
//     filtered=locationsInfo.filter(location => location.costo === selectedPrice);
//     console.log(filtered);

//     // if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition((data)=>{
//             let currentPosition = {
//                 lat: data.coords.latitude,
//                 lng: data.coords.longitude
//             };
//             dibujarMapa(currentPosition, filtered)
//         })
// }



myPrice.addEventListener("click", (e) => {
    selectedPrice = event.target.innerText
    selectedPrice=selectedPrice.slice(1)
    console.log(`Holis, el precio es ${event.target.innerText}`)
    filtered=locationsInfo.filter(location => location.costo === selectedPrice);
    console.log(filtered);

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



//Func. conteo de carga

