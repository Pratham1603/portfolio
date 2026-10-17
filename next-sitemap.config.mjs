/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.SITE_URL || 'https://pratham-harer.is-an.ai';

const config = {
    siteUrl,
    generateRobotsTxt: true,
    generateIndexSitemap: true,
    sitemapSize: 1000,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
    },
    transform: async (config, path) => {
        const highPriorityPaths = new Set(['/', '/projects', '/blogs']);
        const isHomePage = path === '/';

        return {
            loc: path,
            changefreq: isHomePage ? 'daily' : 'weekly',
            priority: isHomePage ? 1.0 : highPriorityPaths.has(path) ? 0.9 : 0.7,
            lastmod: new Date().toISOString(),
            alternateRefs: config.alternateRefs ?? [],
        };
    },
}

export default config
