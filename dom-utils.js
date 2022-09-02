const createInfoElement = (labelName, value) => {
	const infoElement = document.createElement("div");

	const labelElement = document.createElement("strong");
	labelElement.innerText = `${labelName}: `;
	const valueElement = document.createElement("span");
	valueElement.innerText = value;

	infoElement.appendChild(labelElement);
	infoElement.appendChild(valueElement);

	return infoElement;
};
const createFlagImgElement = (country) => {
	const imgContainerElement = document.createElement("div");
	const imgElement = document.createElement("img");
	imgElement.src = country.flagUrl;
	imgElement.alt = `${country.name} flag`;

	imgContainerElement.appendChild(imgElement);

	return imgContainerElement;
};

const numberSeparator = (val) =>
	val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const createCountryItemElement = (country) => {
	const anchorElement = document.createElement("a");
	anchorElement.href = `?country=${country.code}`;

	const countryElement = document.createElement("li");
	anchorElement.appendChild(createFlagImgElement(country));

	const infoContainerElement = document.createElement("div");
	infoContainerElement.classList.add("info-container");

	const countryNameElement = document.createElement("strong");
	countryNameElement.classList.add("country-name");
	countryNameElement.innerText = country.name;

	infoContainerElement.appendChild(countryNameElement);
	infoContainerElement.append(
		createInfoElement("Population", numberSeparator(country.population))
	);
	infoContainerElement.append(createInfoElement("Region", country.region));
	infoContainerElement.append(createInfoElement("Capital", country.capital));

	anchorElement.appendChild(infoContainerElement);
	countryElement.appendChild(anchorElement);

	return countryElement;
};

const createListElement = (countries) => {
	const listElement = document.createElement("ul");
	countries.forEach((country) => {
		listElement.appendChild(createCountryItemElement(country));
	});
	return listElement;
};

const createDetailElement = (country) => {
	const detailContainerElement = document.createElement("div");
	const flagImgElement = createFlagImgElement(country);
	const detailContentElement = document.createElement("div");
	const detailNameElement = document.createElement("strong");
	detailNameElement.classList.add("country-detail-name");
	detailNameElement.innerText = country.name;

	detailContainerElement.classList.add("detail-container");
	detailContentElement.classList.add("detail-content");

	detailContainerElement.appendChild(flagImgElement);
	detailContentElement.appendChild(detailNameElement);

	const firstDiv = document.createElement("div");
	firstDiv.classList.add("first-div");
	const secondDiv = document.createElement("div");
	secondDiv.classList.add("second-div");

	const row = document.createElement("div");
	row.classList.add("row");

	firstDiv.appendChild(createInfoElement("Native name", country.nativeName));
	firstDiv.appendChild(
		createInfoElement("Population", numberSeparator(country.population))
	);
	firstDiv.appendChild(createInfoElement("Region", country.region));
	firstDiv.appendChild(createInfoElement("Sub Region", country.subRegion));
	firstDiv.appendChild(createInfoElement("Capital", country.capital));

	row.appendChild(firstDiv);

	secondDiv.appendChild(createInfoElement("Top Level Domain", country.tld));
	secondDiv.appendChild(createInfoElement("Currencies", country.currencies));
	secondDiv.appendChild(createInfoElement("Languages", country.languages));

	row.appendChild(secondDiv);
	detailContentElement.appendChild(row);

	if (country.borderCountries && country.borderCountries.length > 0) {
		detailContentElement.appendChild(createBorderCountriesContainer(country));
	}

	detailContainerElement.appendChild(detailContentElement);

	return detailContainerElement;
};

const createRouteButton = (text, style, link) => {
	const anchorElement = document.createElement("a");
	anchorElement.innerText = text;
	anchorElement.classList.add(style);
	anchorElement.href = link;

	return anchorElement;
};

const createBorderCountriesContainer = (country) => {
	const borderCountriesContainerElement = document.createElement("div");

	const labelElement = document.createElement("strong");
	labelElement.classList.add("border-countries");
	labelElement.innerText = "Border Countries: ";

	const buttonsContainerElement = document.createElement("div");
	buttonsContainerElement.classList.add("border-buttons-container");

	borderCountriesContainerElement.appendChild(labelElement);
	const codesString = country.borderCountries.toString().toLowerCase();

	const API_URL_BORDER_NAMES = `https://restcountries.com/v3.1/alpha/?codes=${codesString}`;
	let borderNames;

	const renderTranslatedBorderCountries = (arr) => {
		arr.forEach((border) => {
			buttonsContainerElement.appendChild(
				createRouteButton(
					border.name,
					"border-country-btn",
					`/?country=${border.code}`
				)
			);
		});
	};

	fetch(API_URL_BORDER_NAMES)
		.then((res) => res.json())
		.then((borderCountries) => {
			borderNames = borderCountries.map((borderCntr) => {
				return {
					name: borderCntr.name.common,
					code: borderCntr.cca3,
				};
			});
			renderTranslatedBorderCountries(borderNames);
		});

	borderCountriesContainerElement.appendChild(buttonsContainerElement);

	return borderCountriesContainerElement;
};

export const renderCountriesList = (countries) => {
	const rootElement = document.querySelector("#root");
	rootElement.innerHTML = "";
	rootElement.appendChild(createListElement(countries));
	//render country intro main
};

export const renderCountryDetails = (country) => {
	const rootElement = document.querySelector("#root");
	rootElement.innerHTML = "";
	rootElement.appendChild(createRouteButton("Back", "back-btn", "/"));
	rootElement.appendChild(createDetailElement(country));
};
