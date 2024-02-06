const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const url = `https://kea-alt-del.dk/t7/api/products/${id}`;
const imagePath = `https://kea-alt-del.dk/t7/images/webp/640/${id}.webp`;

function getProduct() {
  fetch(url)
    .then((res) => res.json())
    .then(showProducts);
}

function isSoldOut(item) {
  return item.soldout === 1;
}

function showProducts(product) {
  document.querySelector("p").textContent = product.brandname;
  document.querySelector("h2").textContent = product.productdisplayname;
  document.querySelector("span").textContent = product.price + " DKK";
  document.querySelector("span.discount").textContent = product.discount + "%";
  if (product.discount !== null) {
    document.querySelector("span.discount").classList.remove("hide");
  }

  document.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${id}.webp`;
  document.querySelector("img").alt = product.productdisplayname;

  const isSoldOutProduct = isSoldOut(product);
  const addToCartBtn = document.querySelector(".add-to-cart-btn");

  if (isSoldOutProduct) {
    addToCartBtn.disabled = true;
    addToCartBtn.textContent = "Sold Out";
    addToCartBtn.style.backgroundColor = "red";
  } else {
    addToCartBtn.disabled = false;
    addToCartBtn.textContent = "Add to Cart";
    addToCartBtn.style.backgroundColor = "";
  }
}

getProduct();
