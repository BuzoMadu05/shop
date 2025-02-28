document.addEventListener("DOMContentLoaded", function () {
  // Sample cart items
  let cartItems = [
    { id: 1, name: "Product 1", qty: 1, price: 19.99 },
    { id: 2, name: "Product 2", qty: 2, price: 29.99 },
    { id: 3, name: "Product 3", qty: 1, price: 39.99 }
  ];

  const cartTable = document.getElementById("cartTable");
  const cartSubtotalEl = document.getElementById("cartSubtotal");
  const cartSearchInput = document.getElementById("cartSearch");
  const cartSearchBtn = document.getElementById("cartSearchBtn");

  // Render the cart items into the table
  function renderCart(items) {
    cartTable.innerHTML = "";
    items.forEach((item) => {
      const row = document.createElement("tr");

      // Product Name cell
      const nameCell = document.createElement("td");
      nameCell.textContent = item.name;
      row.appendChild(nameCell);

      // Quantity cell with decrement and increment buttons
      const qtyCell = document.createElement("td");

      // Decrement Button
      const decBtn = document.createElement("button");
      decBtn.textContent = "-";
      decBtn.classList.add("qty-btn");
      decBtn.addEventListener("click", () => {
        if (item.qty > 1) {
          item.qty--;
        } else {
          // Remove the item if quantity reaches 1 and user clicks minus
          cartItems = cartItems.filter((ci) => ci.id !== item.id);
          renderCart(getFilteredCartItems());
          return;
        }
        renderCart(getFilteredCartItems());
      });
      qtyCell.appendChild(decBtn);

      // Quantity Display
      const qtyDisplay = document.createElement("span");
      qtyDisplay.textContent = " " + item.qty + " ";
      qtyCell.appendChild(qtyDisplay);

      // Increment Button
      const incBtn = document.createElement("button");
      incBtn.textContent = "+";
      incBtn.classList.add("qty-btn");
      incBtn.addEventListener("click", () => {
        item.qty++;
        renderCart(getFilteredCartItems());
      });
      qtyCell.appendChild(incBtn);

      row.appendChild(qtyCell);

      // Price cell
      const priceCell = document.createElement("td");
      priceCell.textContent = `$${item.price.toFixed(2)}`;
      row.appendChild(priceCell);

      // Total cell
      const totalCell = document.createElement("td");
      const totalPrice = item.price * item.qty;
      totalCell.textContent = `$${totalPrice.toFixed(2)}`;
      row.appendChild(totalCell);

      cartTable.appendChild(row);
    });
    updateSubtotal(items);
  }

  // Update the cart subtotal
  function updateSubtotal(items) {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
    cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  }

  // Get filtered cart items based on the search query
  function getFilteredCartItems() {
    const query = cartSearchInput.value.trim().toLowerCase();
    if (query === "") {
      return cartItems;
    }
    return cartItems.filter((item) =>
      item.name.toLowerCase().includes(query)
    );
  }

  // Attach event listener for the search button
  cartSearchBtn.addEventListener("click", () => {
    renderCart(getFilteredCartItems());
  });

  // Also trigger search on pressing Enter in the search input
  cartSearchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      renderCart(getFilteredCartItems());
    }
  });

  // Initial render
  renderCart(cartItems);
});
