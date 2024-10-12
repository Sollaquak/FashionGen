async function fetchDomain() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0) {
                return reject(new Error('No active tabs found'));
            }
            const url = tabs[0].url;
            const domain = new URL(url).hostname; // Extract the domain
            const cleanedDomain = domain.replace(/^www\./, ''); // Remove 'www.'
            resolve(cleanedDomain);
        });
    });
}

async function loadData(domain) {
    try {
        const response = await fetch('./website-data.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();

        // Access the data
        const fashionData = jsonData.data;

        // Return the data for the specified domain
        console.log(fashionData[domain]);
        return fashionData[domain] || null; // Return null if domain is not found
        
    } catch (error) {
        console.error('Error fetching JSON:', error);
        return null; // Return null or handle the error as needed
    }
}

const domain = await fetchDomain();
const data = await loadData(domain);
console.log(data);

const websiteNameElement = document.getElementById("websiteName")
const peopleElement = document.getElementById("people");
const planetElement = document.getElementById("planet");
const animalElement = document.getElementById("animal");

websiteNameElement.textContent = domain.split('.')[0].toUpperCase();
peopleElement.textContent = data.People;
planetElement.textContent = data.Planet;
animalElement.textContent = data.Animal;


