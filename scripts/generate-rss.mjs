import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SITE_URL = process.env.SITE_URL || 'https://prathamharer.is-an.ai';
const FEED_TITLE = 'Pratham Harer';
const FEED_DESC = 'AI Engineer building intelligent backends, ML systems, and scalable APIs.';
const MAX_ITEMS = 30;

const blogsDir = path.join(process.cwd(), 'content', 'blogs');

const escapeXml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const toRfc822 = (dateStr) => {
  const d = new Date(dateStr);
  return Number.isNaN(d.getTime()) ? new Date(0).toUTCString() : d.toUTCString();
};

const absUrl = (p) => {
  if (!p) return '';
  if (p.startsWith('http')) return p;
  return `${SITE_URL}${p.startsWith('/') ? '' : '/'}${p}`;
};

const posts = fs.existsSync(blogsDir)
  ? fs
      .readdirSync(blogsDir)
      .filter((f) => f.endsWith('.md'))
      .map((f) => {
        const slug = f.replace(/\.md$/, '');
        const { data } = matter(fs.readFileSync(path.join(blogsDir, f), 'utf8'));
        return { slug, ...data };
      })
      .filter((p) => !p.private && !p.hidden && p.slug !== 'template' && p.title && p.date)
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .slice(0, MAX_ITEMS)
  : [];

const items = posts
  .map((p) => {
    const url = `${SITE_URL}/blogs/${p.slug}`;
    const img = p.image || p.cardImage;
    const enclosure = img ? `\n      <enclosure url="${escapeXml(absUrl(img))}" type="image/webp" />` : '';
    return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${toRfc822(p.date)}</pubDate>
      <description>${escapeXml(p.description || '')}</description>${enclosure}
    </item>`;
  })
  .join('\n');

const lastBuildDate = posts[0] ? toRfc822(posts[0].date) : new Date(0).toUTCString();

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(FEED_DESC)}</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

fs.writeFileSync(path.join(process.cwd(), 'public', 'rss.xml'), rss);
console.log(`✅ [rss] Generated public/rss.xml with ${posts.length} items`);
