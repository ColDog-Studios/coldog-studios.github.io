/**
 * Search Display Component
 * Handles site search functionality with security measures
 */

import { escapeHtml, truncateText, sanitizeQuery } from "../utils.js";

let searchData = [];
let searchInput, searchResults;

export async function initSearch() {
	await loadSearchData();
	bindSearchElements();
	bindSearchEvents();
}

async function loadSearchData() {
	try {
		const response = await fetch("/assets/js/data/search.json");
		searchData = await response.json();
	} catch (error) {
		console.log("Search data not available");
	}
}

function bindSearchElements() {
	searchInput = document.getElementById("search-input");
	searchResults = document.getElementById("search-results");
}

function bindSearchEvents() {
	if (searchInput && searchResults) {
		searchInput.addEventListener("input", handleSearch);
		searchInput.addEventListener("focus", handleSearch);

		// Close search results when clicking outside
		document.addEventListener("click", (e) => {
			if (!e.target.closest(".search-box")) {
				searchResults.classList.remove("show");
			}
		});
	}
}

function handleSearch() {
	const query = searchInput.value.trim().toLowerCase();

	// Basic input validation and sanitization
	if (query.length < 2 || query.length > 100) {
		searchResults.classList.remove("show");
		return;
	}

	// Remove potentially dangerous characters for regex
	const sanitizedQuery = sanitizeQuery(query);

	const results = searchData
		.filter((item) => {
			return (
				item.title.toLowerCase().includes(sanitizedQuery) ||
				item.content.toLowerCase().includes(sanitizedQuery) ||
				(item.excerpt && item.excerpt.toLowerCase().includes(sanitizedQuery))
			);
		})
		.slice(0, 8); // Limit to 8 results

	displaySearchResults(results, sanitizedQuery);
}

function displaySearchResults(results, query) {
	if (results.length === 0) {
		searchResults.innerHTML = '<div class="search-result-item">' + '<div class="search-result-title">No results found</div>' + "</div>";
	} else {
		searchResults.innerHTML = results
			.map((item) => {
				const excerpt = highlightSearchTerm(truncateText(item.excerpt || item.content, 120), query);
				const title = highlightSearchTerm(item.title, query);
				// Escape the URL to prevent XSS in onclick
				const safeUrl = escapeHtml(item.url);

				return `
                <div class="search-result-item" onclick="window.location.href='${safeUrl}'">
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
	if (!term || !text) return escapeHtml(text);

	// Escape the text first to prevent XSS
	const escapedText = escapeHtml(text);
	const escapedTerm = escapeHtml(term);

	// Use a safer regex approach
	const regex = new RegExp(`(${escapedTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
	return escapedText.replace(regex, "<mark>$1</mark>");
}
