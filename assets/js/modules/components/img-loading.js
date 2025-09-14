/**
 * Image loading functionality with automatic lazy loading
 */

export function initImageLoading() {
	console.log("Initializing image loading...");

	// Convert regular images to lazy-loaded images
	convertImagesToLazy();

	// Initialize lazy loading
	setupLazyLoading();
}

function convertImagesToLazy() {
	// Find all images that don't already have lazy loading setup
	// Exclude images in navigation, header, and other critical areas
	const regularImages = document.querySelectorAll("img:not([data-src]):not([data-lazy-processed])");

	regularImages.forEach((img) => {
		// Skip images in navigation, header, or other critical areas
		const isInCriticalArea = img.closest("nav, header, .navbar, .nav, .header, #header, #nav, #navbar");
		if (isInCriticalArea) {
			img.setAttribute("data-lazy-processed", "true");
			return;
		}

		// Skip images that are already loaded or very small (likely icons)
		if (img.complete && img.naturalHeight !== 0) {
			// For already loaded images, just mark as processed
			img.setAttribute("data-lazy-processed", "true");
			return;
		}

		// Convert to lazy loading
		const src = img.src;
		if (src && !src.includes("data:")) {
			// Move src to data-src for lazy loading
			img.setAttribute("data-src", src);
			img.setAttribute("data-lazy-processed", "true");

			// Create a placeholder (low-quality image or solid color)
			img.src =
				"data:image/svg+xml;base64," +
				btoa(`
				<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
					<rect width="100%" height="100%" fill="#f8f9fa"/>
					<text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#6c757d" font-family="Arial, sans-serif" font-size="14">
						Loading...
					</text>
				</svg>
			`);

			// Add loading class for styling
			img.classList.add("lazy-loading");
		}
	});

	console.log(`Converted ${regularImages.length} images to lazy loading`);
}

function setupLazyLoading() {
	const lazyImages = document.querySelectorAll("img[data-src]");

	if ("IntersectionObserver" in window) {
		const imageObserver = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const img = entry.target;
						loadImage(img);
						imageObserver.unobserve(img);
					}
				});
			},
			{
				// Start loading when image is 50px away from viewport
				rootMargin: "50px",
			}
		);

		lazyImages.forEach((img) => imageObserver.observe(img));
	} else {
		// Fallback for browsers without IntersectionObserver
		lazyImages.forEach((img) => loadImage(img));
	}

	console.log(`Lazy loading setup for ${lazyImages.length} images`);
}

function loadImage(img) {
	// Create a new image to preload
	const imageLoader = new Image();

	imageLoader.onload = () => {
		// Image loaded successfully, swap src
		img.src = img.dataset.src;
		img.classList.remove("lazy-loading");
		img.classList.add("lazy-loaded");

		// Add a subtle fade-in effect
		img.style.opacity = "0";
		img.style.transition = "opacity 0.3s ease-in-out";
		setTimeout(() => {
			img.style.opacity = "1";
		}, 10);
	};

	imageLoader.onerror = () => {
		// Handle error - show a broken image placeholder with proper z-index
		img.src =
			"data:image/svg+xml;base64," +
			btoa(`
			<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
				<rect width="100%" height="100%" fill="#f8f9fa" stroke="#dee2e6"/>
				<text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#6c757d" font-family="Arial, sans-serif" font-size="14">
					Image failed to load
				</text>
			</svg>
		`);
		img.classList.remove("lazy-loading");
		img.classList.add("lazy-error");
	};

	// Start loading the image
	imageLoader.src = img.dataset.src;
}

export function refreshLazyImages() {
	// Re-initialize image loading for dynamically added images
	initImageLoading();
}
