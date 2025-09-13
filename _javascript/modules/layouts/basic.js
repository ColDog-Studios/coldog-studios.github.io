/**
 * Basic Layout Functions
 * Common functionality for all pages
 */

export function basic() {
	// Set copyright year in footer (if element exists)
	const copyrightYear = document.getElementById("copyrightYear");
	if (copyrightYear) {
		copyrightYear.textContent = new Date().getFullYear();
	}

	// Handle legacy footer content tags
	handleLegacyFooterTags();
}

function handleLegacyFooterTags() {
	const footerTags = document.querySelectorAll("footer-content");
	footerTags.forEach((tag) => {
		tag.innerHTML = '<p style="text-align: center; padding: 20px; color: #666;">' + "This page uses legacy formatting. Please update to use Jekyll includes." + "</p>";
	});
}
