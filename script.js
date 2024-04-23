document.addEventListener('DOMContentLoaded', function () {
    // Function to load GLTF model dynamically based on GPS coordinates
    function loadModel(latitude, longitude) {
        var scene = document.querySelector('a-scene');

        // Create a new entity for the model
        var modelEntity = document.createElement('a-entity');
        modelEntity.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        modelEntity.setAttribute('gltf-model', 'url(./assets/venus/scene.gltf)');
        modelEntity.setAttribute('scale', '0.1 0.1 0.1');
        modelEntity.setAttribute('position', `0 -5 -20`);

        // Add the model entity to the scene
        scene.appendChild(modelEntity);
    }

    // Function to get current GPS coordinates
    function getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            loadModel(latitude, longitude);
        });
    }

    // Call the function to load the model based on current GPS coordinates
    getCurrentLocation();
});
