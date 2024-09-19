// Function to fetch data from the JSON file and filter based on keywords
function fetchAndSearch() {
    // Get the search input from the user
    const searchKeyword = document.getElementById('search-bar').value.toLowerCase();

    // Fetch data from the JSON file
    fetch('travel_recommendation_api.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Combine all the data from countries, temples, and beaches into one array
            let allResults = [];

            // Filter based on countries
            data.countries.forEach(country => {
                if (country.name.toLowerCase().includes(searchKeyword)) {
                    allResults.push(country);
                }
                // Search within cities of the country
                country.cities.forEach(city => {
                    if (city.name.toLowerCase().includes(searchKeyword)) {
                        allResults.push(city);
                    }
                });
            });

            // Filter based on temples
            data.temples.forEach(temple => {
                if (temple.name.toLowerCase().includes(searchKeyword)) {
                    allResults.push(temple);
                }
            });

            // Filter based on beaches
            data.beaches.forEach(beach => {
                if (beach.name.toLowerCase().includes(searchKeyword)) {
                    allResults.push(beach);
                }
            });

            // Display results in the modal
            displayResults(allResults);
        })
        .catch(error => {
            console.error("Error fetching the data:", error);
        });
}

// Function to display the filtered results in the modal
function displayResults(results) {
    const resultsContainer = document.getElementById('modal-results');
    resultsContainer.innerHTML = '';  // Clear previous results

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No matching results found.</p>';
        return;
    }

    results.forEach(result => {
        // Display the place name, description, and image if available
        const resultItem = `
            <div class="result-item">
                <h3>${result.name}</h3>
                <img src="${result.imageUrl}" alt="${result.name}" />
                <p>${result.description}</p>
            </div>
        `;
        resultsContainer.innerHTML += resultItem;
    });

    // Show the modal
    document.getElementById('result-modal').style.display = 'flex';
}

// Attach event listener to the search button
document.getElementById('search-btn').addEventListener('click', fetchAndSearch);

// Optional: Add reset functionality
document.getElementById('reset-btn').addEventListener('click', () => {
    document.getElementById('search-bar').value = '';  // Clear search input
    document.getElementById('modal-results').innerHTML = '';  // Clear results
    document.getElementById('result-modal').style.display = 'none';  // Hide modal
});

// Close the modal when the close button is clicked
document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('result-modal').style.display = 'none';
});

// Close the modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
    if (event.target == document.getElementById('result-modal')) {
        document.getElementById('result-modal').style.display = 'none';
    }
});
