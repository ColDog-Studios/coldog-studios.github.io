/**
 * Navigation functionality
 */

export function initNavigation() {
	console.log("Initializing navigation...");

	// Mobile menu toggle - Updated for button swapping approach
	const navOpenBtn = document.querySelector(".navOpenBtn");
	const navCloseBtn = document.querySelector(".navCloseBtn");
	const nav = document.querySelector(".nav");
	const navLinks = document.querySelector(".nav-links");

	// Toggle mobile menu (both open and close functionality)
	function toggleMobileMenu() {
		if (nav.classList.contains("openNav")) {
			nav.classList.remove("openNav");
			console.log("Closing mobile menu");
		} else {
			nav.classList.add("openNav");
			console.log("Opening mobile menu");
		}
	}

	// Handle hamburger button click (opens menu)
	if (navOpenBtn && nav) {
		navOpenBtn.addEventListener("click", function (event) {
			event.stopPropagation(); // Prevent event bubbling
			toggleMobileMenu();
		});
	}

	// Handle close button click (closes menu)
	if (navCloseBtn && nav) {
		navCloseBtn.addEventListener("click", function (event) {
			event.stopPropagation(); // Prevent event bubbling
			toggleMobileMenu();
		});
	}

	// Close mobile menu when clicking on navigation links
	if (navLinks) {
		const navLinkItems = navLinks.querySelectorAll("a");
		navLinkItems.forEach((link) => {
			link.addEventListener("click", () => {
				nav?.classList.remove("openNav");
				console.log("Mobile menu closed via navigation link");
			});
		});
	}

	// Close mobile menu when clicking outside of it
	document.addEventListener("click", function (event) {
		if (nav && nav.classList.contains("openNav")) {
			// Check if click is outside navigation
			if (!nav.contains(event.target)) {
				nav.classList.remove("openNav");
				console.log("Mobile menu closed via outside click");
			}
		}
	});

	console.log("Navigation initialized");
}
