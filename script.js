document.addEventListener("DOMContentLoaded", () => {
    // Initialize map
    const map = L.map('map').setView([40.6782, -73.9442], 12); // Brooklyn

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Sample church data (we'll automate this later)
    const churches = [
        {
            name: "Bethany Baptist Church",
            address: "460 Marcus Garvey Blvd, Brooklyn, NY 11216",
            activities: ["Food Pantry", "Youth Ministry", "Affordable Housing"]
        },
        {
            name: "St. Paul's Community Baptist Church",
            address: "859 Hendrix St, Brooklyn, NY 11207",
            activities: ["Afterschool Program", "Health Services", "Civic Engagement"]
        }
        ];

        // Add markers
        churches.forEach(church => {
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(church.address)}`)
                .then(res => res.json())
                .then(data => {
                    if (data.length > 0) {
                        const lat = data[0].lat;
                        const lon = data[0].lon;
                        L.marker([lat, lon]).addTo(map)
                            .bindPopup(`<strong>${church.name}</strong><br>${church.address}<br><ul>${church.activities.map(a => `<li>${a}</li>`).join('')}</ul>`);
                    }
                });
      });
});
