const CONFIG = {
  UNOBTAINABLE: ["Cool S", "Shredded"],
  EXCLUDED_COLLECTIONS: ["Other Items", "Dev. Exclusive"],
  EXCLUDED_RARITIES: ["Special"],
  NON_TRADABLE: ["Cool S", "Shredded", "Tis The Season", "The Tree"],
  DATA: "items.json",
  STORAGE_KEY: "itemChecklist",
  IMAGE_FALLBACK: "https://via.placeholder.com/200?text=No+Image",
};

let itemsData = [];
let filteredItems = [];
const isChecklistPage = !!document.getElementById("checklistContainer");

window.CONFIG = CONFIG; 
window.itemsData = itemsData;
window.filterItems = filteredItems;
window.isChecklistPage = isChecklistPage;
