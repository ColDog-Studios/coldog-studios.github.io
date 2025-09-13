/**
 * Navigation functionality
 */

export function initNavigation() {
	console.log("Initializing navigation...");

	// Mobile menu toggle
	const navToggle = document.querySelector(".navbar-toggle");
	const navMenu = document.querySelector(".navbar-nav");

	if (navToggle && navMenu) {
		navToggle.addEventListener("click", function () {
			navMenu.classList.toggle("active");
			this.classList.toggle("active");
		});
	}

	// Close mobile menu when clicking on links
	const navLinks = document.querySelectorAll(".navbar-nav a");
	navLinks.forEach((link) => {
		link.addEventListener("click", () => {
			navMenu?.classList.remove("active");
			navToggle?.classList.remove("active");
		});
	});

	console.log("Navigation initialized");
}
