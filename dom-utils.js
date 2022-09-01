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
	detailNameElement.innerText = country.name;

	detailContainerElement.classList.add("detail-container");
	detailContentElement.classList.add("detail-content");

	detailContainerElement.appendChild(flagImgElement);
	detailContentElement.appendChild(detailNameElement);

	detailContentElement.appendChild(
		createInfoElement("Native name", country.nativeName)
	);
	detailContentElement.appendChild(
		createInfoElement("Population", numberSeparator(country.population))
	);
	detailContentElement.appendChild(createInfoElement("Region", country.region));
	detailContentElement.appendChild(
		createInfoElement("Sub Region", country.subRegion)
	);
	detailContentElement.appendChild(
		createInfoElement("Capital", country.capital)
	);
	detailContentElement.appendChild(
		createInfoElement("Top Level Domain", country.tld)
	);
	detailContentElement.appendChild(
		createInfoElement("Currencies", country.currencies)
	);
	detailContentElement.appendChild(
		createInfoElement("Languages", country.languages)
	);

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
	labelElement.innerText = "Border Countries";

	borderCountriesContainerElement.appendChild(labelElement);

	country.borderCountries.forEach((border) => {
		borderCountriesContainerElement.appendChild(
			createRouteButton(border, "border-country-btn", `/?country=${border}`)
		);
	});

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
