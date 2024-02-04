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

function isSoldOut(item) {
  return item.soldout === 1;
}

function showProducts(product_JSON) {
  let product_clone;

  product_JSON.forEach((product) => {
    console.log("product", product);
    product_clone = fashionTemplate.cloneNode(true).content;
    product_clone.querySelector(".brandname").textContent = product.brandname;
    product_clone.querySelector(".productdisplayname").textContent = product.productdisplayname;
    product_clone.querySelector(".price").textContent = product.price + " kr.";

    // Check if the discount is null
    const discountElement = product_clone.querySelector(".discount");

    //product.discount !== null: This condition checks if the value of product.discount is not equal to null. If product.discount has a value other than null (for example, a number or a string), the condition is true. If product.discount IS null, the condition is false.
    // so here it says: if the product.discount does NOT have the same value as null, display the discount. if the discount is null, hide it.
    if (product.discount !== null) {
      // If the discount has another value than null, show this discount
      discountElement.textContent = product.discount + "%";
    } else {
      // If discount is null, hide the element
      discountElement.style.display = "none";
    }

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
