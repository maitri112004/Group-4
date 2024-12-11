const apiKey = 'Ie0T7h4XIPy0chTbibbJm3plz73qkLA1POe83gmRYK8'; // Unsplash Access Key
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsDiv = document.getElementById('results');

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchImages(query);
  } else {
    alert('Please enter a search term.');
  }
});

async function fetchImages(query) {
  const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}`;
  try {
    console.log('Fetching images for query:', query); // Debugging output
    const response = await fetch(url);
    console.log('API response status:', response.status); // Debugging output
    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Fetched data:', data); // Debugging output
    displayImages(data.results);
  } catch (error) {
    console.error('Error fetching images:', error);
    resultsDiv.innerHTML = '<p>Failed to load images. Please try again later.</p>';
  }
}

function displayImages(images) {
  resultsDiv.innerHTML = '';
  if (images.length === 0) {
    resultsDiv.innerHTML = '<p>No images found. Try another search!</p>';
    return;
  }
  images.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image.urls.small;
    imgElement.alt = image.alt_description || 'Image';
    resultsDiv.appendChild(imgElement);
  });
}
