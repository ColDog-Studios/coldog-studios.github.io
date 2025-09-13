/**
 * Commons JavaScript
 * Entry point for common functionality across all pages
 * Following Chirpy theme pattern
 */

import { basic } from "./modules/layouts";
import { initNavigation, initSearch } from "./modules/components";

// Initialize basic layout functionality
basic();

// Initialize navigation
initNavigation();

// Initialize search
initSearch();
