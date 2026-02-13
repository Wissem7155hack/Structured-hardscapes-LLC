import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
    title?: string;
    description?: string;
    keywords?: string;
    canonical?: string;
    ogImage?: string;
    schema?: object;
    noindex?: boolean;
    articleDate?: string;
    articleModified?: string;
    articleAuthor?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
    title = 'Structured hardscapes LLC – Professional Hardscaping & Construction',
    description = 'Expert hardscaping and construction services. We install retaining walls, patios, pavers, and perform excavation and tree removal. ✓ Free Consultation ✓ Quality Work ✓ Reliable Service. Call 425-870-9414!',
    keywords = 'hardscaping, retaining walls, excavation, landscape construction, patio installation, tree removal, Structured hardscapes LLC, Snohomish County',
    canonical,
    ogImage = 'https://structuredhardscapes.com/images/logo.png',
    schema,
    noindex = false,
    articleDate,
    articleModified,
    articleAuthor
}) => {
    const location = useLocation();
    const baseUrl = 'https://structuredhardscapes.com';
    const fullUrl = canonical || `${baseUrl}${location.pathname}`;

    useEffect(() => {
        // Update document title
        document.title = title;

        // Update meta tags
        const updateMetaTag = (name: string, content: string, isProperty = false) => {
            const attribute = isProperty ? 'property' : 'name';
            let meta = document.querySelector(`meta[${attribute}="${name}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute(attribute, name);
                document.head.appendChild(meta);
            }
            meta.setAttribute('content', content);
        };

        // Remove meta tag if exists
        const removeMetaTag = (name: string, isProperty = false) => {
            const attribute = isProperty ? 'property' : 'name';
            const meta = document.querySelector(`meta[${attribute}="${name}"]`);
            if (meta) {
                meta.remove();
            }
        };

        // Basic meta tags
        updateMetaTag('description', description);
        updateMetaTag('keywords', keywords);

        // Robots tag
        if (noindex) {
            updateMetaTag('robots', 'noindex, nofollow');
        } else {
            updateMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
        }

        // Googlebot specific
        updateMetaTag('googlebot', noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

        // Open Graph tags
        updateMetaTag('og:title', title, true);
        updateMetaTag('og:description', description, true);
        updateMetaTag('og:url', fullUrl, true);
        updateMetaTag('og:image', ogImage, true);
        updateMetaTag('og:type', articleDate ? 'article' : 'website', true);
        updateMetaTag('og:locale', 'en_US', true);
        updateMetaTag('og:site_name', 'Structured hardscapes LLC', true);
        updateMetaTag('og:image:width', '1200', true);
        updateMetaTag('og:image:height', '630', true);
        updateMetaTag('og:image:alt', 'Structured hardscapes LLC - Professional Hardscaping', true);

        // Article-specific Open Graph tags
        if (articleDate) {
            updateMetaTag('article:published_time', articleDate, true);
            updateMetaTag('article:author', articleAuthor || 'Structured Hardscapes Team', true);
            updateMetaTag('article:section', 'Landscaping', true);
            if (articleModified) {
                updateMetaTag('article:modified_time', articleModified, true);
            }
        } else {
            removeMetaTag('article:published_time', true);
            removeMetaTag('article:modified_time', true);
            removeMetaTag('article:author', true);
            removeMetaTag('article:section', true);
        }

        // Twitter tags
        updateMetaTag('twitter:card', 'summary_large_image');
        updateMetaTag('twitter:title', title);
        updateMetaTag('twitter:description', description);
        updateMetaTag('twitter:image', ogImage);
        updateMetaTag('twitter:site', '@structuredhardscapes');
        updateMetaTag('twitter:creator', '@structuredhardscapes');

        // Geo tags (for local SEO)
        updateMetaTag('geo.region', 'US-WA');
        updateMetaTag('geo.placename', 'Snohomish County, Washington');
        updateMetaTag('geo.position', '47.978;-122.202');
        updateMetaTag('ICBM', '47.978, -122.202');

        // Update canonical link
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', fullUrl);

        // Add schema markup if provided
        if (schema) {
            let schemaScript = document.querySelector('script[data-schema="page"]');
            if (!schemaScript) {
                schemaScript = document.createElement('script');
                schemaScript.setAttribute('type', 'application/ld+json');
                schemaScript.setAttribute('data-schema', 'page');
                document.head.appendChild(schemaScript);
            }
            schemaScript.textContent = JSON.stringify(schema);
        }

        // Cleanup on unmount
        return () => {
            // Remove page-specific schema on route change
            const schemaScript = document.querySelector('script[data-schema="page"]');
            if (schemaScript) {
                schemaScript.remove();
            }
        };
    }, [title, description, keywords, fullUrl, ogImage, schema, noindex, articleDate, articleModified, articleAuthor]);

    return null;
};

export default SEOHead;
