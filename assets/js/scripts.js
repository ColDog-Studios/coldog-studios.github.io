//////////////////////
//  MAIN WEBSITE JS //
//////////////////////

// ----- Meta Tags ----- //

document.addEventListener("DOMContentLoaded", function () {
	// Create the head content
	const headContent = `
        <!-- Browser and Google -->
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="google-site-verification" content="Xnkypqod1SfUGQoBmOg1Fow2g3TySggs4CW5xRYE_jk" />
        <!-- Icons & Styling-->
        <link rel="icon" href="https://www.coldogstudios.com/assets/images/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="https://www.coldogstudios.com/assets/images/apple-touch-icon.png" />
        <link rel="stylesheet" href="https://www.coldogstudios.com/assets/css/styles.css" />
        <link rel="stylesheet" href="https://www.coldogstudios.com/assets/css/nav.css" />
        <link rel="stylesheet" href="https://www.coldogstudios.com/assets/css/footer.css" />
        <link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <!-- Remaining Meta Tags -->
    `;

	// Set the head content
	document.head.innerHTML = headContent;

	// Function to add meta tags
	function addMetaTag(name, content) {
		const meta = document.createElement("meta");
		meta.name = name;
		meta.content = content;
		document.head.appendChild(meta);
	}

	function addMetaProperty(property, content) {
		const meta = document.createElement("meta");
		meta.setAttribute("property", property);
		meta.content = content;
		document.head.appendChild(meta);
	}

	// Function to add canonical link
	function addCanonical(url) {
		const link = document.createElement("link");
		link.rel = "canonical";
		link.href = url;
		document.head.appendChild(link);
	}

	// Function to add search engine specific meta tags
	function addSearchEngineMetaTags(path) {
		// Add canonical URL
		addCanonical(window.location.href);

		// Default robots directive for all pages
		let robotsDirective = "index, follow";

		// Page-specific robots directives
		if (path.includes("/legal/")) {
			robotsDirective = "noindex, nofollow"; // Block legal pages from indexing
		} else if (path.includes("/branding/")) {
			robotsDirective = "noindex, nofollow"; // Keep internal branding private
		} else if (path === "/404.html") {
			robotsDirective = "noindex, nofollow"; // Don't index 404 pages
		} else if (path.includes("/contact/")) {
			robotsDirective = "index, follow"; // Good for local SEO
		}

		// General robots meta tag
		addMetaTag("robots", robotsDirective);

		// Google-specific directives
		addMetaTag("googlebot", `${robotsDirective}, max-snippet:160, max-image-preview:large`);

		// Bing-specific directives
		addMetaTag("bingbot", robotsDirective);

		// Additional meta tags for better indexing
		addMetaTag("referrer", "no-referrer-when-downgrade");
		addMetaTag("format-detection", "telephone=no");

		// Add hreflang for English (assuming your site is English-only)
		const hrefLang = document.createElement("link");
		hrefLang.rel = "alternate";
		hrefLang.hreflang = "en";
		hrefLang.href = window.location.href;
		document.head.appendChild(hrefLang);
	}

	// Function to add JSON-LD structured data
	function addStructuredData(pageMeta, path) {
		const script = document.createElement("script");
		script.type = "application/ld+json";

		let structuredData;

		if (path === "/") {
			// Organization schema for homepage
			structuredData = {
				"@context": "https://schema.org",
				"@type": "Organization",
				name: "ColDog Studios",
				url: "https://www.coldogstudios.com",
				logo: "https://www.coldogstudios.com/assets/images/cds/logo/cdsLogo.png",
				description: pageMeta.description,
				foundingDate: "2023",
				contactPoint: {
					"@type": "ContactPoint",
					url: "https://www.coldogstudios.com/contact/",
				},
				sameAs: [],
			};
		} else if (path.includes("/projects/")) {
			// SoftwareApplication schema for projects
			structuredData = {
				"@context": "https://schema.org",
				"@type": "SoftwareApplication",
				name: pageMeta.title,
				description: pageMeta.description,
				url: window.location.href,
				author: {
					"@type": "Organization",
					name: "ColDog Studios",
				},
				publisher: {
					"@type": "Organization",
					name: "ColDog Studios",
				},
			};
		} else {
			// WebPage schema for other pages
			structuredData = {
				"@context": "https://schema.org",
				"@type": "WebPage",
				name: pageMeta.title,
				description: pageMeta.description,
				url: window.location.href,
				author: {
					"@type": "Organization",
					name: "ColDog Studios",
				},
				publisher: {
					"@type": "Organization",
					name: "ColDog Studios",
				},
			};
		}

		script.textContent = JSON.stringify(structuredData);
		document.head.appendChild(script);
	}

	// Fetch and apply metadata from metadata.json
	fetch("https://www.coldogstudios.com/metadata.json")
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok " + response.statusText);
			}
			return response.json();
		})
		.then((data) => {
			const currentPath = window.location.pathname;
			const pageMeta = data.pages[currentPath];

			if (pageMeta) {
				document.title = pageMeta.title;

				const metaTags = [
					{ name: "author", content: pageMeta.author },
					{ name: "description", content: pageMeta.description },
					{ name: "keywords", content: pageMeta.keywords },
				];

				metaTags.forEach((tag) => addMetaTag(tag.name, tag.content));

				// Add Search Engine Specific Meta Tags
				addSearchEngineMetaTags(currentPath);

				// Add Social Media Meta Tags
				const currentUrl = window.location.href;
				const siteTitle = document.title;

				addMetaProperty("og:url", currentUrl);
				addMetaProperty("og:type", "website");
				addMetaProperty("og:title", siteTitle);
				addMetaProperty("og:description", pageMeta.description);
				addMetaProperty("og:image", "https://www.coldogstudios.com/assets/images/cds/cdsWallpaperLite.png");

				addMetaProperty("twitter:url", currentUrl);
				addMetaProperty("twitter:domain", "coldogstudios.com");
				addMetaTag("twitter:card", "summary_large_image");
				addMetaTag("twitter:title", siteTitle);
				addMetaTag("twitter:description", pageMeta.description);
				addMetaTag("twitter:image", "https://www.coldogstudios.com/assets/images/cds/cdsWallpaperLite.png");

				// Add JSON-LD structured data for better search engine understanding
				addStructuredData(pageMeta, currentPath);
			} else {
				console.error("No metadata found for the current path:", currentPath);
			}
		})
		.catch((error) => console.error("Error fetching metadata:", error));
});

// ----- Navigation Menu ----- //
const nav = document.querySelector(".nav"),
	navOpenBtn = document.querySelector(".navOpenBtn"),
	navCloseBtn = document.querySelector(".navCloseBtn");

navOpenBtn.addEventListener("click", () => {
	nav.classList.add("openNav");
	nav.classList.remove("openSearch");
	//searchIcon.classList.replace("uil-times", "uil-search");
});

navCloseBtn.addEventListener("click", () => {
	nav.classList.remove("openNav");
});

// ----- Footer Load ----- //
document.addEventListener("DOMContentLoaded", function () {
	fetch("/assets/html/footer.html")
		.then((response) => response.text())
		.then((data) => {
			customElements.define(
				"footer-content",
				class extends HTMLElement {
					constructor() {
						super();
						this.innerHTML = data;
						const yearSpan = this.querySelector("#copyrightYear");
						const currentYear = new Date().getFullYear();
						if (yearSpan) {
							yearSpan.textContent = `${currentYear}`;
						}
					}
				}
			);
		});
});
