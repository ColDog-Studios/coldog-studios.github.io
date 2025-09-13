/**
 * Navigation Component
 * Handles mobile navigation menu functionality
 */

export function initNavigation() {
	const nav = document.querySelector(".nav");
	const navOpenBtn = document.querySelector(".navOpenBtn");
	const navCloseBtn = document.querySelector(".navCloseBtn");

	if (!nav) return;

	if (navOpenBtn) {
		navOpenBtn.addEventListener("click", () => {
			openNav(nav);
		});
	}

	if (navCloseBtn) {
		navCloseBtn.addEventListener("click", () => {
			closeNav(nav);
		});
	}
}

function openNav(nav) {
	nav.classList.add("openNav");
	nav.classList.remove("openSearch");
}

function closeNav(nav) {
	nav.classList.remove("openNav");
}
