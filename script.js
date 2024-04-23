document.addEventListener('DOMContentLoaded', function () {
    // Function to check if the device is mobile
    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    }

    // Function to get model position based on device type
    function getModelPosition() {
        if (isMobileDevice()) {
            // Position for mobile devices
            return '0 0 -5';  // Adjusted closer and centered
        } else {
            // Position for desktop
            return '0 -5 -20';  // Original position
        }
    }

    // Function to load GLTF model dynamically based on GPS coordinates
    function loadModel(latitude, longitude) {
        var scene = document.querySelector('a-scene');

        // Create a new entity for the model
        var modelEntity = document.createElement('a-entity');
        modelEntity.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        modelEntity.setAttribute('gltf-model', 'url(./assets/venus/scene.gltf)');
        modelEntity.setAttribute('scale', '0.1 0.1 0.1');
        modelEntity.setAttribute('position', getModelPosition());

        // Add the model entity to the scene
        scene.appendChild(modelEntity);
    }

    // Function to get current GPS coordinates
    function getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            loadModel(latitude, longitude);
        }, function(error) {
            console.error("Geolocation error:", error);
        });
    }

    // Call the function to load the model based on current GPS coordinates
    getCurrentLocation();
});
