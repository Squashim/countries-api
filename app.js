import { renderCountriesList } from "./dom-utils.js";

const API_URL_ALL = "https://restcountries.com/v3.1/all";
let countries;
let region = "";
let query = "";

fetch(API_URL_ALL)
	.then((res) => res.json())
	.then((countriesRaw) => {
		countries = countriesRaw.map((country) => {
			return {
				capital: country.capital && country.capital[0],
				population: country.population,
				name: country.name.common,
				region: country.region,
				flagUrl: country.flags.png,
			};
		});
		renderCountriesList(countries);
	});

document.querySelector("#query").addEventListener("input", (e) => {
	query = e.target.value.toLowerCase().trim();
	filterDataAndRenderCountriesList();
});

document.querySelectorAll(".select-items div").forEach((option) => {
	option.addEventListener("click", (e) => {
		region = e.target.innerText;
		filterDataAndRenderCountriesList();
	});
});

const filterDataAndRenderCountriesList = () => {
	const filteredCountries = countries.filter((country) => {
		return (
			country.name.toLowerCase().includes(query) &&
			(!region || country.region === region)
		);
	});

	renderCountriesList(filteredCountries);
};
