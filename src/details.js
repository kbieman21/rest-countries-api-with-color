const detailCardTemplate = document.getElementById("detail-card-template");
const detailCountriesDiv = document.getElementById("detail-countries");
const detailBorderCountries = document.getElementById(
  "detail-border-countries"
);

const borderCountries = [];
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

    cardTemplateClone.querySelector("img").src =
      country.flags.svg || country.flags.png;
    cardTemplateClone.querySelector("img").alt = `${country.name.common} flag`;
    cardTemplateClone.querySelector("h2").textContent = country.name.common;
    cardTemplateClone.querySelector(
      "#detail-native-name"
    ).innerHTML = `<strong>Native Name:</strong> ${
      Object.values(country.name.nativeName)[0].common
    }`;
    cardTemplateClone.querySelector(
      "#detail-population"
    ).innerHTML = `<strong>Population: </strong>${country.population.toLocaleString()}`;
    cardTemplateClone.querySelector(
      "#detail-region"
    ).innerHTML = `<strong>Region: </strong>${country.region}`;
    cardTemplateClone.querySelector(
      "#detail-capital"
    ).innerHTML = `<strong>Capital:</strong> ${country.capital?.[0] || "N/A"}`;
    cardTemplateClone.querySelector(
      "#detail-domain"
    ).innerHTML = `<strong>Top Level Domain:</strong> ${country.tld}`;
    // cardTemplateClone.querySelector(
    //   "#detail-currencies"
    // ).innerHTML = `<strong>Currencies: </strong>${country.currencies?.[0] || "N/A"}`;
    const currenciesObject = Object.values(country.currencies)[0];
    if (currenciesObject && currenciesObject.name) {
      cardTemplateClone.querySelector(
        "#detail-currencies"
      ).innerHTML = `<strong>Currencies:</strong> ${currenciesObject.name}`;
    }
    // cardTemplateClone.querySelector(
    //   "#detail-languages"
    // ).innerHTML = `<strong>Languages: </strong>${country.languges}`;
    const languages = Object.values(country.languages);
    const languagesReadable = languages.join(", ");
    cardTemplateClone.querySelector(
      "#detail-languages"
    ).innerHTML = `<strong>Languages: </strong> ${languagesReadable}`;
    cardTemplateClone.querySelector(
      "#detail-subregion"
    ).innerHTML = `<strong>Sub Region:</strong> ${country.subregion}`;

    const borderCountries = cardTemplateClone.querySelector(
      "#detail-border-countries"
    );
    borderCountries.innerHTML = "";

    if (country.borders && country.borders.length > 0) {
      try {
        // Fetch all border countries in one go (optimized!)
        const codes = country.borders.join(",");
        const bordersResponse = await fetch(
          `https://restcountries.com/v3.1/alpha?codes=${codes}`
        );
        const bordersData = await bordersResponse.json();

        bordersData.forEach((neighbor) => {
          const borderLink = document.createElement("a");
          borderLink.href = `details.html?name=${neighbor.name.common}`;
          borderLink.textContent = neighbor.name.common;
          borderLink.className = `
            inline-block
            bg-white dark:bg-gray-800
            text-gray-700 dark:text-gray-100
            px-4 py-1.5
            rounded-md
            shadow
            hover:bg-gray-200 dark:hover:bg-gray-700
            transition
            text-sm
            whitespace-nowrap
          `;
          borderCountries.appendChild(borderLink);
        });
      } catch (err) {
        console.error("Error fetching border countries:", err);
        borderCountries.textContent = "Error loading border countries";
      }
    } else {
      borderCountries.textContent = "No border countries";
    }

    detailCountriesDiv.appendChild(cardTemplateClone);
  } catch (error) {
    console.error("Fetch error:", error);
  }
});
