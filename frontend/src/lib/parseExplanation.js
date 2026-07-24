// Splits the AI's streamed markdown response into discrete sections so the
// UI can render each one inside its own card as it arrives.
// Sections are delimited by "## " headings, e.g. "## 📖 Summary".

const SECTION_ICON_FALLBACK = "📌";

export function parseExplanationSections(rawText) {
  if (!rawText || !rawText.trim()) return [];

  const lines = rawText.split("\n");
  const sections = [];
  let current = null;

  for (const line of lines) {
    const headingMatch = line.match(/^##\s+(.*)$/);
    if (headingMatch) {
      if (current) sections.push(current);
      const fullTitle = headingMatch[1].trim();
      const emojiMatch = fullTitle.match(
        /^(\p{Emoji_Presentation}|\p{Extended_Pictographic})\s*/u
      );
      const icon = emojiMatch ? emojiMatch[0].trim() : SECTION_ICON_FALLBACK;
      const title = emojiMatch
        ? fullTitle.replace(emojiMatch[0], "").trim()
        : fullTitle;
      current = { id: `${sections.length}-${title}`, icon, title, content: "" };
    } else if (current) {
      current.content += line + "\n";
    } else {
      // Text before the first heading — keep it as a preamble section.
      if (!sections.length && !current) {
        current = { id: "preamble", icon: "🤖", title: "", content: "" };
      }
      if (current) current.content += line + "\n";
    }
  }
  if (current) sections.push(current);

  return sections.filter((s) => s.title || s.content.trim());
}

// Pulls out "Concepts Used" tag-like list items for pill rendering.
export function extractTags(content) {
  return content
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => /^[-*]\s+/.test(l))
    .map((l) => l.replace(/^[-*]\s+/, "").trim())
    .filter(Boolean);
}
