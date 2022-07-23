let host, apiUrl
let markers = {}
function setUrls() {
  host = window.location.protocol + '//' + window.location.host + window.location.pathname
  host = host.replace('/mapa.html', '')
  apiUrl = host + '/api'
}
function parseResponse(response) {
  return response.text().then(
    data => {
      let body
      try {
        body = JSON.parse(data)
      } catch(error) {
        body = null
      }
      return { status: response.status, body: body}
    }
  )
}
function getTrialList() {
  return fetch(`${apiUrl}/api_trials_list.php`, {
    method: 'GET',
  })
    .then(parseResponse)
    .then(result => {
      if (result.status > 399) {
        console.log('Error ' + result.status)
      } else if (result.body) {
        result.body.forEach(trial => {
          let countries = trial.Countries.split(';')
          if (!countries.length) return
          countries.forEach(country => {
            const countryCoors = allCountries.find(obj => obj.country.startsWith(country))
            if (!countryCoors) return

            if (markers[country] != undefined) {
              markers[country].trials.push(trial)
              markers[country].total += 1
            } else {
              markers[country] = {
                country: country,
                latitude: countryCoors.latitude,
                longitude: countryCoors.longitude,
                total: 1,
                trials: [trial]
              }
            }
          })
        })
        console.log(markers)
        markers = Object.values(markers)
      }
    })
    .catch(error => {
      console.log('Error: ' + error)
    })
}
async function init() {
  setUrls()
  await getTrialList()
  await getLastUpdate()
  initMap()
}
init()

//mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2am9zdWUiLCJhIjoiY2w1c3YxZHhtMmwzazNwc3h6MWF0MnM4NyJ9.RlPytsYwFwWxc22Ck0UKtg';
// Set as market
mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2am9zdWUiLCJhIjoiY2t5NHlpeHNwMGNiNTJwb2FmcWVuZ21xMyJ9.nqH9JIdfpyMoEW7qp7GWkg';

function cambiarContenido(index) {
  const marker = markers[index]
  console.log(marker.trials)
  let html = `
    <div class="modal-header">
      <h5 class="modal-title" id="title">${marker.country}</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">&times;</span>
      </button>
      </div>
      <div class="modal-body d-flex justify-content-between align-content-center">
      <img src="ico/images.png" alt="" srcset="" class="img_body_modal">
      <div class="ctnt-info">
        <p> Country  : ${marker.country}</p>
        <p> Longitude: ${marker.longitude}</p>
        <p> Latitude : ${marker.latitude}</p>
        <p> Places Information </p>
  `
  marker.trials.forEach(trial => {
  html += `
              <hr>
              <p>${trial.Public_title}</p>
              <p>${trial.TrialID}</p>
              <a href="${trial.web_address}">Site</a>
              <br>
              `
            })
  html += `
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary btn-sec" data-dismiss="modal">Close</button>
    </div>
  `
    document.querySelector('#modal-content').innerHTML = html
}
function initMap() {
  const features = []
  markers.forEach(marker => {
    const feature = {
      'type': 'Feature',
      'properties': {
        'title': 'Mapbox',
        'description': marker,
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [marker.longitude, marker.latitude]
      }
    }
    features.push(feature)
  })
  const geojson = {
    'type': 'FeatureCollection',
    'features': features,
  };
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [55, -10],
    zoom: 0
  });
  markers.forEach((marker, index) => {
    const titleElement = document.getElementById("title");
    // create a HTML element for each feature
    const china = document.createElement('div');
    china.className = 'marker';
    china.id='markadorunico';
    //link1.innerHTML=feature.properties.description.places[0].web_address;
    // create the popup
    const pop_China = new mapboxgl.Popup({ offset: 25 }).setHTML(
    `
      <h3>${geojson.features[index].properties.description.country}</h3>
      <h2>${geojson.features[index].properties.description.total}</h2>
      <button type="button" onclick="cambiarContenido(${index})" class="btn btn-primary btn-sec" data-toggle="modal" data-target="#modal-tamplate">
      Informacion
      </button>
    `
    );
    // make a marker for each feature and add it to the map
    new mapboxgl.Marker(china)
      .setLngLat(geojson.features[index].geometry.coordinates)
      .setPopup(pop_China)
      .addTo(map);
  })
}


function getLastUpdate() {
  return fetch(`${apiUrl}/api_last_update.php`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(parseResponse)
    .then(result => {
      if (result.status > 399) {
        console.log('Error '+ result.status)
        return
      }
      document.querySelector('#last-update').innerHTML = result.body
    })
    .catch(error =>{
      console.log('Error: '+ error)
    })
}
