# ColDog Studios Website

This is the official website for ColDog Studios, now powered by Jekyll for improved SEO and maintainability.

## Features

-   **Server-side Rendering**: All meta tags are now rendered server-side for better SEO
-   **Structured Data**: Automatic JSON-LD structured data for search engines
-   **Responsive Design**: Mobile-friendly navigation and layout
-   **Automatic Sitemap**: Jekyll generates sitemap.xml automatically
-   **SEO Optimized**: Built-in SEO tags and meta descriptions

## Development

### Prerequisites

-   Ruby (2.7 or higher)
-   Bundler gem

### Local Development

1. Install dependencies:

    ```bash
    bundle install
    ```

2. Run the development server:

    ```bash
    bundle exec jekyll serve
    ```

3. Open your browser to `http://localhost:4000`

### Building for Production

```bash
bundle exec jekyll build
```

The site will be built to the `_site` directory.

## Structure

-   `_layouts/` - Jekyll layout templates
-   `_includes/` - Reusable components (navigation, footer, etc.)
-   `_config.yml` - Jekyll configuration
-   `assets/` - CSS, JavaScript, images
-   Individual pages use frontmatter for metadata

## SEO Improvements

The Jekyll conversion provides several SEO benefits:

1. **Server-side Meta Tags**: All meta tags are rendered server-side instead of via JavaScript
2. **Structured Data**: Automatic JSON-LD for Organization, WebPage, and SoftwareApplication schemas
3. **Canonical URLs**: Automatic canonical URL generation
4. **Social Media Tags**: Open Graph and Twitter Card meta tags
5. **Sitemap Generation**: Automatic XML sitemap for search engines
6. **SEO Plugin**: Jekyll SEO Tag plugin for additional optimization

## Deployment

This site is designed to work with GitHub Pages. Simply push to the main branch and GitHub Pages will automatically build and deploy the site.

## Legacy Support

The JavaScript file includes backward compatibility for any pages still using the old `<footer-content>` tags, but new pages should use the Jekyll includes system.
