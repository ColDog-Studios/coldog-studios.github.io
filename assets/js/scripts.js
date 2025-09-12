//////////////////////
//  MAIN WEBSITE JS //
//////////////////////

// ----- Navigation Menu ----- //
const nav = document.querySelector(".nav"),
	navOpenBtn = document.querySelector(".navOpenBtn"),
	navCloseBtn = document.querySelector(".navCloseBtn");

if (navOpenBtn) {
	navOpenBtn.addEventListener("click", () => {
		nav.classList.add("openNav");
		nav.classList.remove("openSearch");
	});
}

if (navCloseBtn) {
	navCloseBtn.addEventListener("click", () => {
		nav.classList.remove("openNav");
	});
}

// ----- Search Functionality ----- //
let searchData = [];
let searchInput, searchResults;

// Load search data
fetch("/search.json")
	.then((response) => response.json())
	.then((data) => {
		searchData = data;
	})
	.catch((error) => console.log("Search data not available"));

// ----- Legacy Support for old pages ----- //
// This handles any remaining pages that might use <footer-content> tags
document.addEventListener("DOMContentLoaded", function () {
	searchInput = document.getElementById("search-input");
	searchResults = document.getElementById("search-results");

	if (searchInput && searchResults) {
		searchInput.addEventListener("input", handleSearch);
		searchInput.addEventListener("focus", handleSearch);

		// Close search results when clicking outside
		document.addEventListener("click", function (e) {
			if (!e.target.closest(".search-box")) {
				searchResults.classList.remove("show");
			}
		});
	}

	// Check for legacy footer tags and replace with message
	const footerTags = document.querySelectorAll("footer-content");
	footerTags.forEach((tag) => {
		tag.innerHTML =
			'<p style="text-align: center; padding: 20px; color: #666;">This page uses legacy formatting. Please update to use Jekyll includes.</p>';
	});

	// Set copyright year in footer (if element exists)
	const copyrightYear = document.getElementById("copyrightYear");
	if (copyrightYear) {
		copyrightYear.textContent = new Date().getFullYear();
	}
});

function handleSearch() {
	const query = searchInput.value.trim().toLowerCase();

	if (query.length < 2) {
		searchResults.classList.remove("show");
		return;
	}

	const results = searchData
		.filter((item) => {
			return (
				item.title.toLowerCase().includes(query) ||
				item.content.toLowerCase().includes(query) ||
				(item.excerpt && item.excerpt.toLowerCase().includes(query))
			);
		})
		.slice(0, 8); // Limit to 8 results

	displaySearchResults(results, query);
}

function displaySearchResults(results, query) {
	if (results.length === 0) {
		searchResults.innerHTML = '<div class="search-result-item"><div class="search-result-title">No results found</div></div>';
	} else {
		searchResults.innerHTML = results
			.map((item) => {
				const excerpt = highlightSearchTerm(truncateText(item.excerpt || item.content, 120), query);
				const title = highlightSearchTerm(item.title, query);

				return `
				<div class="search-result-item" onclick="window.location.href='${item.url}'">
					<div class="search-result-title">${title}</div>
					<div class="search-result-excerpt">${excerpt}</div>
				</div>
			`;
			})
			.join("");
	}

	searchResults.classList.add("show");
}

function highlightSearchTerm(text, term) {
	if (!term || !text) return text;
	const regex = new RegExp(`(${term})`, "gi");
	return text.replace(regex, "<mark>$1</mark>");
}

function truncateText(text, length) {
	if (!text || text.length <= length) return text;
	return text.substring(0, length) + "...";
}
