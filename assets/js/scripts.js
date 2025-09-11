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

// ----- Legacy Support for old pages ----- //
// This handles any remaining pages that might use <footer-content> tags
document.addEventListener("DOMContentLoaded", function () {
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
