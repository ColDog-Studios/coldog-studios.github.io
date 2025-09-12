// Code block functionality
document.addEventListener("DOMContentLoaded", function () {
	// Language name mappings for display
	const languageNames = {
		javascript: "JavaScript",
		js: "JavaScript",
		typescript: "TypeScript",
		ts: "TypeScript",
		python: "Python",
		py: "Python",
		java: "Java",
		csharp: "C#",
		cpp: "C++",
		c: "C",
		php: "PHP",
		ruby: "Ruby",
		go: "Go",
		rust: "Rust",
		swift: "Swift",
		kotlin: "Kotlin",
		scala: "Scala",
		html: "HTML",
		css: "CSS",
		scss: "SCSS",
		sass: "Sass",
		less: "Less",
		xml: "XML",
		json: "JSON",
		yaml: "YAML",
		yml: "YAML",
		toml: "TOML",
		ini: "INI",
		sql: "SQL",
		bash: "Shell",
		sh: "Shell",
		zsh: "Zsh",
		fish: "Fish",
		powershell: "PowerShell",
		ps1: "PowerShell",
		batch: "Batch",
		cmd: "Command Prompt",
		dockerfile: "Dockerfile",
		makefile: "Makefile",
		markdown: "Markdown",
		md: "Markdown",
		text: "Text",
		plaintext: "Plain Text",
		console: "Console",
		terminal: "Terminal",
	};

	// Process all code blocks
	document.querySelectorAll('div[class^="language-"]').forEach(function (codeBlock) {
		// Skip if already processed
		if (codeBlock.querySelector(".code-header")) {
			return;
		}

		// Extract language from class name
		const className = codeBlock.className;
		const languageMatch = className.match(/language-(\w+)/);
		const language = languageMatch ? languageMatch[1] : "text";

		// Check for file attribute (Kramdown file syntax)
		const fileAttr = codeBlock.getAttribute("file");

		// Create header
		const header = document.createElement("div");
		header.className = "code-header";

		// Create label span
		const label = document.createElement("span");

		if (fileAttr) {
			// Show filename with file icon
			label.innerHTML = `<i class="far fa-file-code"></i>`;
			label.setAttribute("data-label-text", fileAttr);
		} else {
			// Show language name with code icon
			const displayName = languageNames[language] || language.charAt(0).toUpperCase() + language.slice(1);
			label.innerHTML = `<i class="fas fa-code small"></i>`;
			label.setAttribute("data-label-text", displayName);
		}

		// Create copy button
		const copyButton = document.createElement("button");
		copyButton.innerHTML = '<i class="far fa-clipboard"></i>';
		copyButton.setAttribute("aria-label", "copy");
		copyButton.setAttribute("title", "Copy to clipboard");

		// Add copy functionality
		copyButton.addEventListener("click", function () {
			// Get the code content, preferring the rouge-code cell if it exists
			const rougeCodeCell = codeBlock.querySelector(".rouge-code pre");
			const codeContent = rougeCodeCell ? rougeCodeCell.textContent : codeBlock.querySelector("pre").textContent;

			if (navigator.clipboard && window.isSecureContext) {
				// Modern async clipboard API
				navigator.clipboard
					.writeText(codeContent)
					.then(() => {
						showCopySuccess(copyButton);
					})
					.catch((err) => {
						console.error("Copy failed:", err);
						fallbackCopy(codeContent, copyButton);
					});
			} else {
				// Fallback for older browsers
				fallbackCopy(codeContent, copyButton);
			}
		});

		// Assemble header
		header.appendChild(label);
		header.appendChild(copyButton);

		// Insert header at the beginning of the code block
		codeBlock.insertBefore(header, codeBlock.firstChild);

		// Adjust the highlighter-rouge container styling
		const highlighterRouge = codeBlock.querySelector(".highlighter-rouge");
		if (highlighterRouge) {
			highlighterRouge.style.marginTop = "0";
		}
	});

	function fallbackCopy(text, button) {
		const textArea = document.createElement("textarea");
		textArea.value = text;
		textArea.style.position = "fixed";
		textArea.style.opacity = "0";
		textArea.style.left = "-9999px";
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();

		try {
			document.execCommand("copy");
			showCopySuccess(button);
		} catch (err) {
			console.error("Copy failed:", err);
		}

		document.body.removeChild(textArea);
	}

	function showCopySuccess(button) {
		button.setAttribute("data-copied", "true");
		button.setAttribute("title", "Copied!");
		const icon = button.querySelector("i");
		const originalClass = icon.className;
		icon.className = "fas fa-check";

		setTimeout(() => {
			button.removeAttribute("data-copied");
			button.setAttribute("title", "Copy to clipboard");
			icon.className = originalClass;
		}, 2000);
	}
});
