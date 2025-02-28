document.addEventListener("DOMContentLoaded", () => {
  // --- Cart Increment Functionality ---
  let cartCount = 0;
  const cartCountEl = document.getElementById("cartCount");
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      cartCount++;
      cartCountEl.textContent = cartCount;
      // Optional: Provide user feedback
      alert("Product added to cart!");
    });
  });

  // --- Search Functionality ---
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const productItems = document.querySelectorAll(".product-item");

  function filterProducts() {
    const query = searchInput.value.trim().toLowerCase();
    productItems.forEach((item) => {
      // Check the data-name attribute for matching text
      const name = item.getAttribute("data-name").toLowerCase();
      if (name.includes(query)) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  }

  searchBtn.addEventListener("click", filterProducts);
  // Also trigger search on pressing Enter
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      filterProducts();
    }
  });
});

