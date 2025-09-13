/**
 * Utility Functions Module
 * Common helper functions for the website
 */

/**
 * Escape HTML to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} - Escaped HTML
 */
export function escapeHtml(text) {
	if (!text) return "";
	const div = document.createElement("div");
	div.textContent = text;
	return div.innerHTML;
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} - Truncated text
 */
export function truncateText(text, length) {
	if (!text || text.length <= length) return text;
	return text.substring(0, length) + "...";
}

/**
 * Sanitize search query for regex use
 * @param {string} query - Search query
 * @returns {string} - Sanitized query
 */
export function sanitizeQuery(query) {
	return query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Set copyright year in footer
 */
export function updateCopyrightYear() {
	const copyrightYear = document.getElementById("copyrightYear");
	if (copyrightYear) {
		copyrightYear.textContent = new Date().getFullYear();
	}
}

/**
 * Handle legacy footer content tags
 */
export function handleLegacyFooterTags() {
	const footerTags = document.querySelectorAll("footer-content");
	footerTags.forEach((tag) => {
		tag.innerHTML = '<p style="text-align: center; padding: 20px; color: #666;">' + "This page uses legacy formatting. Please update to use Jekyll includes." + "</p>";
	});
}
