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
  {name:"Otter",maker:"Otter.ai",category:"Productivity",initials:"Ot",tone:"logo-blue",description:"Explore AI meeting transcription, notes and conversation summaries.",price:"Check plans",url:"https://otter.ai/",featured:30,tags:"meeting notes transcription summary productivity"},
  {name:"Writesonic",maker:"Writesonic",category:"Writing",initials:"W",tone:"logo-green",description:"Explore AI-assisted marketing copy, articles and content workflows.",price:"Check plans",url:"https://writesonic.com/",featured:31,tags:"writing blog marketing seo copy"},
  {name:"Jasper",maker:"Jasper",category:"Writing",initials:"J",tone:"logo-orange",description:"Create and organize brand-focused marketing content with AI assistance.",price:"Check plans",url:"https://www.jasper.ai/",featured:32,tags:"writing marketing brand copy campaigns"},
  {name:"QuillBot",maker:"QuillBot",category:"Writing",initials:"Q",tone:"logo-blue",description:"Paraphrase, summarize and review writing with language tools.",price:"Free tier",url:"https://quillbot.com/",featured:33,tags:"writing paraphrase grammar summarize"},
  {name:"Hugging Face",maker:"Hugging Face",category:"Research",initials:"HF",tone:"logo-yellow",description:"Explore open machine-learning models, datasets and interactive demos.",price:"Free tier",url:"https://huggingface.co/",featured:34,tags:"research models open source machine learning datasets"},
  {name:"SciSpace",maker:"SciSpace",category:"Research",initials:"Sc",tone:"logo-blue",description:"Read and understand scientific papers with AI-assisted research tools.",price:"Check plans",url:"https://scispace.com/",featured:35,tags:"research academic papers science explain"},
  {name:"Krea",maker:"Krea AI",category:"Design",initials:"Kr",tone:"logo-pink",description:"Explore real-time visual generation and creative image workflows.",price:"Check plans",url:"https://www.krea.ai/",featured:36,tags:"design image generation creative realtime"},
  {name:"Playground",maker:"Playground",category:"Design",initials:"Pl",tone:"logo-green",description:"Create and edit AI-assisted visual concepts and graphics.",price:"Check plans",url:"https://playground.com/",featured:37,tags:"design image art graphics generation"},
  {name:"Remove.bg",maker:"Kaleido",category:"Design",initials:"R",tone:"logo-blue",description:"Remove image backgrounds quickly for product photos and portraits.",price:"Free limited",url:"https://www.remove.bg/",featured:38,tags:"image background remove photo transparent"},
  {name:"Photoroom",maker:"Photoroom",category:"Design",initials:"Ph",tone:"logo-orange",description:"Prepare product images, backgrounds and marketing visuals.",price:"Free tier",url:"https://www.photoroom.com/",featured:39,tags:"image product photos background ecommerce design"},
  {name:"CapCut",maker:"ByteDance",category:"Video",initials:"CC",tone:"logo-pink",description:"Edit short-form videos with templates, captions and AI-assisted tools.",price:"Free tier",url:"https://www.capcut.com/",featured:40,tags:"video editing shorts captions reels social"},
  {name:"VEED",maker:"VEED",category:"Video",initials:"V",tone:"logo-blue",description:"Edit videos online and explore subtitles, translation and AI video features.",price:"Check plans",url:"https://www.veed.io/",featured:41,tags:"video subtitles captions editing translate"},
  {name:"InVideo AI",maker:"InVideo",category:"Video",initials:"Iv",tone:"logo-orange",description:"Turn prompts and scripts into video drafts with AI-assisted workflows.",price:"Check plans",url:"https://invideo.io/",featured:42,tags:"video text to video script creator"},
  {name:"HeyGen",maker:"HeyGen",category:"Video",initials:"Hg",tone:"logo-green",description:"Create presenter-style videos and explore AI avatar workflows.",price:"Check plans",url:"https://www.heygen.com/",featured:43,tags:"video avatar presenter translation"},
  {name:"Adobe Podcast",maker:"Adobe",category:"Audio",initials:"Ap",tone:"logo-orange",description:"Improve spoken-audio clarity and prepare podcast recordings.",price:"Check plans",url:"https://podcast.adobe.com/",featured:44,tags:"audio podcast voice enhance speech"},
  {name:"Auphonic",maker:"Auphonic",category:"Audio",initials:"Au",tone:"logo-blue",description:"Automate audio leveling, noise reduction and podcast post-production.",price:"Free tier",url:"https://auphonic.com/",featured:45,tags:"audio podcast cleanup noise leveling"},
  {name:"Windsurf",maker:"Windsurf",category:"Coding",initials:"Wi",tone:"logo-green",description:"Explore an AI-powered development environment for building and editing code.",price:"Check plans",url:"https://windsurf.com/",featured:46,tags:"coding developer ide agent"},
  {name:"Lovable",maker:"Lovable",category:"Coding",initials:"Lo",tone:"logo-pink",description:"Prototype web apps from natural-language ideas and iterate on a working project.",price:"Check plans",url:"https://lovable.dev/",featured:47,tags:"coding app builder prototype full stack"},
  {name:"Bolt.new",maker:"StackBlitz",category:"Coding",initials:"B",tone:"logo-orange",description:"Prototype web applications from prompts in a browser-based development workspace.",price:"Check plans",url:"https://bolt.new/",featured:48,tags:"coding app builder web prototype"},
  {name:"Krisp",maker:"Krisp",category:"Audio",initials:"Kr",tone:"logo-green",description:"Reduce background noise and improve clarity in calls and recorded audio.",price:"Check plans",url:"https://krisp.ai/",featured:49,tags:"audio noise cancellation meetings voice"},
  {name:"Framer",maker:"Framer",category:"Design",initials:"Fr",tone:"logo-blue",description:"Design and publish responsive websites with visual editing and AI-assisted starting points.",price:"Check plans",url:"https://www.framer.com/",featured:50,tags:"design website builder landing page no code"}
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
let showAllTools = false;
const INITIAL_TOOL_LIMIT = 8;
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
const TOOL_DETAIL_PATHS = {
  "ChatGPT":"tool-chatgpt.html", "Claude":"tool-claude.html", "Gemini":"tool-gemini.html",
  "Perplexity":"tool-perplexity.html", "Canva":"tool-canva.html", "CapCut":"tool-capcut.html",
  "Runway":"tool-runway.html", "ElevenLabs":"tool-elevenlabs.html",
  "GitHub Copilot":"tool-github-copilot.html", "NotebookLM":"tool-notebooklm.html"
};

function toolCard(tool) {
  const saved = savedTools.has(tool.name);
  return `<article class="tool-card">
    <div class="tool-card-top">
      <div class="tool-logo ${escapeHTML(tool.tone)}" aria-hidden="true"><img src="https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(tool.url)}&amp;sz=128" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span hidden>${escapeHTML(tool.initials)}</span></div>
      <div class="tool-title-wrap"><h3 class="tool-title">${TOOL_DETAIL_PATHS[tool.name] ? `<a class="tool-detail-link" href="${TOOL_DETAIL_PATHS[tool.name]}">${escapeHTML(tool.name)} <span aria-hidden="true">↗</span></a>` : escapeHTML(tool.name)}</h3><div class="tool-maker">${escapeHTML(tool.maker)}</div></div>
      <button class="save-tool" type="button" data-save="${escapeHTML(tool.name)}" aria-label="${saved ? "Remove" : "Save"} ${escapeHTML(tool.name)} ${saved ? "from" : "to"} saved tools" aria-pressed="${saved}">${saved ? "♥" : "♡"}</button>
    </div>
    <p class="tool-description">${escapeHTML(tool.description)}</p>
    <div class="tool-card-bottom"><div class="tool-meta"><span class="tool-category">${escapeHTML(tool.category)}</span><span class="tool-price">${escapeHTML(tool.price)}</span></div><a class="visit-link" href="${escapeHTML(tool.url)}" target="_blank" rel="noopener noreferrer">Visit site <span aria-hidden="true">↗</span></a></div>
  </article>`;
}
const SEARCH_STOP_WORDS = new Set(["ai","tool","tools","best","for","the","a","an","to","with","and","of"]);
const SEARCH_ALIASES = {
  write:["writing","writer","text","content"], writing:["write","writer","text","content"],
  image:["images","picture","pictures","design","art"], pictures:["image","images","photo","design"],
  generator:["generate","create","creation","builder"], generate:["generator","create","creation"],
  maker:["create","creator","generator","builder"], create:["creator","make","maker","generator"],
  video:["videos","clip","clips","editing","editor"], clips:["clip","video","videos"],
  edit:["editing","editor","video"], editing:["edit","editor","video"],
  code:["coding","developer","programming"], coding:["code","developer","programming"],
  build:["builder","coding","website","app"], website:["websites","site","builder","design"],
  research:["search","sources","papers","study"], search:["research","sources","find"],
  voice:["audio","speech","music"], speech:["voice","audio","transcription"],
  automation:["automate","workflow","productivity"], automate:["automation","workflow"],
  free:["free tier","no cost","free plan"], gratis:["free","free tier"],
  translate:["translation","language","translator"], translation:["translate","translator","language"],
  summary:["summarize","summarization","documents"], summarize:["summary","summarization","documents"],
  background:["remove background","image","photo"], resume:["cv","writing","document"],
  presentation:["slides","deck","pitch"], slides:["presentation","deck"]
};
function searchTermMatches(term, searchable) {
  const variants = [term, ...(SEARCH_ALIASES[term] || [])];
  return variants.some(variant => searchable.includes(variant));
}
function renderTools() {
  const normalized = query.trim().toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, " ").replace(/\s+/g, " ").trim();
  const terms = normalized.split(" ").filter(term => term && !SEARCH_STOP_WORDS.has(term));
  let filtered = tools.filter(tool => {
    const categoryMatch = activeCategory === "All" || (activeCategory === "Saved" ? savedTools.has(tool.name) : tool.category === activeCategory);
    const searchable = [tool.name,tool.maker,tool.category,tool.description,tool.tags,tool.price].join(" ").toLowerCase();
    const budgetMatch = budgetMode !== "free" || /^Free/i.test(tool.price);
    const queryMatch = !terms.length || terms.every(term => searchTermMatches(term, searchable));
    return categoryMatch && budgetMatch && queryMatch;
  });
  if (sortMode === "az") filtered.sort((a,b) => a.name.localeCompare(b.name));
  else if (sortMode === "free") filtered.sort((a,b) => Number(!/^Free/i.test(a.price)) - Number(!/^Free/i.test(b.price)) || a.featured - b.featured);
  else filtered.sort((a,b) => a.featured - b.featured);
  const visibleTools = showAllTools ? filtered : filtered.slice(0, INITIAL_TOOL_LIMIT);
  grid.innerHTML = visibleTools.map(toolCard).join("");
  grid.hidden = filtered.length === 0;
  emptyState.hidden = filtered.length !== 0;
  count.textContent = `${filtered.length} ${filtered.length === 1 ? "tool" : "tools"}${filtered.length > visibleTools.length ? ` · showing ${visibleTools.length}` : ""}`;
  const showMore = document.querySelector("#show-more-tools");
  showMore.hidden = filtered.length <= INITIAL_TOOL_LIMIT;
  showMore.setAttribute("aria-expanded", String(showAllTools));
  showMore.innerHTML = showAllTools ? "Show fewer tools <span aria-hidden=\"true\">↑</span>" : `Show all ${filtered.length} tools <span aria-hidden="true">↓</span>`;
}
document.querySelector("#finder-form").addEventListener("submit", event => {
  event.preventDefault();
  const goal = document.querySelector("#finder-goal").value;
  budgetMode = document.querySelector("#finder-budget").value;
  showAllTools = false;
  query = "";
  searchInput.value = "";
  sortMode = "featured";
  sortSelect.value = "featured";
  const targetCategory = categoryTabs.querySelector(`[data-category="${goal}"]`);
  if (targetCategory) targetCategory.click();
  else categoryTabs.querySelector('[data-category="All"]').click();
  const matches = tools.filter(tool =>
    (goal === "All" || tool.category === goal) &&
    (budgetMode !== "free" || /^Free/i.test(tool.price))
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
  showAllTools = false;
  const crossPromo = document.getElementById("cross-promo");
const crossPromoClose = document.getElementById("cross-promo-close");
if (crossPromo && crossPromoClose) {
  const dismissedKey = "ai-factory-cross-promo-dismissed";
  let promoShown = false;
  const showCrossPromo = () => {
    if (promoShown) return;
    promoShown = true;
    crossPromo.hidden = false;
    crossPromo.classList.add("is-visible");
  };
  try {
    if (sessionStorage.getItem(dismissedKey) !== "1") {
      crossPromo.hidden = true;
      const revealAfterDelay = window.setTimeout(showCrossPromo, 20000);
      const revealOnScroll = () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollable > 0 && window.scrollY / scrollable >= 0.55) {
          window.clearTimeout(revealAfterDelay);
          showCrossPromo();
          window.removeEventListener("scroll", revealOnScroll);
        }
      };
      window.addEventListener("scroll", revealOnScroll, {passive:true});
      crossPromoClose.addEventListener("click", () => {
        crossPromo.classList.remove("is-visible");
        crossPromo.hidden = true;
        window.clearTimeout(revealAfterDelay);
        window.removeEventListener("scroll", revealOnScroll);
        try { sessionStorage.setItem(dismissedKey, "1"); } catch {}
      });
    } else {
      crossPromo.hidden = true;
    }
  } catch {
    // If session storage is unavailable, still allow a delayed, dismissible promo.
    window.setTimeout(showCrossPromo, 20000);
    crossPromoClose.addEventListener("click", () => {
      crossPromo.classList.remove("is-visible");
      crossPromo.hidden = true;
    });
  }
}


renderTools();
  document.querySelector("#explore").scrollIntoView({behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"});
});
searchInput.addEventListener("input", () => { query = searchInput.value; showAllTools = false; renderTools(); });
document.querySelectorAll("[data-search]").forEach(button => button.addEventListener("click", () => {
  searchInput.value = button.dataset.search;
  query = button.dataset.search;
  showAllTools = false;
  renderTools();
  document.querySelector("#explore").scrollIntoView({behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"});
}));
categoryTabs.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  showAllTools = false;
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
document.querySelectorAll("[data-quick-category]").forEach(button => button.addEventListener("click", () => {
  const target = categoryTabs.querySelector('[data-category="' + button.dataset.quickCategory + '"]');
  if (target) target.click();
  document.querySelector("#explore").scrollIntoView({behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block:"start"});
}));
document.querySelectorAll("[data-quick-filter]").forEach(button => button.addEventListener("click", () => {
  budgetMode = button.dataset.quickFilter === "free" ? "free" : "any";
  query = ""; searchInput.value = ""; showAllTools = false;
  categoryTabs.querySelector('[data-category="All"]').click();
  document.querySelector("#finder-budget").value = budgetMode;
  document.querySelector("#finder-feedback").textContent = budgetMode === "free" ? "Showing tools with a listed free tier. Check each official site for current limits." : "No account needed. Your choices stay in this browser.";
  document.querySelector("#explore").scrollIntoView({behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block:"start"});
}));
document.querySelectorAll("[data-category-jump]").forEach(button => button.addEventListener("click", () => {
  activeCategory = button.dataset.categoryJump;
  const tab = categoryTabs.querySelector(`[data-category="${activeCategory}"]`);
  if (tab) tab.click();
  document.querySelector("#explore").scrollIntoView({behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block:"start"});
}));
document.querySelector("#reset-filters").addEventListener("click", () => {
  query = ""; activeCategory = "All"; sortMode = "featured"; budgetMode = "any"; showAllTools = false;
  searchInput.value = ""; sortSelect.value = "featured";
  document.querySelector("#finder-budget").value = "any";
  document.querySelector("#finder-goal").value = "All";
  document.querySelector("#finder-feedback").textContent = "No account needed. Your choices stay in this browser.";
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
document.querySelector("#show-more-tools").addEventListener("click", () => {
  showAllTools = !showAllTools;
  renderTools();
  if (!showAllTools) document.querySelector("#explore").scrollIntoView({behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block:"start"});
});
document.querySelector("#year").textContent = String(new Date().getFullYear());
const compareSelects = ["compare-one","compare-two","compare-three"].map(id => document.getElementById(id));
const compareResults = document.getElementById("compare-results");
function populateCompareSelects() {
  const sortedTools = [...tools].sort((a,b) => a.name.localeCompare(b.name));
  compareSelects.forEach((select,index) => {
    const placeholder = index === 2 ? '<option value="">Skip third tool</option>' : '<option value="">Choose a tool…</option>';
    select.innerHTML = placeholder + sortedTools.map(tool => '<option value="' + escapeHTML(tool.name) + '">' + escapeHTML(tool.name) + '</option>').join("");
  });
  if (tools.some(tool => tool.name === "ChatGPT")) compareSelects[0].value = "ChatGPT";
  if (tools.some(tool => tool.name === "Claude")) compareSelects[1].value = "Claude";
}
function renderComparison() {
  const selectedNames = [...new Set(compareSelects.map(select => select.value).filter(Boolean))];
  const selected = selectedNames.map(name => tools.find(tool => tool.name === name)).filter(Boolean);
  if (!selected.length) {
    compareResults.innerHTML = "<p>Select at least one tool to compare.</p>";
    return;
  }
  const rows = [
    ["Category",tool => tool.category],
    ["Provider",tool => tool.maker],
    ["Pricing label",tool => tool.price],
    ["What it does",tool => tool.description],
    ["Tags",tool => tool.tags.split(" ").join(", ")],
    ["Official website",tool => '<a href="' + escapeHTML(tool.url) + '" target="_blank" rel="noopener noreferrer">Visit official site ↗</a>']
  ];
  compareResults.innerHTML = '<table class="compare-table"><thead><tr><th scope="col">Feature</th>' + selected.map(tool => '<th scope="col">' + escapeHTML(tool.name) + '</th>').join("") + '</tr></thead><tbody>' + rows.map(([label,getter]) => '<tr><th scope="row">' + escapeHTML(label) + '</th>' + selected.map(tool => '<td>' + (label === "Official website" ? getter(tool) : escapeHTML(getter(tool))) + '</td>').join("") + '</tr>').join("") + '</tbody></table><p class="directory-note">This is a directory-level comparison, not an independent performance benchmark. Confirm current plans and features on official sites.</p>';
}
compareSelects.forEach(select => select.addEventListener("change", renderComparison));
populateCompareSelects();
renderComparison();

const promptForm = document.getElementById("prompt-form");
const promptOutput = document.getElementById("prompt-output");
const promptCopy = document.getElementById("prompt-copy");
const promptDownload = document.getElementById("prompt-download");
const promptFeedback = document.getElementById("prompt-feedback");
const promptTemplates = {
  shorts: {role:"You are an experienced short-form video scriptwriter.",task:"Write a YouTube Shorts script with a strong opening hook, a clear progression, concise spoken lines, suggested on-screen text, and a memorable ending. Include a scene-by-scene outline and an estimated duration."},
  blog: {role:"You are an experienced editor and content strategist.",task:"Create a useful blog article outline with a specific reader problem, a clear title, logical H2/H3 sections, practical examples, an FAQ, and suggestions for sources to verify. Do not invent facts or citations."},
  image: {role:"You are a professional visual art director.",task:"Write a detailed image-generation prompt covering the subject, setting, composition, lighting, visual style, color palette, camera/framing, aspect ratio, and elements to avoid. Keep text in the image minimal unless explicitly requested."},
  research: {role:"You are a careful research planner.",task:"Create a research plan with the key questions, reliable source types to consult, a method to cross-check claims, relevant dates, uncertainties, and a concise final-report structure. Never fabricate sources or present unverified claims as facts."},
  website: {role:"You are a senior product planner and web quality engineer.",task:"Turn the idea into a practical website project plan with user needs, core pages, features, accessibility, responsive behavior, SEO, privacy, security, test cases, acceptance criteria, and a low-cost implementation sequence. Separate confirmed requirements from assumptions."},
  social: {role:"You are a social media content strategist.",task:"Draft a platform-appropriate social post with a strong first line, useful main message, clear call to action, and relevant optional hashtags. Avoid misleading claims, engagement bait, and unsupported statistics."}
};
promptForm.addEventListener("submit",event=>{
  event.preventDefault();
  const template = promptTemplates[document.getElementById("prompt-task").value];
  const audience = document.getElementById("prompt-audience").value.trim();
  const tone = document.getElementById("prompt-tone").value.trim();
  const details = document.getElementById("prompt-details").value.trim();
  promptOutput.value = [template.role,template.task,audience ? "Target audience: " + audience + "." : "",tone ? "Tone or style: " + tone + "." : "",details ? "Project details and constraints:\n" + details : "", "Quality requirements: Be specific and practical. State assumptions clearly, ask for missing critical information when needed, and do not invent facts, sources, results, or capabilities.", "Output format: Use clear headings and actionable steps. Finish with a short checklist the user can apply."].filter(Boolean).join("\n\n");
  promptCopy.disabled = false;
  promptDownload.disabled = false;
  promptFeedback.textContent = "Prompt ready. Copy it into your preferred AI tool; this website has not run the prompt.";
});
promptCopy.addEventListener("click",async()=>{
  try {
    await navigator.clipboard.writeText(promptOutput.value);
    promptFeedback.textContent = "Prompt copied to clipboard.";
  } catch {
    promptOutput.focus(); promptOutput.select();
    promptFeedback.textContent = "Automatic copy was blocked by your browser. The prompt is selected; use Copy from your device menu.";
  }
});
promptDownload.addEventListener("click",()=>{
  const blob = new Blob([promptOutput.value],{type:"text/plain;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url; link.download = "ai-factory-prompt.txt"; link.click();
  URL.revokeObjectURL(url);
});


renderTools();
