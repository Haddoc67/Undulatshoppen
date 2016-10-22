function createDirectionsMap() {
    if (navigator.geolocation) { //chek hvis browser understøtter geolocation

        navigator.geolocation.getCurrentPosition(OnSuccess, OnError, {
            enableHighAccuracy: true,
            maximumAge: 1000,
            timeout: 500
        });
    } else {

        document.getElementById(map).innerHTML = "Desværre, denne browser er gammel og udelig!";
    }
};

    function OnSuccess(position) {
        showMap(
            position.coords.latitude,
            position.coords.longitude
        );
    }

    function OnError() {
        var mapDiv = document.getElementById("map");
        switch (error.code) {
        case error.PERMISSION_DENIED:
            mapDiv.innerHTML = "Ikke muligt at finde gps"
            break;
        case error.POSITION_UNAVAILABLE:
            mapDiv.innerHTML = "ingen information omkring lokation"
            break;
        case error.TIMEOUT:
            mapDiv.innerHTML = "søgetid for lang..."
        case error.UNKNOWN_ERROR:
            mapDiv.innerHTML = "ukendt fejl opstod.."
            break;
        }
    };

    function showMap(lat, long) {
        var directionsService = new window.google.maps.DirectionsService();
        var directionsRenderer = new window.google.maps.DirectionsRenderer();

        var route = {
            origin: new window.google.maps.LatLng(lat, long),
            destination: "Ørestad, Copenhagen",
            travelMode: window.google.maps.DirectionsTravelMode.DRIVING
        };

        var mapOptions = {
            zoom: 10,
            center: new window.google.maps.Lating(55.6429482, 12.58440040000005),
            mapTypeId: window.google.maps.MapTypeId.ROADMAP
        };

        var kort = new window.google.maps.Map(document.getElementById("map"), mapOptions);
        directionsRendererirectionsRenderer.setMap(map);
        directionsServiceirectionsService.route(route, function(result, status) {
            if (status === window.google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);
            }

        });
    }