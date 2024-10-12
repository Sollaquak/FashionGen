chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        const domain = new URL(tab.url).hostname;
        getESGRating(domain)
            .then(rating => {
                // Here you can handle the ESG rating (e.g., store it, show a notification, etc.)
                console.log(`ESG Rating for ${domain}: ${rating}`);
            })
            .catch(error => {
                console.error('Error fetching ESG rating:', error);
            });
    }
});

async function getESGRating(domain) {
    const apiUrl = `https://api.msci.com/esg/report/v2.0/reports/`; // Replace with your actual API URL
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.rating; // Adjust based on your API's response structure
}
