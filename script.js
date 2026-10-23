const projectSearch = document.getElementById("projectSearch");
const projectCards = [...document.querySelectorAll(".project-card")];
const filterButtons = [...document.querySelectorAll(".filter-btn")];
const emptyState = document.getElementById("emptyState");
const projectGrid = document.getElementById("projectGrid");
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
let activeFilter = "all";

function filterProjects() {
  const query = projectSearch.value.trim().toLowerCase();
  let visible = 0;
  projectCards.forEach(card => {
    const categoryMatch = activeFilter === "all" || card.dataset.category === activeFilter;
    const searchText = `${card.dataset.search || ""} ${card.innerText}`.toLowerCase();
    const searchMatch = searchText.includes(query);
    const show = categoryMatch && searchMatch;
    card.hidden = !show;
    if (show) visible++;
  });
  emptyState.hidden = visible !== 0;
  projectGrid.style.display = visible ? "grid" : "none";
}
projectSearch.addEventListener("input", filterProjects);
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    filterProjects();
  });
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const isLight = document.body.classList.contains("light-mode");
  themeToggle.textContent = isLight ? "☾" : "☼";
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
  try { localStorage.setItem("hsdw-theme", isLight ? "light" : "dark"); } catch (error) {}
});
try {
  if (localStorage.getItem("hsdw-theme") === "light") {
    document.body.classList.add("light-mode");
    themeToggle.textContent = "☾";
  }
} catch (error) {}

menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "✕" : "☰";
});
document.querySelectorAll("#mainNav a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
    document.querySelectorAll("#mainNav a").forEach(item => item.classList.remove("active"));
    link.classList.add("active");
  });
});
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("projectCount").textContent = `${projectCards.length} projects`;
filterProjects();

/*
HOW TO ADD YOUR PROJECT LINKS:
1. Find a card in index.html.
2. Replace href="#contact" with your real published project URL.
3. Change its status text from "Add link" to "Live".
Never put passwords, API keys, or private account details in these files.
*/