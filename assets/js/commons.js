/**
 * Commons JavaScript
 * Entry point for common functionality across all pages
 */

import { basic } from "./modules/layouts.js";
import { initNavigation, initSearch, initImageLoading } from "./modules/components.js";

// Initialize basic layout functionality
basic();

// Initialize navigation
initNavigation();

// Initialize search
initSearch();

// Initialize image loading
initImageLoading();
