const tools = [
  {name:"ChatGPT",maker:"OpenAI",category:"Writing",initials:"C",tone:"",description:"Brainstorm, write, analyze files, learn new topics and work through complex ideas.",price:"Free tier",url:"https://chatgpt.com/",featured:1,tags:"assistant writing research productivity"},
  {name:"Claude",maker:"Anthropic",category:"Writing",initials:"A",tone:"logo-orange",description:"Work with long documents, thoughtful writing, analysis and structured problem-solving.",price:"Free tier",url:"https://claude.ai/",featured:2,tags:"assistant writing documents analysis"},
  {name:"Gemini",maker:"Google",category:"Writing",initials:"G",tone:"logo-blue",description:"Explore ideas, draft content and get help across writing, learning and everyday tasks.",price:"Free tier",url:"https://gemini.google.com/",featured:3,tags:"assistant writing google productivity"},
  {name:"Perplexity",maker:"Perplexity AI",category:"Research",initials:"P",tone:"logo-green",description:"Research questions with linked sources and follow-up exploration.",price:"Free tier",url:"https://www.perplexity.ai/",featured:4,tags:"search research sources answers"},
  {name:"Midjourney",maker:"Midjourney",category:"Design",initials:"M",tone:"",description:"Generate distinctive images from text prompts and creative direction.",price:"Paid plans",url:"https://www.midjourney.com/",featured:5,tags:"image art illustration visual"},
  {name:"Canva",maker:"Canva",category:"Design",initials:"Ca",tone:"logo-blue",description:"Create presentations, social graphics and visual content with built-in AI features.",price:"Free tier",url:"https://www.canva.com/",featured:6,tags:"design graphics presentation image"},
  {name:"Runway",maker:"Runway AI",category:"Video",initials:"R",tone:"logo-pink",description:"Explore AI-powered video generation and creative video editing workflows.",price:"Free tier",url:"https://runwayml.com/",featured:7,tags:"video generation editing film"},
  {name:"ElevenLabs",maker:"ElevenLabs",category:"Audio",initials:"11",tone:"logo-orange",description:"Create AI voices, text-to-speech and audio experiences.",price:"Free tier",url:"https://elevenlabs.io/",featured:8,tags:"audio voice speech narration"},
  {name:"GitHub Copilot",maker:"GitHub",category:"Coding",initials:"⌘",tone:"logo-green",description:"Get coding assistance for writing, understanding and improving software.",price:"Free tier",url:"https://github.com/features/copilot",featured:9,tags:"coding developer code programming"},
  {name:"Notion AI",maker:"Notion",category:"Productivity",initials:"N",tone:"",description:"Bring AI assistance into notes, knowledge work and team workflows.",price:"Plan dependent",url:"https://www.notion.so/product/ai",featured:10,tags:"notes productivity writing workflow"},
  {name:"Zapier",maker:"Zapier",category:"Productivity",initials:"Z",tone:"logo-orange",description:"Connect apps and automate repetitive tasks with no-code workflows.",price:"Free tier",url:"https://zapier.com/",featured:11,tags:"automation productivity workflow integrations"},
  {name:"Descript",maker:"Descript",category:"Video",initials:"D",tone:"logo-pink",description:"Edit audio and video with transcript-based tools and AI-assisted features.",price:"Free tier",url:"https://www.descript.com/",featured:12,tags:"video audio editing podcast transcript"},
  {name:"NotebookLM",maker:"Google",category:"Research",initials:"N",tone:"logo-blue",description:"Explore your own sources, generate study guides and ask questions grounded in uploaded materials.",price:"Check plans",url:"https://notebooklm.google.com/",featured:13,tags:"research sources notes study guide documents"},
  {name:"Elicit",maker:"Elicit",category:"Research",initials:"E",tone:"logo-green",description:"Assist literature reviews and organize findings from academic papers.",price:"Check plans",url:"https://elicit.com/",featured:14,tags:"research academic papers literature review science"},
  {name:"Consensus",maker:"Consensus",category:"Research",initials:"Co",tone:"logo-blue",description:"Search research papers and explore evidence-based answers to questions.",price:"Check plans",url:"https://consensus.app/",featured:15,tags:"research science evidence papers citations"},
  {name:"Adobe Firefly",maker:"Adobe",category:"Design",initials:"Af",tone:"logo-orange",description:"Explore generative image and design features in Adobe's creative ecosystem.",price:"Check plans",url:"https://firefly.adobe.com/",featured:16,tags:"image design generative fill creative"},
  {name:"Ideogram",maker:"Ideogram",category:"Design",initials:"I",tone:"logo-pink",description:"Generate images and explore visual concepts, including text-forward designs.",price:"Check plans",url:"https://ideogram.ai/",featured:17,tags:"image design typography poster art"},
  {name:"Leonardo AI",maker:"Leonardo",category:"Design",initials:"L",tone:"logo-green",description:"Create and iterate on AI-generated visuals for creative projects.",price:"Check plans",url:"https://leonardo.ai/",featured:18,tags:"image art game assets design generation"},
  {name:"Pika",maker:"Pika",category:"Video",initials:"Pk",tone:"logo-pink",description:"Explore generative video effects and text- or image-driven video creation.",price:"Check plans",url:"https://pika.art/",featured:19,tags:"video generation effects animation"},
  {name:"Luma Dream Machine",maker:"Luma AI",category:"Video",initials:"Lu",tone:"logo-blue",description:"Explore AI video generation from creative prompts and visual references.",price:"Check plans",url:"https://lumalabs.ai/dream-machine",featured:20,tags:"video generation cinematic animation"},
  {name:"Suno",maker:"Suno",category:"Audio",initials:"Su",tone:"logo-orange",description:"Explore AI-assisted music creation from text prompts and ideas.",price:"Check plans",url:"https://suno.com/",featured:21,tags:"music audio song generation"},
  {name:"Udio",maker:"Udio",category:"Audio",initials:"Ud",tone:"logo-pink",description:"Experiment with AI music creation and song concepts.",price:"Check plans",url:"https://www.udio.com/",featured:22,tags:"music audio song composition"},
  {name:"Cursor",maker:"Cursor",category:"Coding",initials:"Cu",tone:"logo-green",description:"Use an AI-focused code editor to navigate, write and refactor code.",price:"Check plans",url:"https://cursor.com/",featured:23,tags:"coding editor developer refactor programming"},
  {name:"Replit",maker:"Replit",category:"Coding",initials:"Re",tone:"logo-orange",description:"Build and run software projects in a browser-based development environment with AI assistance.",price:"Check plans",url:"https://replit.com/",featured:24,tags:"coding app builder deploy developer"},
  {name:"v0",maker:"Vercel",category:"Coding",initials:"v0",tone:"logo-blue",description:"Generate and iterate on web interface ideas with AI-assisted development.",price:"Check plans",url:"https://v0.dev/",featured:25,tags:"coding ui website frontend react"},
  {name:"Gamma",maker:"Gamma",category:"Productivity",initials:"Ga",tone:"logo-orange",description:"Create and refine presentations and other visual documents with AI assistance.",price:"Check plans",url:"https://gamma.app/",featured:26,tags:"presentation slides documents productivity"},
  {name:"Make",maker:"Make",category:"Productivity",initials:"Ma",tone:"logo-pink",description:"Connect apps and build visual automation workflows across services.",price:"Check plans",url:"https://www.make.com/",featured:27,tags:"automation integrations workflow no-code"},
  {name:"Grammarly",maker:"Grammarly",category:"Writing",initials:"Gr",tone:"logo-green",description:"Review writing for clarity, tone and correctness with AI-assisted writing features.",price:"Check plans",url:"https://www.grammarly.com/",featured:28,tags:"writing grammar editing clarity communication"},
  {name:"DeepL Write",maker:"DeepL",category:"Writing",initials:"De",tone:"logo-blue",description:"Improve phrasing, tone and clarity in written text.",price:"Check plans",url:"https://www.deepl.com/write",featured:29,tags:"writing rewrite editing language translation"},
  {name:"Otter",maker:"Otter.ai",category:"Productivity",initials:"Ot",tone:"logo-blue",description:"Explore AI meeting transcription, notes and conversation summaries.",price:"Check plans",url:"https://otter.ai/",featured:30,tags:"meeting notes transcription summary productivity"}
];

const grid = document.querySelector("#tool-grid");
const searchInput = document.querySelector("#search-input");
const count = document.querySelector("#results-count");
const emptyState = document.querySelector("#empty-state");
const categoryTabs = document.querySelector("#category-tabs");
const sortSelect = document.querySelector("#sort-select");
let activeCategory = "All";
let query = "";
let sortMode = "featured";
let budgetMode = "any";
function loadSavedTools() {
  try {
    const stored = JSON.parse(localStorage.getItem("ai-factory:saved-tools") || "[]");
    return new Set(Array.isArray(stored) ? stored.filter(name => tools.some(tool => tool.name === name)) : []);
  } catch {
    return new Set();
  }
}
const savedTools = loadSavedTools();
function persistSavedTools() {
  try {
    localStorage.setItem("ai-factory:saved-tools", JSON.stringify([...savedTools]));
  } catch {
    // Saving remains available for the current page session if storage is blocked.
  }
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
function toolCard(tool) {
  const saved = savedTools.has(tool.name);
  return `<article class="tool-card">
    <div class="tool-card-top">
      <div class="tool-logo ${escapeHTML(tool.tone)}" aria-hidden="true">${escapeHTML(tool.initials)}</div>
      <div class="tool-title-wrap"><h3 class="tool-title">${escapeHTML(tool.name)}</h3><div class="tool-maker">${escapeHTML(tool.maker)}</div></div>
      <button class="save-tool" type="button" data-save="${escapeHTML(tool.name)}" aria-label="${saved ? "Remove" : "Save"} ${escapeHTML(tool.name)} ${saved ? "from" : "to"} saved tools" aria-pressed="${saved}">${saved ? "♥" : "♡"}</button>
    </div>
    <p class="tool-description">${escapeHTML(tool.description)}</p>
    <div class="tool-card-bottom"><div class="tool-meta"><span class="tool-category">${escapeHTML(tool.category)}</span><span class="tool-price">${escapeHTML(tool.price)}</span></div><a class="visit-link" href="${escapeHTML(tool.url)}" target="_blank" rel="noopener noreferrer">Visit site <span aria-hidden="true">↗</span></a></div>
  </article>`;
}
function renderTools() {
  const normalized = query.trim().toLowerCase();
  let filtered = tools.filter(tool => {
    const categoryMatch = activeCategory === "All" || (activeCategory === "Saved" ? savedTools.has(tool.name) : tool.category === activeCategory);
    const searchable = [tool.name,tool.maker,tool.category,tool.description,tool.tags].join(" ").toLowerCase();
    const budgetMatch = budgetMode !== "free" || tool.price === "Free tier";
    return categoryMatch && budgetMatch && (!normalized || searchable.includes(normalized));
  });
  if (sortMode === "az") filtered.sort((a,b) => a.name.localeCompare(b.name));
  else filtered.sort((a,b) => a.featured - b.featured);
  grid.innerHTML = filtered.map(toolCard).join("");
  grid.hidden = filtered.length === 0;
  emptyState.hidden = filtered.length !== 0;
  count.textContent = `${filtered.length} ${filtered.length === 1 ? "tool" : "tools"} to explore`;
}
document.querySelector("#finder-form").addEventListener("submit", event => {
  event.preventDefault();
  const goal = document.querySelector("#finder-goal").value;
  budgetMode = document.querySelector("#finder-budget").value;
  query = "";
  searchInput.value = "";
  sortMode = "featured";
  sortSelect.value = "featured";
  const targetCategory = categoryTabs.querySelector(`[data-category="${goal}"]`);
  if (targetCategory) targetCategory.click();
  else categoryTabs.querySelector('[data-category="All"]').click();
  const matches = tools.filter(tool =>
    (goal === "All" || tool.category === goal) &&
    (budgetMode !== "free" || tool.price === "Free tier")
  );
  const feedback = document.querySelector("#finder-feedback");
  feedback.textContent = matches.length
    ? `Your shortlist has ${matches.length} ${matches.length === 1 ? "tool" : "tools"}. Pricing labels are indicative—confirm current plans on each official site.`
    : "No exact matches in this starter directory yet. Try another task or show all pricing labels.";
  document.querySelector("#explore").scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
  });
});
document.querySelector("#hero-search").addEventListener("submit", event => {
  event.preventDefault();
  query = searchInput.value;
  renderTools();
  document.querySelector("#explore").scrollIntoView({behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"});
});
searchInput.addEventListener("input", () => { query = searchInput.value; renderTools(); });
document.querySelectorAll("[data-search]").forEach(button => button.addEventListener("click", () => {
  searchInput.value = button.dataset.search;
  query = button.dataset.search;
  renderTools();
  document.querySelector("#explore").scrollIntoView({behavior:"smooth"});
}));
categoryTabs.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  categoryTabs.querySelectorAll(".category-tab").forEach(tab => {
    const active = tab === button;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-pressed", String(active));
  });
  renderTools();
});
sortSelect.addEventListener("change", () => { sortMode = sortSelect.value; renderTools(); });
grid.addEventListener("click", event => {
  const button = event.target.closest("[data-save]");
  if (!button) return;
  const name = button.dataset.save;
  if (savedTools.has(name)) savedTools.delete(name); else savedTools.add(name);
  persistSavedTools();
  renderTools();
});
document.querySelectorAll("[data-category-jump]").forEach(button => button.addEventListener("click", () => {
  activeCategory = button.dataset.categoryJump;
  const tab = categoryTabs.querySelector(`[data-category="${activeCategory}"]`);
  if (tab) tab.click();
  document.querySelector("#explore").scrollIntoView({behavior:"smooth"});
}));
document.querySelector("#reset-filters").addEventListener("click", () => {
  query = ""; activeCategory = "All"; sortMode = "featured"; searchInput.value = ""; sortSelect.value = "featured";
  const allTab = categoryTabs.querySelector('[data-category="All"]');
  allTab.click();
});
const menuToggle = document.querySelector("#menu-toggle");
const nav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open"); menuToggle.setAttribute("aria-expanded","false");
}));
document.querySelector("#year").textContent = String(new Date().getFullYear());
renderTools();
