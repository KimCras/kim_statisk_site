window.addEventListener("DOMContentLoaded", init);

const FashionURL = "https://kea-alt-del.dk/t7/api/products";

let fashionTemplate;
let productContainer;

function init() {
  console.log("init");

  fashionTemplate = document.querySelector(".fashion_template");
  console.log("fashionTemplate", fashionTemplate);

  productContainer = document.querySelector(".product_container");
  console.log("product_container", productContainer);

  fetch(FashionURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      showProducts(json);
    });
}

function showProducts(product_JSON) {
  let product_clone;

  product_JSON.forEach((product) => {
    console.log("product", product);
    product_clone = fashionTemplate.cloneNode(true).content;
    // product_clone.querySelector(".fashion_image").alt = `Picture of a ${product.tagline} beer`;
    product_clone.querySelector(".brandname").textContent = product.brandname;
    product_clone.querySelector(".productdisplayname").textContent = product.productdisplayname;
    product_clone.querySelector(".price").textContent = product.price + " kr.";
    product_clone.querySelector(".discount").textContent = product.discount + "%";
    productContainer.appendChild(product_clone);
  });
}

discount;
