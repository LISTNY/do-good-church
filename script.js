const churches = [
{
name: "Bethany Baptist Church",
address: "460 Marcus Garvey Blvd, Brooklyn, NY 11216",
zip: "11216",
score: 35,
activities: ["food pantry", "youth ministry", "affordable housing"],
lat: 40.6801,
lng: -73.9366
},
{
name: "St. Paul’s Community Baptist Church",
address: "859 Hendrix St, Brooklyn, NY 11207",
zip: "11207",
score: 45,
activities: ["afterschool", "civic engagement", "counseling"],
lat: 40.6586,
lng: -73.8817
},
{
name: "Mt. Lebanon Baptist Church",
address: "228 Decatur St, Brooklyn, NY 11233",
zip: "11233",
score: 25,
activities: ["weekly community event", "economic empowerment"],
lat: 40.6821,
lng: -73.9233
}
];

const map = L.map('map').setView([40.6782, -73.9442], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '© OpenStreetMap'
}).addTo(map);

let markers = [];

function addMarkers(filteredChurches) {
markers.forEach(marker => map.removeLayer(marker));
markers = [];

filteredChurches.forEach(church => {
const popupContent = `
<div style="text-align: center;">
<div style="font-size: 28px; font-weight: bold; color: #2E7D32; margin-bottom: 4px;">
Score: ${church.score}
</div>
<div style="font-size: 18px; font-weight: 600; margin-bottom: 6px;">
${church.name}
</div>
<ul style="text-align: left; padding-left: 20px; font-size: 14px; margin-bottom: 6px;">
${church.activities.map(act => `<li>${act}</li>`).join('')}
</ul>
<div style="font-size: 12px; color: #555;">
${church.address}
</div>
</div>
`;
const marker = L.marker([church.lat, church.lng])
.addTo(map)
.bindPopup(popupContent);
markers.push(marker);
});
}

// Initial display of all churches
addMarkers(churches);

document.getElementById('zipSearchForm').addEventListener('submit', function(e) {
e.preventDefault();
const zip = document.getElementById('zipInput').value.trim();
const filtered = churches.filter(church => church.zip === zip);
addMarkers(filtered);
});
