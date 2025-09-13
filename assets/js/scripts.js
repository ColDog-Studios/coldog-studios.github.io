/**
 * ColDog Studios Website Entry Point
 */

console.log("Scripts.js loaded!");

// Ensure DOM is ready
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initApp);
} else {
	initApp();
}

async function initApp() {
	console.log("DOM ready, initializing app...");

	// Load commons functionality from same directory
	try {
		await import("./commons.js");
		console.log("ColDog Studios commons loaded successfully");
	} catch (error) {
		console.error("Failed to load commons:", error);
	}

	// Load code blocks functionality if needed
	if (document.querySelector("pre code")) {
		try {
			await import("./code-blocks.js");
			console.log("Code blocks functionality loaded");
		} catch (error) {
			console.error("Failed to load code blocks functionality:", error);
		}
	}
}
