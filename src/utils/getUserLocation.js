export const getUserLocation = () => {
    return new Promise((resolve) => {
        const savedLat = localStorage.getItem("lat");
        const savedLng = localStorage.getItem("lng");
        const savedTime = localStorage.getItem("location_time");

        const ONE_HOUR = 60 * 60 * 1000;

        // check if valid cached location
        if (savedLat && savedLng && savedTime) {
            const isFresh = Date.now() - Number(savedTime) < ONE_HOUR;

            if (isFresh) {
                console.log("Using cached location ⚡");
                return resolve({
                    lat: Number(savedLat),
                    lng: Number(savedLng),
                });
            }
        }

        // ❗ else fetch fresh location
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;

                localStorage.setItem("lat", latitude);
                localStorage.setItem("lng", longitude);
                localStorage.setItem("location_time", Date.now());

                console.log("Fetched fresh location 📍");

                resolve({ lat: latitude, lng: longitude });
            },
            () => {
                const fallbackLat = 12.9716;
                const fallbackLng = 77.5454;

                resolve({ lat: fallbackLat, lng: fallbackLng });
            }
        );
    });
};