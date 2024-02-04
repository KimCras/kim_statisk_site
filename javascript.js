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

// ... (previous code)

function showProducts(product_JSON) {
  let product_clone;

  product_JSON.forEach((product) => {
    console.log("product", product);
    product_clone = fashionTemplate.cloneNode(true).content;
    product_clone.querySelector(".brandname").textContent = product.brandname;
    product_clone.querySelector(".productdisplayname").textContent = product.productdisplayname;
    product_clone.querySelector(".price").textContent = product.price + " kr.";
    product_clone.querySelector(".discount").textContent = product.discount + "%";

    // Check if the item is sold out
    // The ternary operator (? :): If isSoldOut(product) is true, then "Sold Out" is assigned to soldOutStatus; otherwise, "Available" is assigned.
    const soldOutStatus = isSoldOut(product) ? "Sold Out" : "Available"; //is like a different way to write an if-else statement
    const soldOutElement = product_clone.querySelector(".soldout");
    soldOutElement.textContent = soldOutStatus;

    // Hide the sold out text if the item is available
    function isSoldOut(product) {
      // This line checks if the soldout property of the product object is equal to 1. The === is the strict equality operator, which checks both value and type.
      if (product.soldout === 1) {
        return true; // Product is sold out
      } else {
        return false; // Product is not sold out
      }
    }
    //The ! gives us the opposite of the false/truth statement. So if IsSouldOut is true, the ! turns it into false and vice versa. This one says if isSoldOut is false (Is not sold out), have a display = none.
    if (!isSoldOut(product)) {
      soldOutElement.style.display = "none";
    }

    productContainer.appendChild(product_clone);
  });
}
