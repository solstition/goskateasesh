// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
  UNOBTAINABLE: ["Cool S", "Shredded"],
  EXCLUDED_COLLECTIONS: ["Other Items", "Dev. Exclusive"],
  EXCLUDED_RARITIES: ["Special"],
  NON_TRADABLE: ["Cool S", "Shredded", "Tis The Season", "The Tree"],
  DATA_URL: "items.json",
  STORAGE_KEY: "itemChecklist",
  IMAGE_FALLBACK: "https://via.placeholder.com/200?text=No+Image",
};

// ============================================
// STATE
// ============================================
let allItems = [];
let filteredItems = [];
const isChecklistPage = !!document.getElementById("checklistContainer");

// ============================================
// TEMPLATE STORE
// ============================================
const ItemTemplate = {
  card: (item, showGeneration = false) => {
    const isUnavailable = CONFIG.UNOBTAINABLE.includes(item.Name);
    const rarityClass = sanitizeClass(item.Rarity);

    return `
      <div class="item-wrapper">
        <div class="card ${rarityClass} ${isUnavailable ? "unavailable" : ""}" ${isUnavailable ? 'data-hover="Unobtainable"' : ""}>
          <img src="${item["Image Path"]}" alt="${item.Name}" onerror="this.src='${CONFIG.IMAGE_FALLBACK}'">
        </div>
        <div class="item-name-wrapper">
          <div class="name">${item.Name}</div>
          ${showGeneration && item.Generation ? `<div class="item-sub">Gen ${item.Generation}</div>` : ""}
        </div>
      </div>
    `;
  },

  grid: (items, showGeneration = false) => `
    <div class="item-grid" style="padding-left: 10px;">
      ${items.map((item) => ItemTemplate.card(item, showGeneration)).join("")}
    </div>
  `,

  collection: (name, items, showGeneration = false) => `
    <div class="col-section">
      <h3 class="col-title">${name}</h3>
      ${ItemTemplate.grid(items, showGeneration)}
    </div>
  `,

  generation: (gen, collectionsHTML) => `
    <div class="gen-section">
      <h2 class="gen-title">Generation ${gen}</h2>
      ${collectionsHTML}
    </div>
  `,

  otherSection: (items) => `
    <div class="gen-section">
      <h2 class="gen-title">Other</h2>
      ${ItemTemplate.grid(items, false)}
    </div>
  `,

  goldView: (items) => `
    <div class="gen-section">
      <h2 class="gen-title">Gold Items</h2>
      ${ItemTemplate.grid(items, true)}
    </div>
  `,

  loading: '<p style="color:white;text-align:center;">Loading...</p>',
  noResults: '<p style="color:white;text-align:center;">No items match</p>',
};

// ============================================
// HELPERS
// ============================================
/**
 * Converts a string with spaces to a CSS-safe class name.
 * @param {string} str - "Dark Blue"
 * @returns {string} - "Dark-Blue"
 */
function sanitizeClass(str) {
  return str.replace(/\s+/g, "-");
}

/**
 * Groups items by generation and collection.
 */
function groupByGeneration(items) {
  const groups = {};
  items.forEach((item) => {
    const gen = item.Generation || "N/A";
    const col = item.Collection || "Other";
    if (!groups[gen]) groups[gen] = {};
    if (!groups[gen][col]) groups[gen][col] = [];
    groups[gen][col].push(item);
  });
  return groups;
}

/**
 * Sorts collections with "Rep Shop" items at the end.
 */
function sortCollections(collections) {
  return Object.keys(collections).sort((a, b) => {
    const aIsRep = a.toLowerCase().includes("rep shop");
    const bIsRep = b.toLowerCase().includes("rep shop");
    if (aIsRep && !bIsRep) return 1;
    if (!aIsRep && bIsRep) return -1;
    return a.localeCompare(b);
  });
}

/**
 * Sorts generations in descending order with "N/A" at the end.
 */
function sortGenerations(groups) {
  return Object.keys(groups).sort((a, b) => {
    if (a === "N/A") return 1;
    if (b === "N/A") return -1;
    return parseInt(b) - parseInt(a);
  });
}

/**
 * Filters eligible items based on config rules.
 */
function getEligibleItems(includeGold) {
  return allItems.filter((item) => {
    if (CONFIG.UNOBTAINABLE.includes(item.Name)) return false;
    if (CONFIG.EXCLUDED_COLLECTIONS.includes(item.Collection)) return false;
    if (CONFIG.EXCLUDED_RARITIES.includes(item.Rarity)) return false;
    if (CONFIG.NON_TRADABLE.includes(item.Name)) return false;
    if (!includeGold && item.Rarity === "Gold") return false;
    return true;
  });
}

// ============================================
// ITEMS - RENDER
// ============================================
function renderItems() {
  const grid = document.getElementById("itemsGrid");

  if (!allItems.length) {
    grid.innerHTML = ItemTemplate.loading;
    return;
  }

  if (!filteredItems.length) {
    grid.innerHTML = ItemTemplate.noResults;
    return;
  }

  const rarityFilter = document.getElementById("rarityFilter").value;

  if (rarityFilter === "Gold") {
    grid.innerHTML = ItemTemplate.goldView(filteredItems);
    setupUnobtainableHover();
    return;
  }

  const { regularItems, naItems } = splitItems(filteredItems);
  const groups = groupByGeneration(regularItems);
  grid.innerHTML = renderGenerations(groups, naItems);
  setupUnobtainableHover();
}

/**
 * Splits items into regular and N/A generations.
 */
function splitItems(items) {
  const regular = [];
  const na = [];
  items.forEach((item) => {
    if (item.Generation === "N/A") na.push(item);
    else regular.push(item);
  });
  return { regularItems: regular, naItems: na };
}

/**
 * Renders all generations as HTML.
 */
function renderGenerations(groups, naItems) {
  let html = "";
  const sortedGens = sortGenerations(groups);

  sortedGens.forEach((gen, index) => {
    if (index > 0) html += `<br><br>`;

    const sortedCollections = sortCollections(groups[gen]);
    let collectionsHTML = "";
    sortedCollections.forEach((col) => {
      collectionsHTML += ItemTemplate.collection(col, groups[gen][col], false);
    });

    html += ItemTemplate.generation(gen, collectionsHTML);
  });

  if (naItems.length) {
    html += `<br><br>`;
    html += ItemTemplate.otherSection(naItems);
  }

  return html;
}

/**
 * Sets up hover effects for unobtainable cards.
 */
function setupUnobtainableHover() {
  document.querySelectorAll(".card[data-hover]").forEach((card) => {
    const hoverText = card.dataset.hover;
    const nameEl = card.closest(".item-wrapper")?.querySelector(".name");
    if (!nameEl) return;

    const originalText = nameEl.textContent;

    card.removeEventListener("mouseenter", card._hoverEnter);
    card.removeEventListener("mouseleave", card._hoverLeave);

    card._hoverEnter = () => (nameEl.textContent = hoverText);
    card._hoverLeave = () => (nameEl.textContent = originalText);

    card.addEventListener("mouseenter", card._hoverEnter);
    card.addEventListener("mouseleave", card._hoverLeave);
  });
}

// ============================================
// ITEMS - FILTERS
// ============================================
function filterItems() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const type = document.getElementById("typeFilter").value;
  const rarity = document.getElementById("rarityFilter").value;
  const gen = document.getElementById("genFilter").value;

  filteredItems = allItems.filter((item) => {
    const matchSearch = item.Name.toLowerCase().includes(search);
    const matchType = type === "all" || item.Type === type;
    const matchRarity = rarity === "all" || item.Rarity === rarity;
    const matchGen = gen === "all" || item.Generation == gen;
    return matchSearch && matchType && matchRarity && matchGen;
  });

  renderItems();
  updateStats();
}

function resetFilters() {
  ["searchInput", "typeFilter", "rarityFilter", "genFilter"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = el.tagName === "INPUT" ? "" : "all";
  });
  filterItems();
}

// ============================================
// ITEMS - FILTER DROPDOWN
// ============================================
function toggleFilterDropdown() {
  document.getElementById("filterDropdown")?.classList.toggle("open");
  document.getElementById("filterToggleBtn")?.classList.toggle("active");
}

// Close dropdown on outside click
document.addEventListener("click", (e) => {
  const dropdown = document.querySelector(".filter-dropdown");
  if (dropdown && !dropdown.contains(e.target)) {
    document.getElementById("filterDropdown")?.classList.remove("open");
    document.getElementById("filterToggleBtn")?.classList.remove("active");
  }
});

// ============================================
// ITEMS - STATS
// ============================================
function updateStats() {
  const total = document.getElementById("totalItems");
  const showing = document.getElementById("showingItems");
  if (total) total.textContent = allItems.length;
  if (showing) showing.textContent = filteredItems.length;
}

// ============================================
// ITEMS - EVENT LISTENERS
// ============================================
function setupItemEventListeners() {
  document
    .getElementById("searchInput")
    ?.addEventListener("input", filterItems);
  document
    .getElementById("typeFilter")
    ?.addEventListener("change", filterItems);
  document
    .getElementById("rarityFilter")
    ?.addEventListener("change", filterItems);
  document.getElementById("genFilter")?.addEventListener("change", filterItems);
}

// ============================================
// ITEMS - INITIALIZATION
// ============================================
function initItems() {
  filteredItems = [...allItems];
  renderItems();
  updateStats();
  setupItemEventListeners();
}

// ============================================
// CHECKLIST - (Placeholder for future)
// ============================================
function initChecklist() {
  // TODO: Implement checklist functionality
  console.log("Checklist page initialized");
}

// ============================================
// NAV HOVER
// ============================================
document.querySelectorAll("ul li a").forEach((link) => {
  const original = link.textContent;
  const hover = link.dataset.hover;
  if (hover) {
    link.addEventListener("mouseenter", () => (link.textContent = hover));
    link.addEventListener("mouseleave", () => (link.textContent = original));
  }
});

// ============================================
// MAIN INITIALIZATION
// ============================================
function init() {
  fetch(CONFIG.DATA_URL)
    .then((res) => res.json())
    .then((data) => {
      allItems = data;
      if (isChecklistPage) {
        initChecklist();
      } else {
        initItems();
      }
    })
    .catch((err) => console.error("Error loading data:", err));
}

// Start the app
init();

// ============================================
// GLOBAL EXPOSURES
// ============================================
window.filterItems = filterItems;
window.resetFilters = resetFilters;
window.toggleFilterDropdown = toggleFilterDropdown;
