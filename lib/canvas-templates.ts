import {
  createCanvasId,
  createEmptyCanvas,
  type CanvasDoc,
  type CanvasElement,
} from "@/lib/canvas";

export type CanvasTemplateCategory =
  | "Blank"
  | "Editorial"
  | "Personal"
  | "Travel"
  | "Food"
  | "Portfolio"
  | "Creative"
  | "Minimal"
  | "Interview"
  | "List";

export type CanvasTemplate = {
  id: string;
  name: string;
  description: string;
  category: CanvasTemplateCategory;
  accent: string;
  document: CanvasDoc;
};

type ElementInput = Omit<CanvasElement, "id" | "zIndex"> & {
  id?: string;
  zIndex?: number;
};

const element = (input: ElementInput): CanvasElement => ({
  ...input,
  id: input.id ?? createCanvasId(),
  zIndex: input.zIndex ?? 1,
});

const text = (
  html: string,
  x: number,
  y: number,
  width: number,
  height: number,
  options: Partial<CanvasElement> = {}
) =>
  element({
    type: "text",
    html,
    x,
    y,
    width,
    height,
    fontSize: 24,
    color: "#111827",
    lineHeight: 1.15,
    ...options,
  });

const shape = (
  x: number,
  y: number,
  width: number,
  height: number,
  bgColor: string,
  options: Partial<CanvasElement> = {}
) =>
  element({
    type: "shape",
    shapeKind: "rect",
    x,
    y,
    width,
    height,
    bgColor,
    ...options,
  });

const image = (
  x: number,
  y: number,
  width: number,
  height: number,
  label: string,
  options: Partial<CanvasElement> = {}
) =>
  element({
    type: "image",
    src: "",
    alt: label,
    objectFit: "cover",
    x,
    y,
    width,
    height,
    bgColor: "#e5e7eb",
    ...options,
  });

const button = (
  label: string,
  x: number,
  y: number,
  width: number,
  height: number,
  bgColor: string,
  textColor: string,
  options: Partial<CanvasElement> = {}
) =>
  element({
    type: "button",
    label,
    url: "",
    x,
    y,
    width,
    height,
    bgColor,
    textColor,
    borderRadius: 4,
    ...options,
  });

export const CANVAS_TEMPLATES: CanvasTemplate[] = [
  {
    id: "blank",
    name: "Start Blank",
    description: "A completely open canvas for true free-form design.",
    category: "Blank",
    accent: "#111827",
    document: createEmptyCanvas(),
  },
  {
    id: "classic-editorial",
    name: "Classic Editorial",
    description: "A clean newspaper-inspired layout for essays and announcements.",
    category: "Editorial",
    accent: "#9f1239",
    document: {
      designWidth: 900,
      height: 1180,
      background: "#fffdf8",
      elements: [
        text("THE WEEKLY NOTE", 70, 55, 350, 35, {
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: 4,
          color: "#9f1239",
        }),
        text("A Thoughtful Headline Goes Here", 70, 125, 760, 155, {
          fontSize: 58,
          fontFamily: "Georgia, serif",
          fontWeight: 700,
          lineHeight: 1.02,
          color: "#171717",
        }),
        text("A short introduction that gives readers a reason to keep going.", 75, 310, 650, 65, {
          fontSize: 21,
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
          color: "#57534e",
          lineHeight: 1.4,
        }),
        shape(70, 405, 760, 2, "#171717"),
        image(70, 450, 760, 355, "Replace with featured image", { borderRadius: 2 }),
        text("YOUR STORY", 70, 855, 180, 30, {
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: 3,
          color: "#9f1239",
        }),
        text(
          "Start writing the body of your post here. Double-click this text to replace it with your own story.",
          70,
          915,
          760,
          145,
          {
            fontSize: 20,
            fontFamily: "Georgia, serif",
            lineHeight: 1.55,
            color: "#292524",
          }
        ),
      ],
    },
  },
  {
    id: "modern-magazine",
    name: "Modern Magazine",
    description: "Bold type, layered shapes, and an offset hero image.",
    category: "Editorial",
    accent: "#ea580c",
    document: {
      designWidth: 900,
      height: 1100,
      background: "#f4f1ea",
      elements: [
        shape(0, 0, 900, 300, "#172554", { zIndex: 0 }),
        text("ISSUE 01 / IDEAS", 65, 55, 300, 30, {
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: 3,
          color: "#fdba74",
          zIndex: 2,
        }),
        text("Make Something People Remember", 65, 110, 620, 180, {
          fontSize: 64,
          fontWeight: 800,
          lineHeight: 0.95,
          color: "#ffffff",
          zIndex: 2,
        }),
        shape(620, 240, 210, 210, "#f97316", { rotation: 8, zIndex: 1 }),
        image(80, 355, 640, 390, "Replace with magazine hero image", {
          borderRadius: 18,
          rotation: -2,
          zIndex: 3,
        }),
        text("THE BIG IDEA", 80, 805, 210, 35, {
          fontSize: 16,
          fontWeight: 800,
          letterSpacing: 3,
          color: "#ea580c",
        }),
        text(
          "Use this area for a sharp opening paragraph, a personal observation, or the main argument of your post.",
          80,
          865,
          700,
          130,
          {
            fontSize: 25,
            fontWeight: 500,
            lineHeight: 1.4,
            color: "#172554",
          }
        ),
      ],
    },
  },
  {
    id: "personal-story",
    name: "Personal Story",
    description: "Warm, intimate storytelling with a portrait and pull quote.",
    category: "Personal",
    accent: "#7c3aed",
    document: {
      designWidth: 900,
      height: 1180,
      background: "#faf7ff",
      elements: [
        shape(52, 52, 796, 1070, "#ffffff", {
          borderRadius: 30,
          borderWidth: 1,
          borderColor: "#e9d5ff",
          zIndex: 0,
        }),
        text("PERSONAL ESSAY", 105, 105, 250, 30, {
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: 3,
          color: "#7c3aed",
          zIndex: 2,
        }),
        text("The Moment Everything Changed", 105, 165, 500, 155, {
          fontSize: 52,
          fontFamily: "Georgia, serif",
          fontWeight: 700,
          color: "#2e1065",
          lineHeight: 1.04,
          zIndex: 2,
        }),
        image(625, 130, 160, 210, "Replace with portrait", {
          borderRadius: 80,
          zIndex: 2,
        }),
        text("By Your Name · 8 min read", 105, 355, 350, 30, {
          fontSize: 15,
          color: "#6b7280",
          zIndex: 2,
        }),
        shape(105, 420, 680, 2, "#ddd6fe", { zIndex: 2 }),
        text(
          "“Add a memorable line from your story here. Something honest, specific, and unmistakably yours.”",
          135,
          485,
          630,
          170,
          {
            fontSize: 31,
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            align: "center",
            lineHeight: 1.3,
            color: "#5b21b6",
            zIndex: 2,
          }
        ),
        text(
          "Begin the story here. This layout gives personal writing plenty of breathing room while still feeling designed and intentional.",
          130,
          725,
          640,
          220,
          {
            fontSize: 20,
            fontFamily: "Georgia, serif",
            lineHeight: 1.65,
            color: "#374151",
            zIndex: 2,
          }
        ),
      ],
    },
  },
  {
    id: "travel-journal",
    name: "Travel Journal",
    description: "A postcard-style layout for trips, city guides, and photo stories.",
    category: "Travel",
    accent: "#0369a1",
    document: {
      designWidth: 900,
      height: 1240,
      background: "#ecfeff",
      elements: [
        image(0, 0, 900, 500, "Replace with destination hero image", { zIndex: 0 }),
        shape(0, 0, 900, 500, "#082f49", { opacity: 0.42, zIndex: 1 }),
        text("TRAVEL NOTES", 70, 75, 300, 35, {
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: 4,
          color: "#ffffff",
          zIndex: 2,
        }),
        text("48 Hours in Your Favorite City", 70, 145, 720, 180, {
          fontSize: 64,
          fontWeight: 800,
          lineHeight: 1.02,
          color: "#ffffff",
          zIndex: 2,
        }),
        text(
          "A practical guide to where to stay, what to eat, and what is actually worth your time.",
          75,
          355,
          680,
          90,
          { fontSize: 21, color: "#e0f2fe", lineHeight: 1.45, zIndex: 2 }
        ),
        shape(65, 550, 245, 245, "#fef3c7", { borderRadius: 18, rotation: -3 }),
        text("DAY ONE", 95, 585, 180, 30, {
          fontSize: 14,
          fontWeight: 800,
          letterSpacing: 3,
          color: "#a16207",
          zIndex: 2,
        }),
        text("Arrive, wander, and find the place locals actually love.", 95, 635, 180, 120, {
          fontSize: 23,
          fontFamily: "Georgia, serif",
          color: "#422006",
          zIndex: 2,
        }),
        image(350, 545, 480, 300, "Replace with day-one photo", { borderRadius: 20 }),
        text("THE SHORT LIST", 70, 915, 250, 35, {
          fontSize: 15,
          fontWeight: 800,
          letterSpacing: 3,
          color: "#0369a1",
        }),
        text(
          "Stay: Your hotel recommendation<br>Eat: Your favorite restaurant<br>Do: The experience you would repeat",
          70,
          975,
          540,
          150,
          { fontSize: 22, lineHeight: 1.65, color: "#164e63" }
        ),
        button("View the map", 650, 1000, 180, 54, "#0369a1", "#ffffff", {
          borderRadius: 27,
        }),
      ],
    },
  },
  {
    id: "recipe-feature",
    name: "Recipe Feature",
    description: "A polished food layout with a hero image and recipe card.",
    category: "Food",
    accent: "#be123c",
    document: {
      designWidth: 900,
      height: 1230,
      background: "#fffbeb",
      elements: [
        text("FROM MY KITCHEN", 70, 65, 350, 30, {
          fontSize: 14,
          fontWeight: 800,
          letterSpacing: 4,
          color: "#be123c",
        }),
        text("The Recipe You Will Make All Year", 70, 120, 760, 130, {
          fontSize: 55,
          fontFamily: "Georgia, serif",
          fontWeight: 700,
          lineHeight: 1.05,
          color: "#431407",
        }),
        text("Simple ingredients, a little patience, and a result that feels special.", 75, 280, 650, 60, {
          fontSize: 20,
          fontStyle: "italic",
          color: "#78716c",
        }),
        image(70, 385, 760, 355, "Replace with finished dish", { borderRadius: 24 }),
        shape(70, 790, 290, 330, "#ffe4e6", { borderRadius: 24 }),
        text("AT A GLANCE", 100, 830, 220, 30, {
          fontSize: 14,
          fontWeight: 800,
          letterSpacing: 3,
          color: "#be123c",
          zIndex: 2,
        }),
        text("Prep: 20 minutes<br>Cook: 35 minutes<br>Serves: 4 people<br>Difficulty: Easy", 100, 890, 220, 170, {
          fontSize: 19,
          lineHeight: 1.7,
          color: "#881337",
          zIndex: 2,
        }),
        text("WHY THIS WORKS", 415, 815, 330, 35, {
          fontSize: 15,
          fontWeight: 800,
          letterSpacing: 3,
          color: "#be123c",
        }),
        text(
          "Use this area to explain what makes the recipe reliable, flexible, or especially worth sharing.",
          415,
          880,
          375,
          170,
          { fontSize: 21, fontFamily: "Georgia, serif", lineHeight: 1.55, color: "#431407" }
        ),
      ],
    },
  },
  {
    id: "case-study",
    name: "Portfolio Case Study",
    description: "A structured project story for design, technology, or career work.",
    category: "Portfolio",
    accent: "#0f766e",
    document: {
      designWidth: 900,
      height: 1190,
      background: "#f8fafc",
      elements: [
        text("CASE STUDY · 2026", 65, 65, 350, 30, {
          fontSize: 14,
          fontWeight: 800,
          letterSpacing: 3,
          color: "#0f766e",
        }),
        text("A Project That Made a Measurable Difference", 65, 125, 760, 145, {
          fontSize: 54,
          fontWeight: 800,
          lineHeight: 1.02,
          color: "#0f172a",
        }),
        text("Role: Your role     Timeline: 8 weeks     Team: Cross-functional", 70, 315, 730, 35, {
          fontSize: 16,
          color: "#475569",
        }),
        image(65, 400, 770, 320, "Replace with project screenshot", { borderRadius: 16 }),
        shape(65, 770, 220, 250, "#ccfbf1", { borderRadius: 18 }),
        text("THE CHALLENGE", 90, 810, 170, 30, {
          fontSize: 13,
          fontWeight: 800,
          letterSpacing: 2,
          color: "#0f766e",
          zIndex: 2,
        }),
        text("Describe the problem and why it mattered.", 90, 865, 165, 115, {
          fontSize: 20,
          fontWeight: 600,
          color: "#134e4a",
          zIndex: 2,
        }),
        shape(330, 770, 220, 250, "#dbeafe", { borderRadius: 18 }),
        text("THE APPROACH", 355, 810, 170, 30, {
          fontSize: 13,
          fontWeight: 800,
          letterSpacing: 2,
          color: "#1d4ed8",
          zIndex: 2,
        }),
        text("Explain the decisions, process, and collaboration.", 355, 865, 165, 115, {
          fontSize: 20,
          fontWeight: 600,
          color: "#1e3a8a",
          zIndex: 2,
        }),
        shape(595, 770, 240, 250, "#fef3c7", { borderRadius: 18 }),
        text("THE RESULT", 620, 810, 175, 30, {
          fontSize: 13,
          fontWeight: 800,
          letterSpacing: 2,
          color: "#b45309",
          zIndex: 2,
        }),
        text("Add the outcome, evidence, and what you learned.", 620, 865, 180, 115, {
          fontSize: 20,
          fontWeight: 600,
          color: "#78350f",
          zIndex: 2,
        }),
      ],
    },
  },
  {
    id: "neon-future",
    name: "Neon Future",
    description: "A distinctive high-contrast layout for technology and creative culture.",
    category: "Creative",
    accent: "#d946ef",
    document: {
      designWidth: 900,
      height: 1120,
      background: "#09090b",
      elements: [
        shape(610, 45, 220, 220, "#22d3ee", { borderRadius: 110, opacity: 0.8 }),
        shape(520, 185, 300, 300, "#d946ef", { borderRadius: 150, opacity: 0.6 }),
        text("SIGNAL / NOISE", 70, 70, 350, 35, {
          fontSize: 15,
          fontWeight: 800,
          letterSpacing: 5,
          color: "#67e8f9",
          zIndex: 3,
        }),
        text("The Future Is Already Weird", 70, 145, 690, 190, {
          fontSize: 70,
          fontWeight: 900,
          letterSpacing: -2,
          lineHeight: 0.93,
          color: "#ffffff",
          zIndex: 3,
        }),
        text("Ideas, technology, and culture from slightly ahead of the curve.", 75, 380, 560, 70, {
          fontSize: 22,
          color: "#d8b4fe",
          lineHeight: 1.4,
          zIndex: 3,
        }),
        image(70, 520, 760, 330, "Replace with futuristic feature image", {
          borderRadius: 4,
          borderWidth: 2,
          borderColor: "#22d3ee",
          zIndex: 3,
        }),
        shape(70, 905, 760, 2, "#d946ef", { zIndex: 3 }),
        text("YOUR OPENING TRANSMISSION", 70, 945, 380, 30, {
          fontSize: 14,
          fontWeight: 800,
          letterSpacing: 3,
          color: "#67e8f9",
          zIndex: 3,
        }),
        text("Replace this with the first paragraph of your post.", 70, 995, 600, 70, {
          fontSize: 22,
          color: "#e4e4e7",
          zIndex: 3,
        }),
      ],
    },
  },
  {
    id: "medium-minimal",
    name: "Medium Minimal",
    description: "A clean, typography-first layout in the style of Medium's default reading view.",
    category: "Minimal",
    accent: "#1a8917",
    document: {
      designWidth: 900,
      height: 1150,
      background: "#ffffff",
      elements: [
        image(70, 70, 56, 56, "Replace with your photo", { borderRadius: 28 }),
        text("Your Name · 6 min read", 140, 82, 400, 30, { fontSize: 16, color: "#6b6b6b" }),
        text("A Clear, Confident Headline for Your Story", 70, 150, 760, 150, {
          fontSize: 48,
          fontWeight: 800,
          fontFamily: "Georgia, serif",
          lineHeight: 1.08,
          color: "#242424",
        }),
        text(
          "A one-sentence subtitle that expands on the headline and pulls readers in.",
          70,
          310,
          700,
          60,
          {
            fontSize: 22,
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            color: "#6b6b6b",
          }
        ),
        shape(70, 400, 760, 1, "#e5e5e5"),
        image(70, 430, 760, 400, "Replace with a wide feature image", { borderRadius: 4 }),
        text(
          "Begin your story here. Medium-style posts favor generous line height, a comfortable reading width, and minimal visual clutter so the writing carries the page.",
          70,
          860,
          760,
          220,
          {
            fontSize: 21,
            lineHeight: 1.75,
            fontFamily: "Georgia, serif",
            color: "#242424",
          }
        ),
      ],
    },
  },
  {
    id: "long-form-essay",
    name: "Long-Form Essay",
    description: "Numbered sections and a pull quote for reflective, essay-style writing.",
    category: "Minimal",
    accent: "#374151",
    document: {
      designWidth: 900,
      height: 1075,
      background: "#fafafa",
      elements: [
        text("ESSAY", 70, 60, 200, 30, { fontSize: 13, fontWeight: 700, letterSpacing: 3, color: "#6b7280" }),
        text("On Taking the Long Way Around", 70, 110, 760, 140, {
          fontSize: 52,
          fontWeight: 800,
          fontFamily: "Georgia, serif",
          lineHeight: 1.05,
          color: "#111827",
        }),
        text("Your Name  ·  Published in Your Publication  ·  10 min read", 70, 270, 700, 30, {
          fontSize: 15,
          color: "#6b7280",
        }),
        shape(70, 320, 760, 1, "#e5e7eb"),
        text("I.", 70, 360, 60, 35, { fontSize: 22, fontWeight: 700, fontFamily: "Georgia, serif", color: "#111827" }),
        text(
          "Open with the scene, the question, or the moment that sets up everything that follows.",
          70,
          405,
          760,
          140,
          { fontSize: 20, lineHeight: 1.75, fontFamily: "Georgia, serif", color: "#242424" }
        ),
        text(
          "“A pull quote can restate your strongest idea and give readers a place to pause.”",
          130,
          570,
          640,
          120,
          {
            fontSize: 28,
            fontStyle: "italic",
            fontFamily: "Georgia, serif",
            align: "center",
            color: "#374151",
            lineHeight: 1.35,
          }
        ),
        text("II.", 70, 730, 60, 35, { fontSize: 22, fontWeight: 700, fontFamily: "Georgia, serif", color: "#111827" }),
        text(
          "Continue developing the argument or story here. Long-form essays benefit from clear section breaks like these.",
          70,
          775,
          760,
          180,
          { fontSize: 20, lineHeight: 1.75, fontFamily: "Georgia, serif", color: "#242424" }
        ),
      ],
    },
  },
  {
    id: "qa-interview",
    name: "Interview / Q&A",
    description: "Bold questions and readable answers for profile pieces and interviews.",
    category: "Interview",
    accent: "#b45309",
    document: {
      designWidth: 900,
      height: 950,
      background: "#fffaf0",
      elements: [
        image(70, 60, 110, 110, "Replace with subject photo", { borderRadius: 55 }),
        text("In Conversation With [Name]", 200, 70, 620, 90, { fontSize: 36, fontWeight: 800, color: "#111827" }),
        text("A short intro about who they are and why this conversation matters.", 200, 155, 600, 60, {
          fontSize: 17,
          color: "#6b7280",
          lineHeight: 1.5,
        }),
        shape(70, 210, 760, 1, "#e5e7eb"),
        text("Q: What first drew you to this work?", 70, 250, 760, 50, {
          fontSize: 22,
          fontWeight: 700,
          color: "#b45309",
        }),
        text(
          "Share the interviewee's answer here. Keep questions bold and answers in a lighter weight for easy scanning.",
          70,
          310,
          760,
          120,
          { fontSize: 19, lineHeight: 1.6, color: "#242424" }
        ),
        text("Q: What's the biggest lesson you've learned?", 70, 450, 760, 50, {
          fontSize: 22,
          fontWeight: 700,
          color: "#b45309",
        }),
        text("Add the second answer here.", 70, 510, 760, 120, { fontSize: 19, lineHeight: 1.6, color: "#242424" }),
        text("Q: What's next for you?", 70, 650, 760, 50, { fontSize: 22, fontWeight: 700, color: "#b45309" }),
        text("Add the third answer here.", 70, 710, 760, 120, { fontSize: 19, lineHeight: 1.6, color: "#242424" }),
      ],
    },
  },
  {
    id: "numbered-list",
    name: "Numbered List",
    description: "A scannable listicle layout with numbered points, popular for roundups and tips posts.",
    category: "List",
    accent: "#1d4ed8",
    document: {
      designWidth: 900,
      height: 1050,
      background: "#ffffff",
      elements: [
        text("LISTICLE", 70, 55, 200, 30, { fontSize: 13, fontWeight: 700, letterSpacing: 3, color: "#1d4ed8" }),
        text("5 Things I Wish I Knew Sooner", 70, 100, 760, 110, { fontSize: 46, fontWeight: 800, color: "#111827" }),
        text("A short intro paragraph framing why this list matters to the reader.", 70, 225, 760, 60, {
          fontSize: 19,
          color: "#4b5563",
          lineHeight: 1.5,
        }),
        text("1", 70, 320, 50, 50, { fontSize: 34, fontWeight: 800, color: "#1d4ed8" }),
        text("First point heading", 140, 325, 690, 35, { fontSize: 24, fontWeight: 700, color: "#111827" }),
        text("Explain the first point in a sentence or two.", 140, 365, 690, 60, {
          fontSize: 18,
          lineHeight: 1.5,
          color: "#374151",
        }),
        text("2", 70, 450, 50, 50, { fontSize: 34, fontWeight: 800, color: "#1d4ed8" }),
        text("Second point heading", 140, 455, 690, 35, { fontSize: 24, fontWeight: 700, color: "#111827" }),
        text("Explain the second point in a sentence or two.", 140, 495, 690, 60, {
          fontSize: 18,
          lineHeight: 1.5,
          color: "#374151",
        }),
        text("3", 70, 580, 50, 50, { fontSize: 34, fontWeight: 800, color: "#1d4ed8" }),
        text("Third point heading", 140, 585, 690, 35, { fontSize: 24, fontWeight: 700, color: "#111827" }),
        text("Explain the third point in a sentence or two.", 140, 625, 690, 60, {
          fontSize: 18,
          lineHeight: 1.5,
          color: "#374151",
        }),
        text("4", 70, 710, 50, 50, { fontSize: 34, fontWeight: 800, color: "#1d4ed8" }),
        text("Fourth point heading", 140, 715, 690, 35, { fontSize: 24, fontWeight: 700, color: "#111827" }),
        text("Explain the fourth point in a sentence or two.", 140, 755, 690, 60, {
          fontSize: 18,
          lineHeight: 1.5,
          color: "#374151",
        }),
        text("5", 70, 840, 50, 50, { fontSize: 34, fontWeight: 800, color: "#1d4ed8" }),
        text("Fifth point heading", 140, 845, 690, 35, { fontSize: 24, fontWeight: 700, color: "#111827" }),
        text("Explain the fifth point in a sentence or two.", 140, 885, 690, 60, {
          fontSize: 18,
          lineHeight: 1.5,
          color: "#374151",
        }),
      ],
    },
  },
];

export const TEMPLATE_CATEGORIES: Array<"All" | CanvasTemplateCategory> = [
  "All",
  "Blank",
  "Minimal",
  "Editorial",
  "Personal",
  "Interview",
  "List",
  "Travel",
  "Food",
  "Portfolio",
  "Creative",
];

export function instantiateCanvasTemplate(templateId: string): CanvasDoc {
  const template = CANVAS_TEMPLATES.find((item) => item.id === templateId);
  if (!template) return createEmptyCanvas();
  return {
    ...structuredClone(template.document),
    elements: template.document.elements.map((item) => ({
      ...structuredClone(item),
      id: createCanvasId(),
    })),
  };
}
