
const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");
const fs = require("fs");
const path = require("path");

const notion = new Client({ auth: process.env.NOTION_AUTH_KEY });
const n2m = new NotionToMarkdown({
    notionClient: notion,
    config: {
        separateChildPage: true,
    }
});

const sanitizeFilename = (name) => {
    return name.replace(/[<>:"/\\|?*]+/g, "").trim();
};

const getTopLevelPages = async (cursor) => {
    const pages = [];
    let hasMore = true;

    while (hasMore) {
        const response = await notion.search({
            start_cursor: cursor,
            page_size: 100,
            filter: {
                property: "object",
                value: "page",
            },
        });

        const topPages = response.results.filter(page => !page.parent.page_id);
        pages.push(...topPages);
        hasMore = response.has_more;
        cursor = response.next_cursor;
    }

    return pages;
};

const getChildPages = async (pageId) => {
    const children = [];
    let hasMore = true;
    let cursor = undefined;

    while (hasMore) {
        const response = await notion.blocks.children.list({
            block_id: pageId,
            start_cursor: cursor,
        });

        children.push(...response.results.filter(block => block.type === "child_page"));
        hasMore = response.has_more;
        cursor = response.next_cursor;
    }

    return children;
};

const savePageAsMarkdown = async (pageId, title, dirPath) => {
    const sanitizedTitle = sanitizeFilename(title);
    const sanitizedDirPath = path.join(dirPath, sanitizedTitle);

    if (!fs.existsSync(sanitizedDirPath)) {
        fs.mkdirSync(sanitizedDirPath, { recursive: true });
    }

    const mdBlocks = await n2m.pageToMarkdown(pageId);
    const mdString = n2m.toMarkdownString(mdBlocks);

    let content = mdString.parent;

    const childPages = await getChildPages(pageId);
    if (childPages.length > 0) {
        content += "\n\n## Child Pages\n";
        for (const child of childPages) {
            const childTitle = child.child_page.title || "Untitled";
            const childFileName = sanitizeFilename(childTitle);
            const childLink = `./${childFileName}/${childFileName}.md`;
            content += `- [${childTitle}](${childLink})\n`;
            await savePageAsMarkdown(child.id, childTitle, sanitizedDirPath);
        }
    }

    const filePath = path.join(sanitizedDirPath, `${sanitizedTitle}.md`);
    fs.writeFileSync(filePath, String(content));
    console.log(`Saved/Updated ${sanitizedTitle} to ${filePath}`);
};

(async () => {
    try {
        const topPages = await getTopLevelPages();

        for (const page of topPages) {
            const title = page.properties.title
                ? page.properties.title.title[0].plain_text
                : "Untitled" + page.id;
            await savePageAsMarkdown(page.id, title, path.join(__dirname, "markdown"));
        }

        console.log("All pages and their child pages have been saved as Markdown.");
    } catch (error) {
        console.error("Error fetching or saving pages:", error.message);
    }
})();

