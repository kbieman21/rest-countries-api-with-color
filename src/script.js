const countriesDiv = document.getElementById("countries");
const cardTemplate = document.getElementById('card-template')

const searchInput = document.getElementById("search-id");
const regionSelect = document.getElementById("region-select");

let allCountries = [];

// Function to render countries
function renderCountries(countries) {
  countriesDiv.innerHTML = ""; // clear previous
   if (countries.length === 0) {
    countriesDiv.innerHTML = "<p>No countries found.</p>";
    return;
  }
  countries.forEach((country) => {
     //clone the card template
    const cardTemplateClone = cardTemplate.content.cloneNode(true);
    //add the page path to the href
    cardTemplateClone.querySelector("a").href = './src/pages/details.html?name=' + country.name.common;
     //add the source and alt text to the image
    cardTemplateClone.querySelector("img").src = country.flags.png;
    cardTemplateClone.querySelector("img").alt = country.name.common;
    //add country name to the h2
    cardTemplateClone.querySelector("h2").textContent = country.name.common;
    cardTemplateClone.querySelector(".population").innerHTML = `<strong>Population:</strong> ${country.population.toLocaleString()}`;
    cardTemplateClone.querySelector(".region").innerHTML = `<strong>Region:</strong> ${country.region}`;
    cardTemplateClone.querySelector(".capital").innerHTML = `<strong>Capital:</strong> ${country.capital?.[0] || "N/A"}`;
    countriesDiv.appendChild(cardTemplateClone);
  });
}

// Function to filter countries based on search and region
function filterCountries() {
  const searchText = searchInput.value.toLowerCase();
  const selectedRegion = regionSelect.value;

  const filtered = allCountries.filter((country) => {
    const matchesSearch = country.name.common.toLowerCase().includes(searchText);
    const matchesRegion = selectedRegion === "" || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  renderCountries(filtered);
}

document.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital",
  );

  if (!res.ok) {
    throw new Error("Error fetching data");
  }

  const data = await res.json();
   allCountries = data;
   renderCountries(allCountries);
  console.log(allCountries[0]);


});

// Event listeners for search and filter
searchInput.addEventListener("input", filterCountries);
regionSelect.addEventListener("change", filterCountries);

