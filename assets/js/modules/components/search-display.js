/**
 * Search functionality with Jekyll search data
 */

let searchData = [];

export function initSearch() {
	console.log("Search initialized - Loading search data...");

	// Load search data from Jekyll-generated search.json
	fetch("/assets/js/data/search.json")
		.then((response) => response.json())
		.then((data) => {
			searchData = data;
			console.log("Search data loaded:", data.length, "items");
		})
		.catch((error) => {
			console.log("Search data not available");
		});

	// Get both mobile and desktop search elements
	const mobileSearchInput = document.getElementById("search-input");
	const mobileSearchResults = document.getElementById("search-results");
	const desktopSearchInput = document.getElementById("search-input-desktop");
	const desktopSearchResults = document.getElementById("search-results-desktop");

	// Utility functions from your old script
	function highlightSearchTerm(text, term) {
		if (!term || !text) return text;
		const regex = new RegExp(`(${term})`, "gi");
		return text.replace(regex, "<mark>$1</mark>");
	}

	function truncateText(text, length) {
		if (!text || text.length <= length) return text;
		return text.substring(0, length) + "...";
	}

	function sanitizeHTML(str) {
		const div = document.createElement("div");
		div.textContent = str;
		return div.innerHTML;
	}

	// Enhanced search functionality based on your old script
	function performSearch(query, resultsContainer, searchType) {
		if (query.length < 2) {
			resultsContainer.innerHTML = "";
			resultsContainer.style.display = "none";
			return;
		}

		// Search through title, content, and excerpt like your old script
		const results = searchData
			.filter((item) => {
				return (
					item.title.toLowerCase().includes(query) ||
					(item.content && item.content.toLowerCase().includes(query)) ||
					(item.excerpt && item.excerpt.toLowerCase().includes(query))
				);
			})
			.slice(0, 8); // Limit to 8 results like your old script

		// Show results container - let CSS handle all styling
		resultsContainer.style.display = "block";

		// Clear any existing inline styles that might override CSS
		resultsContainer.style.position = "";
		resultsContainer.style.left = "";
		resultsContainer.style.right = "";
		resultsContainer.style.width = "";
		resultsContainer.style.zIndex = "";
		resultsContainer.style.boxShadow = "";
		resultsContainer.style.borderRadius = "";
		resultsContainer.style.overflowY = "";
		resultsContainer.style.padding = "";

		// Apply theme classes instead of inline styles
		if (resultsContainer.id === "search-results-desktop") {
			// Desktop: Add dark theme class
			resultsContainer.classList.add("desktop-theme");
			resultsContainer.classList.remove("mobile-theme");

			// Calculate position to center 300px results box relative to search box
			const searchBox = resultsContainer.parentElement;
			const rect = searchBox.getBoundingClientRect();

			// Center the results box relative to the search box
			const resultsWidth = 300;
			const searchBoxCenterX = rect.left + rect.width / 2;
			const leftPosition = searchBoxCenterX - resultsWidth / 2;

			// Set positioning to center relative to search box
			resultsContainer.style.setProperty("top", rect.bottom + window.scrollY + "px", "important");
			resultsContainer.style.setProperty("left", leftPosition + "px", "important");

			console.log("DEBUG: Centered positioning - searchBox center:", searchBoxCenterX, "results left:", leftPosition);
		} else {
			// Mobile: Add light theme class
			resultsContainer.classList.add("mobile-theme");
			resultsContainer.classList.remove("desktop-theme");
		}

		if (results.length === 0) {
			// No results message - styling handled by CSS
			resultsContainer.innerHTML = `
				<div class="search-result-item no-results" style="padding: 10px; text-align: center;">
					No results found for "${sanitizeHTML(query)}"
				</div>`;
		} else {
			resultsContainer.innerHTML = results
				.map((item) => {
					// Use excerpt or truncated content, with highlighting
					const excerpt = highlightSearchTerm(truncateText(item.excerpt || item.content, 120), query);
					const title = highlightSearchTerm(item.title, query);

					return `
						<div class="search-result-item" onclick="window.location.href='${item.url}'">
							<div class="search-result-title">
								${title}
							</div>
							<div class="search-result-excerpt">
								${excerpt}
							</div>
						</div>
					`;
				})
				.join("");
		}
	}

	// Handle search input with focus support like your old script
	function handleSearchInput(searchInput, searchResults) {
		const query = searchInput.value.trim().toLowerCase();
		performSearch(query, searchResults, "Search");
	}

	// Initialize mobile search
	if (mobileSearchInput && mobileSearchResults) {
		mobileSearchInput.addEventListener("input", () => handleSearchInput(mobileSearchInput, mobileSearchResults));
		mobileSearchInput.addEventListener("focus", () => handleSearchInput(mobileSearchInput, mobileSearchResults));
	}

	// Initialize desktop search
	if (desktopSearchInput && desktopSearchResults) {
		desktopSearchInput.addEventListener("input", () => handleSearchInput(desktopSearchInput, desktopSearchResults));
		desktopSearchInput.addEventListener("focus", () => handleSearchInput(desktopSearchInput, desktopSearchResults));
	}

	// Close search results when clicking outside (like your old script)
	document.addEventListener("click", function (e) {
		if (!e.target.closest(".search-box")) {
			if (mobileSearchResults) {
				mobileSearchResults.style.display = "none";
			}
			if (desktopSearchResults) {
				desktopSearchResults.style.display = "none";
			}
		}
	});
}
