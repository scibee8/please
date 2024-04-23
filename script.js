document.addEventListener('DOMContentLoaded', function () {
    // Function to check if the device is mobile
    function isMobileDevice() {
        console.log("Checking if the device is mobile...");
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    }

    // Function to get model position based on device type
    function getModelPosition() {
        if (isMobileDevice()) {
            console.log("Mobile device detected. Using mobile-specific positioning.");
            return '0 0 -5';  // Closer and centered for mobile
        } else {
            console.log("Desktop device detected. Using desktop-specific positioning.");
            return '0 -5 -20';  // Default for desktop
        }
    }

    // Function to load GLTF model dynamically based on GPS coordinates
    function loadModel(latitude, longitude) {
        console.log(`Loading model at latitude: ${latitude}, longitude: ${longitude}`);
        var scene = document.querySelector('a-scene');
        if (!scene) {
            console.error("Failed to find the <a-scene> element. Check your HTML.");
            return;
        }

        // Create a new entity for the model
        var modelEntity = document.createElement('a-entity');
        modelEntity.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        modelEntity.setAttribute('gltf-model', 'url(./assets/venus/scene.gltf)');
        modelEntity.setAttribute('scale', '0.1 0.1 0.1');
        modelEntity.setAttribute('position', getModelPosition());

        // Add the model entity to the scene
        scene.appendChild(modelEntity);
        console.log("Model entity added to the scene.");
    }

    // Function to get current GPS coordinates
    function getCurrentLocation() {
        console.log("Attempting to get current GPS location...");
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(`GPS position obtained: latitude ${position.coords.latitude}, longitude ${position.coords.longitude}`);
            loadModel(position.coords.latitude, position.coords.longitude);
        }, function(error) {
            console.error("Failed to get GPS location: ", error);
        });
    }

    // Call the function to load the model based on current GPS coordinates
    getCurrentLocation();
});

