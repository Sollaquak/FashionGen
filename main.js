// Event Listeners for Scroll Buttons
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('scroll-down-button').addEventListener('click', function () {
        document.getElementById("second-container").scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('scroll-up-button').addEventListener('click', function () {
        document.getElementById("container").scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// Gets domain name

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

// Fetches data from JSON
async function fetchData(domain) {
    try {
        const response = await fetch('./data/website-scores.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        const fashionData = jsonData.data;
        return fashionData[domain] || null; // Return null if domain is not found
        
    } catch (error) {
        console.error('Error fetching JSON:', error);
        return null; // Return null or handle the error as needed
    }
}

async function init() {
    const domain = await fetchDomain();
    const data = await fetchData(domain);
    
    if (data) {
        // Calculate overall score
        const overall = (data.People + data.Planet + data.Animal) / 3;

        // Get all the HTML elements
        const websiteNameElement = document.getElementById("websiteName");
        const peopleBarElement = document.getElementById("peopleBar");
        const planetBarElement = document.getElementById("planetBar");
        const animalBarElement = document.getElementById("animalBar");
        const overallBarElement = document.getElementById("overallBar");

        // Adjust HTML elements
        websiteNameElement.textContent = domain.split('.')[0].toUpperCase();
        peopleBarElement.style.width = '0%'; // Start at 0%
        planetBarElement.style.width = '0%'; // Start at 0%
        animalBarElement.style.width = '0%'; // Start at 0%
        overallBarElement.style.width = '0%'; // Start at 0%

        function getBarColor(value) {
            if (value >= 70) {
                return '#0CC078';
            } else if (value >= 30) {
                return '#ffdc2e';    
            } else {
                return '#FB4747';
            }
        }

        // Function to animate the filling of the progress bars
        function animateProgressBar(barElement, targetValue) {
            barElement.style.backgroundColor = getBarColor(targetValue); // Set color based on value
            let width = 0;

            const interval = setInterval(() => {
                if (width >= targetValue) {
                    clearInterval(interval);
                } else {
                    width++;
                    barElement.style.width = width + '%';
                }
            }, 20); // Adjust the speed of the animation here
        }

        // Animate each progress bar using the loaded data
        animateProgressBar(overallBarElement, overall);
        animateProgressBar(planetBarElement, data.Planet);
        animateProgressBar(peopleBarElement, data.People);
        animateProgressBar(animalBarElement, data.Animal);

        
    }
}

// Initialize the script
console.log("Content script loaded"); // Check if this logs to the console
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.action === "showImageUrl") {
        console.log("Image URL received:", request.imageUrl);
    }

    const url = request.imageUrl;
    const description = await callGPT(url);
    console.log("description from main:", description);
});

console.log("Content loaded");
init();
