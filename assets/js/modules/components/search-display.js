/**
 * Search functionality with XSS protection
 */

export function initSearch() {
	console.log("Initializing search...");

	const searchInput = document.getElementById("search-input");
	const searchResults = document.getElementById("search-results");

	if (!searchInput || !searchResults) {
		console.log("Search elements not found");
		return;
	}

	// Sanitize HTML to prevent XSS
	function sanitizeHTML(str) {
		const div = document.createElement("div");
		div.textContent = str;
		return div.innerHTML;
	}

	// Simple search functionality
	searchInput.addEventListener("input", function () {
		const query = this.value.trim().toLowerCase();

		if (query.length < 2) {
			searchResults.innerHTML = "";
			return;
		}

		// This would typically fetch from a search index
		// For now, just show a placeholder
		searchResults.innerHTML = `<div class="search-result">Searching for: ${sanitizeHTML(query)}</div>`;
	});

	console.log("Search initialized");
}
