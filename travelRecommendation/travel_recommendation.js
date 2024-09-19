// Event listeners for search and reset buttons
document.getElementById('search-btn').addEventListener('click', performSearch);
document.getElementById('reset-btn').addEventListener('click', resetSearch);

// Function to perform the search
function performSearch() {
    const query = document.getElementById('search-bar').value.toLowerCase().trim();
    if (query === '') {
        alert('Please enter a keyword to search!');
        return;
    }

    fetch('travel_recommendation_api.json')  // Replace with the correct path to your JSON file
        .then(response => response.json())
        .then(data => {
            const results = filterResults(data, query);
            displayResults(results);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to filter results based on the search query
function filterResults(data, query) {
    const filteredResults = [];

    data.forEach(country => {
        // Search in country name
        if (country.name.toLowerCase().includes(query)) {
            filteredResults.push(country);
        } else {
            // Search in city names within each country
            const matchingCities = country.cities.filter(city => city.name.toLowerCase().includes(query));

            if (matchingCities.length > 0) {
                filteredResults.push({
                    name: country.name,
                    cities: matchingCities
                });
            }
        }
    });

    return filteredResults;
}

// Function to display the results on the page
function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        resultsDiv.innerHTML = '<p>No matching results found.</p>';
        return;
    }

    results.forEach(country => {
        const countryDiv = document.createElement('div');
        countryDiv.className = 'country';

        const countryName = document.createElement('h2');
        countryName.textContent = country.name;
        countryDiv.appendChild(countryName);

        country.cities.forEach(city => {
            const cityDiv = document.createElement('div');
            cityDiv.className = 'city';

            const cityName = document.createElement('h3');
            cityName.textContent = city.name;
            cityDiv.appendChild(cityName);

            const cityDescription = document.createElement('p');
            cityDescription.textContent = city.description;
            cityDiv.appendChild(cityDescription);

            const cityImage = document.createElement('img');
            cityImage.src = city.imageUrl;
            cityImage.alt = city.name;
            cityDiv.appendChild(cityImage);

            countryDiv.appendChild(cityDiv);
        });

        resultsDiv.appendChild(countryDiv);
    });
}

// Function to reset the search
function resetSearch() {
    document.getElementById('search-bar').value = '';
    document.getElementById('results').innerHTML = ''; // Clear the results
}
