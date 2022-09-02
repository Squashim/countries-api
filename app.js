import { renderDashboard } from "./view-dashboard.js";
import { renderDetail } from "./view-detail.js";

const themeBtn = document.querySelector(".theme-btn");
const sun = document.querySelector("#sun");
const moon = document.querySelector("#moon");

let theme = localStorage.getItem("theme");

themeBtn.addEventListener("click", () => {
	if (theme === "dark") {
		document.querySelector("body").classList.remove("dark");
		document.querySelector("body").classList.add("light");
		theme = "light";

		themeBtn.textContent = "Dark Mode";
		sun.classList.add("hidden");
		moon.classList.remove("hidden");
	} else {
		document.querySelector("body").classList.remove("light");
		document.querySelector("body").classList.add("dark");
		theme = "dark";
		themeBtn.textContent = "Light Mode";
		sun.classList.remove("hidden");
		moon.classList.add("hidden");
	}

	localStorage.setItem("theme", theme);
});

if (theme === "dark") {
	document.querySelector("body").classList.add("dark");
	themeBtn.textContent = "Light Mode";
	sun.classList.remove("hidden");
	moon.classList.add("hidden");
}

if (theme === "light") {
	document.querySelector("body").classList.add("light");
	themeBtn.textContent = "Dark Mode";
	sun.classList.add("hidden");
	moon.classList.remove("hidden");
}
if (window.location.search.includes("?country=")) {
	document.querySelector(".filters").classList.add("hidden");
	renderDetail();
} else {
	renderDashboard();
}
