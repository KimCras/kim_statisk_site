window.addEventListener("DOMContentLoaded", init);
// let categoryTemplate;
let categoryContainer;

function init() {
  fetch("https://kea-alt-del.dk/t7/api/categories/")
    .then((response) => response.json())
    .then(showCategory);
}

function showCategory(categories) {
  categories.forEach((category) => {
    const categoryTemplate = document.querySelector(".categoryTemplate").content;
    const clone = categoryTemplate.cloneNode(true);
    console.log(category);

    clone.querySelector("h3").textContent = category.category;
    clone.querySelector("a").setAttribute("href", `produktliste.html?category=${category.category}`);
    clone.querySelector("img").src = "img/" + category.category + ".webp";

    document.querySelector(".categories").appendChild(clone);
  });
}
