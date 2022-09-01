import { renderDashboard } from "./view-dashboard.js";
import { renderDetail } from "./view-detail.js";

if (window.location.search.includes("?country=")) {
	document.querySelector(".filters").classList.add("hidden");
	renderDetail();
} else {
	renderDashboard();
}
