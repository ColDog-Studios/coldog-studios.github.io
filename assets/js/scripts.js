/**
 * ColDog Studios Website Entry Point
 * Following Chirpy theme JavaScript structure
 */

// Main commons functionality (equivalent to Chirpy's commons.js)
import("../../_javascript/commons.js")
	.then((module) => {
		console.log("ColDog Studios commons loaded successfully");
	})
	.catch((error) => {
		console.error("Failed to load commons:", error);
	});

// Load code blocks functionality if needed
if (document.querySelector("pre code")) {
	import("../../_javascript/code-blocks.js")
		.then((module) => {
			console.log("Code blocks functionality loaded");
		})
		.catch((error) => {
			console.error("Failed to load code blocks functionality:", error);
		});
}
