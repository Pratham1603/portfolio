import https from "https";

export type MediumPost = {
  title: string;
  slug: string;
  mediumSlug?: string;
  link: string;
  pubDate: string;
  date: string;
  image: string;
  snippet: string;
  description: string;
  summary: string;
  content: string;
  categories: string[];
};

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function findPostBySlug(posts: MediumPost[], rawSlug: string): MediumPost | undefined {
  const slug = decodeURIComponent(rawSlug).toLowerCase().trim();
  return (
    posts.find((p) => p.slug === slug) ||
    posts.find((p) => p.mediumSlug && p.mediumSlug === slug) ||
    posts.find((p) => p.slug.startsWith(slug) || slug.startsWith(p.slug))
  );
}

export async function fetchMediumPosts(username = "prathamharer1603"): Promise<MediumPost[]> {
  return new Promise((resolve) => {
    const req = https.get(
      `https://medium.com/feed/@${username}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          Accept: "application/rss+xml, application/xml, text/xml, */*",
          "Accept-Language": "en-US,en;q=0.9",
        },
        timeout: 10000,
      },
      (res) => {
        let xml = "";
        res.on("data", (chunk) => (xml += chunk));
        res.on("end", () => {
          try {
            const posts: MediumPost[] = [];
            const itemRegex = /<item>([\s\S]*?)<\/item>/g;
            let match;
            while ((match = itemRegex.exec(xml)) !== null) {
              const itemXml = match[1];

              // Title
              const titleMatch =
                itemXml.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/) ||
                itemXml.match(/<title>([\s\S]*?)<\/title>/);
              const rawTitle = titleMatch ? titleMatch[1].trim() : "";
              const cleanTitle = rawTitle.replace(/\r?\n/g, " ").replace(/\s+/g, " ");

              // Link (strip tracking query)
              const linkMatch = itemXml.match(/<link>([\s\S]*?)<\/link>/);
              let link = linkMatch ? linkMatch[1].trim() : "";
              if (link.includes("?")) {
                link = link.split("?")[0];
              }

              // PubDate
              const dateMatch = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
              const pubDate = dateMatch ? dateMatch[1].trim() : "";
              let dateIso = new Date().toISOString().split("T")[0];
              try {
                if (pubDate) {
                  dateIso = new Date(pubDate).toISOString().split("T")[0];
                }
              } catch {}

              // Content HTML
              const contentMatch = itemXml.match(
                /<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/
              );
              let contentHtml = contentMatch ? contentMatch[1].trim() : "";
              // Remove tracking pixel
              contentHtml = contentHtml.replace(
                /<img[^>]+src=["']https:\/\/medium\.com\/_\/stat[^"']*["'][^>]*>/gi,
                ""
              );

              // Image
              const imgMatch = contentHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
              const image = imgMatch ? imgMatch[1] : "";

              // Snippet (first paragraph text)
              const pMatch = contentHtml.match(/<p>([\s\S]*?)<\/p>/i);
              let snippet = pMatch ? pMatch[1].replace(/<[^>]+>/g, "").trim() : "";
              if (snippet.length > 150) {
                snippet = snippet.substring(0, 150) + "...";
              }

              // Categories / Tags
              const categories: string[] = [];
              const catRegex = /<category><!\[CDATA\[([\s\S]*?)\]\]><\/category>/g;
              let catMatch;
              while ((catMatch = catRegex.exec(itemXml)) !== null) {
                categories.push(catMatch[1]);
              }

              if (cleanTitle && link) {
                const slug = slugify(cleanTitle);
                const mediumSlug = link.split("/").filter(Boolean).pop()?.toLowerCase() || "";
                posts.push({
                  title: cleanTitle,
                  slug,
                  mediumSlug,
                  link,
                  pubDate,
                  date: dateIso,
                  image,
                  snippet,
                  description: snippet,
                  summary: snippet,
                  content: contentHtml,
                  categories,
                });
              }
            }
            resolve(posts);
          } catch {
            resolve([]);
          }
        });
      }
    );

    req.on("error", () => resolve([]));
    req.on("timeout", () => {
      req.destroy();
      resolve([]);
    });
  });
}
