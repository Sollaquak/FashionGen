// main.js
async function loadData() {
    try {
        const response = await fetch('./website-data.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();

        // Access the data
        const fashionData = jsonData.data;

        // Return the fashion data
        return fashionData;
        
    } catch (error) {
        console.error('Error fetching JSON:', error);
        return null; // Return null or handle the error as needed
    }
}

const data = await loadData();

console.log("Nike");
console.log(data["nike.com"].People);