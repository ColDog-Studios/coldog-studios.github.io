/**
 * Back to Top Button
 */

(function () {
	"use strict";

	let backToTopBtn;
	const SCROLL_THRESHOLD = 200;

	function createBackToTopButton() {
		// Remove any existing buttons first
		const existing = document.querySelectorAll("#back-to-top, .btn-back-to-top");
		existing.forEach((btn) => btn.remove());

		// Create the button
		backToTopBtn = document.createElement("button");
		backToTopBtn.id = "back-to-top";
		backToTopBtn.className = "btn-back-to-top";
		backToTopBtn.innerHTML = "↑";
		backToTopBtn.title = "Back to Top";
		backToTopBtn.setAttribute("aria-label", "Back to Top");

		// Apply styles
		backToTopBtn.style.cssText = `
			position: fixed !important;
			bottom: 20px !important;
			right: 20px !important;
			width: 40px !important;
			height: 40px !important;
			background-color: #002e44 !important;
			color: #fafafa !important;
			border: none !important;
			border-radius: 6px !important;
			cursor: pointer !important;
			z-index: 1000 !important;
			opacity: 0 !important;
			visibility: hidden !important;
			transform: translateY(10px) !important;
			transition: all 0.3s ease-in-out !important;
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
			display: flex !important;
			align-items: center !important;
			justify-content: center !important;
			font-size: 20px !important;
			font-weight: normal !important;
			line-height: 1 !important;
		`;

		// Add click handler
		backToTopBtn.addEventListener("click", function () {
			window.scrollTo({ top: 0, behavior: "smooth" });
		});

		// Add hover effects
		backToTopBtn.addEventListener("mouseenter", function () {
			this.style.backgroundColor = "#0096dc !important";
			this.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2) !important";
		});

		backToTopBtn.addEventListener("mouseleave", function () {
			this.style.backgroundColor = "#002e44 !important";
			this.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.15) !important";
		});

		// Add to document
		document.body.appendChild(backToTopBtn);
	}

	function updateButtonVisibility() {
		if (!backToTopBtn) return;

		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		if (scrollTop > SCROLL_THRESHOLD) {
			backToTopBtn.style.opacity = "1 !important";
			backToTopBtn.style.visibility = "visible !important";
			backToTopBtn.style.transform = "translateY(0) !important";
		} else {
			backToTopBtn.style.opacity = "0 !important";
			backToTopBtn.style.visibility = "hidden !important";
			backToTopBtn.style.transform = "translateY(10px) !important";
		}
	}

	function init() {
		createBackToTopButton();

		// Add scroll listener with throttling
		let ticking = false;
		function handleScroll() {
			if (!ticking) {
				requestAnimationFrame(() => {
					updateButtonVisibility();
					ticking = false;
				});
				ticking = true;
			}
		}

		window.addEventListener("scroll", handleScroll, { passive: true });

		// Initial visibility check
		updateButtonVisibility();
	}

	// Initialize when DOM is ready
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init);
	} else {
		init();
	}
})();
