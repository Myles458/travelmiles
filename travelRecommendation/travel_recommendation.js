document.getElementById('search-btn').addEventListener('click', function() {
    let query = document.getElementById('search-bar').value;
    document.getElementById('results').innerHTML = 'You searched for: ' + query;
});

document.getElementById('reset-btn').addEventListener('click', function() {
    document.getElementById('search-bar').value = '';
    document.getElementById('results').innerHTML = '';
});
