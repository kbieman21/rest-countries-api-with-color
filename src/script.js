const countriesDiv = document.getElementById("countries");
const cardTemplate = document.getElementById('card-template')

document.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital",
  );

  if (!res.ok) {
    throw new Error("Error fetching data");
  }

  const data = await res.json();
  console.log(data);

  data.forEach(country => {
    const  cardTemplateClone = cardTemplate.cloneNode(true);
    // console.log(cardTemplate);
    cardTemplateClone.style.display = 'block'

    // Selecting html elements
    const img = cardTemplateClone.querySelector('img');
    
    const name = cardTemplateClone.querySelector('.country-name');
    const population = cardTemplateClone.querySelector('.population');
    const region = cardTemplateClone.querySelector('.region');
    const capital = cardTemplateClone.querySelector('.capital');
    const clickable = cardTemplateClone.querySelector('.card-clicable');

    // fill in the data
    img.src = country.flags.png;
    name.textContent = country.name.common;
    population.textContent = `Population: ${country.population.toLocaleString()}`;
    region.textContent = `Region: ${country.region}`;
    capital.textContent = `Capital: ${country.capital ? country.capital[0] : 'N/A'}`;

    //cardTemplate.firstElementChild.src = country.flags.png;
    //cardTemplate.firstElementChild.nextElementSibling.textContent = country.name.
    // cardTemplate.firstElementChild.nextElementSibling.textContent = country.p 
    countriesDiv.appendChild(cardTemplateClone)

    clickable.href = `./src/pages/details.html`;
    
  })
});