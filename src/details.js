const detailCardTemplate = document.getElementById("detail-card-template");
const detailCountriesDiv = document.getElementById("detail-countries");

document.addEventListener("DOMContentLoaded", async () => {
  //To extract name from the URL, if the country name has spaces or special characters
  const name = decodeURIComponent(document.URL.split("name=")[1]);
  console.log("Country name:", name);

  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${name}?fullText=true`
    );
    if (!res.ok) throw new Error("Error fetching data");

    const data = await res.json();
    console.log(data);
    
    //Eventhough I am getting one country the API wraps that one country inside an array, SO I USED data[0]
    const country = data[0];
    console.log("Country data:", country);

    const cardTemplateClone = detailCardTemplate.content.cloneNode(true);

    cardTemplateClone.querySelector("img").src = country.flags.svg || country.flags.png;
    cardTemplateClone.querySelector("img").alt = `${country.name.common} flag`;
    cardTemplateClone.querySelector("h2").textContent = country.name.common;
    cardTemplateClone.querySelector("#detail-native-name").textContent = Object.values(country.name.nativeName)[0].common;
    cardTemplateClone.querySelector('#detail-domain').textContent = `Domain: ${country.tld}`
    cardTemplateClone.querySelector("#detail-population").textContent = `Population: ${country.population.toLocaleString()}`;
    cardTemplateClone.querySelector("#detail-region").textContent = `Region: ${country.region}`;
    cardTemplateClone.querySelector("#detail-capital").textContent = `Capital: ${country.capital?.[0] || "N/A"}`;
    cardTemplateClone.querySelector('#detail-currencies').textContent = `Currency: ${country.currencies?.[0] || "N/A"}`;
    //cardTemplateClone.querySelector('#detail-language').textContent = `Language: ${country.languges}`;
    cardTemplateClone.querySelector('#detail-subregion').textContent = `Sub Region: ${country.subregion}`;
    cardTemplateClone.querySelector('#border-countries').textContent = ` ${country.borders}`;
    detailCountriesDiv.appendChild(cardTemplateClone);
  } catch (error) {
    console.error("Fetch error:", error);
  }
});
