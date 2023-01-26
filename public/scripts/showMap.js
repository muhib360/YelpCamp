mapboxgl.accessToken = mbxToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: campground.geometry.coordinates,
    zoom: 9,
});

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<h3>${campground.title}</h3><h6>${campground.location}</h6>`
        )
    )
    .addTo(map);

map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');