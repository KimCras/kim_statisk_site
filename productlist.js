const params = new URLSearchParams(window.location.search);
const category = params.get("category");
const categoryUrl = `https://kea-alt-del.dk/t7/api/products?category=${category}`;
const FashionURL = "https://kea-alt-del.dk/t7/api/products?limit=30";

window.addEventListener("DOMContentLoaded", init);

let fashionTemplate;
let productContainer;

function init() {
  console.log("init");

  fashionTemplate = document.querySelector(".fashion_template");
  console.log("fashionTemplate", fashionTemplate);

  productContainer = document.querySelector(".product_container");
  console.log("product_container", productContainer);

  //fetch here is receiving my json data/arrays thru its URL. It then gives us a Promise,
  fetch(categoryUrl)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      showProducts(json);
    });
}

function isSoldOut(item) {
  return item.soldout === 1;
}

function showProducts(product_JSON) {
  let product_clone;

  product_JSON.forEach((product) => {
    console.log("product", product);
    product_clone = fashionTemplate.cloneNode(true).content;
    product_clone.querySelector("a").href = `produkt.html?id=${product.id}`;
    product_clone.querySelector(".brandname").textContent = product.brandname;
    product_clone.querySelector(".productdisplayname").textContent = product.productdisplayname;
    product_clone.querySelector(".price").textContent = product.price + " kr.";
    product_clone.querySelector(".category").textContent = product.category;

    product_clone.querySelector(".fashion_image").src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
    product_clone.querySelector(".fashion_image").alt = product.productdisplayname;

    // Check if the discount is not null
    if (product.discount !== null) {
      // If there is a discount, show the "ON SALE" label
      product_clone.querySelector(".sale-label").style.display = "block";

      // Update the price display to show the discounted price
      const priceElement = product_clone.querySelector(".price");
      const discountedPrice = (product.price * (100 - product.discount)) / 100;
      priceElement.textContent = discountedPrice.toFixed(2) + " kr.";
    } else {
      // If no discount, hide the "ON SALE" label
      product_clone.querySelector(".sale-label").style.display = "none";
    }

    // Check if the product is sold out
    const isSoldOutProduct = isSoldOut(product);
    const addToCartBtn = product_clone.querySelector(".add-to-cart-btn");

    if (isSoldOutProduct) {
      addToCartBtn.disabled = true;
      addToCartBtn.textContent = "Sold Out";
      addToCartBtn.style.backgroundColor = "red";
    } else {
      addToCartBtn.disabled = false;
      addToCartBtn.textContent = "Add to Cart";
      addToCartBtn.style.backgroundColor = "";
    }

    productContainer.appendChild(product_clone);
  });
}
