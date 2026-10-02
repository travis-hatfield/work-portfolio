import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { profile, type Role } from "@/lib/data";
import { coreExpertise, careerHighlights, education } from "@/lib/resume";

// Letter size, 0.6in margins.
const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN = 43;
const CONTENT_W = PAGE_W - MARGIN * 2;
const INK = rgb(0.1, 0.1, 0.12);
const MUTED = rgb(0.4, 0.4, 0.45);
const ACCENT = rgb(0.31, 0.27, 0.9);

// Standard PDF fonts only cover WinAnsi; swap anything outside it.
function clean(text: string) {
  return text
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/→/g, "->")
    .replace(/[^\x20-\x7E -ÿ–—•…]/g, "");
}

function wrap(text: string, font: PDFFont, size: number, width: number) {
  const words = clean(text).split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (font.widthOfTextAtSize(next, size) > width && line) {
      lines.push(line);
      line = w;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export async function buildResumePdf(roles: Pick<Role, "company" | "title" | "dates" | "summary" | "details">[]) {
  const doc = await PDFDocument.create();
  doc.setTitle(`${profile.name} Resume`);
  doc.setAuthor(profile.name);
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  let page: PDFPage = doc.addPage([PAGE_W, PAGE_H]);
  let y = PAGE_H - MARGIN;

  const ensure = (h: number) => {
    if (y - h < MARGIN) {
      page = doc.addPage([PAGE_W, PAGE_H]);
      y = PAGE_H - MARGIN;
    }
  };

  const text = (
    t: string,
    opts: { font?: PDFFont; size?: number; color?: ReturnType<typeof rgb>; indent?: number; gap?: number; bullet?: boolean } = {},
  ) => {
    const font = opts.font ?? regular;
    const size = opts.size ?? 9.5;
    const indent = opts.indent ?? 0;
    const lh = size * 1.32;
    const lines = wrap(t, font, size, CONTENT_W - indent);
    lines.forEach((l, i) => {
      ensure(lh);
      if (opts.bullet && i === 0) {
        page.drawText("•", { x: MARGIN + indent - 9, y: y - size, size, font: regular, color: ACCENT });
      }
      page.drawText(l, { x: MARGIN + indent, y: y - size, size, font, color: opts.color ?? INK });
      y -= lh;
    });
    y -= opts.gap ?? 0;
  };

  const section = (label: string) => {
    ensure(30);
    y -= 8;
    page.drawText(label.toUpperCase(), { x: MARGIN, y: y - 9, size: 9, font: bold, color: ACCENT });
    y -= 13;
    page.drawLine({ start: { x: MARGIN, y }, end: { x: PAGE_W - MARGIN, y }, thickness: 0.6, color: rgb(0.82, 0.82, 0.86) });
    y -= 6;
  };

  // Header
  text(profile.name, { font: bold, size: 20, gap: 2 });
  text(profile.resumeHeadline, { size: 10.5, color: ACCENT, gap: 1 });
  text(profile.location, { size: 9, color: MUTED, gap: 1 });
  text(`${profile.email}  |  ${profile.secondaryEmail}  |  work.travishatfield.dev`, { size: 9, color: MUTED, gap: 2 });

  section("Summary");
  text(profile.blurb, { gap: 2 });

  section("Career highlights");
  for (const h of careerHighlights) {
    text(h.title, { font: bold, size: 9.5 });
    text(h.detail, { gap: 4 });
  }

  section("Experience");
  for (const role of roles) {
    ensure(40);
    text(role.title, { font: bold, size: 10.5 });
    text(`${role.company}  ·  ${role.dates}`, { size: 9, color: MUTED, gap: 2 });
    const details = Array.isArray(role.details) ? (role.details as string[]) : [];
    if (details.length === 0 && role.summary) text(role.summary, { indent: 12, bullet: true });
    for (const d of details) text(d, { indent: 12, bullet: true });
    y -= 6;
  }

  section("Core expertise");
  text(coreExpertise.join("  ·  "), { gap: 2 });

  section("Education & certifications");
  for (const e of education) text(`${e.credential}, ${e.org}`);

  return doc.save();
}
