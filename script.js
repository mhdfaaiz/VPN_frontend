document.addEventListener("DOMContentLoaded", () => {
    // Fetch data from the backend
    const fetchAndUpdateStatuses = () => {
        fetch("http://localhost:3000/api/devices")
            .then(response => response.json())
            .then(devices => {
                // Iterate over the list of devices fetched from the backend
                devices.forEach(device => {
                    // Find the corresponding HTML element by device name
                    const deviceElement = document.querySelector(
                        `.device-item[data-device-name="${device.name}"]`
                    );

                    if (deviceElement) {
                        // Find the status icon within the element
                        const statusIcon = deviceElement.querySelector(".status-icon");

                        // Update the icon's class based on the status
                        if (device.status === "online") {
                            statusIcon.classList.add("status-online");
                            statusIcon.classList.remove("status-offline");
                        } else {
                            statusIcon.classList.add("status-offline");
                            statusIcon.classList.remove("status-online");
                        }
                    }
                });
            })
            .catch(error => console.error("Error fetching devices:", error));
    };
    // Call the function initially
    fetchAndUpdateStatuses();

    // Set an interval to refresh the statuses every 30 seconds
    setInterval(fetchAndUpdateStatuses, 30000); // 30 seconds
});
