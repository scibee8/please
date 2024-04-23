
document.addEventListener('DOMContentLoaded', function () {
    var scene = document.querySelector('a-scene');

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
        if (!scene) {
            console.error("Failed to find the <a-scene> element. Check your HTML.");
            return;
        }

        // Create a new entity for the model
        var modelEntity = document.createElement('a-entity');
        modelEntity.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        modelEntity.setAttribute('gltf-model', 'url(./assets/venus/scene.gltf)');
        modelEntity.setAttribute('scale', getModelPosition());
        modelEntity.setAttribute('position', getModelPosition());

        // Add the model entity to the scene
        scene.appendChild(modelEntity);
        console.log("Model entity added to the scene.");

        // Start dynamic testing of scales and positions
        startDynamicTesting(modelEntity);
    }

    // Function to start dynamic testing of scales and positions
    function startDynamicTesting(modelEntity) {
        var scales = [
            [0.05, 0.05, 0.05], [0.1, 0.1, 0.1], [0.2, 0.2, 0.2],
            [0.5, 0.5, 0.5], [1, 1, 1], [1.5, 1.5, 1.5], [2, 2, 2], [3, 3, 3]
        ];
        var positions = [
            [0, -10, -20], [0, -5, -15], [0, 0, -10], [0, 5, -5],
            [0, 1, 0], [0, 2, 5], [0, 3, 10], [0, 4, 15],
            [0, -1, 20], [0, -2, 25], [0, -3, 30], [0, -4, 35],
            [0, -5, 40], [0, -6, 45], [0, -7, 50]
        ];

        var currentIndex = 0;

        setInterval(() => {
            modelEntity.setAttribute('scale', scales[currentIndex % scales.length].join(' '));
            modelEntity.setAttribute('position', positions[currentIndex % positions.length].join(' '));
            console.log(`Model updated with scale: ${scales[currentIndex % scales.length].join(' ')} and position: ${positions[currentIndex % positions.length].join(' ')}`);
            currentIndex++;
        }, 5000);
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
