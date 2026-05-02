const featuredContainer = document.getElementById("featuredProducts");

async function loadFeaturedProducts() {
  if (!featuredContainer) return;
  try {
    const res = await fetch("data/products.json");
    const products = await res.json();

    featuredContainer.innerHTML = products
      .map((p) => {
        return `
        <div class="col-md-4">
          <div class="product-card p-3">
            <img src="${p.image}" class="img-fluid mb-3" alt="${p.name}">
            <h5>${p.name}</h5>
            <p class="price">$${p.price}</p>
            <a href="product.html?id=${p.id}" class="btn btn-gold w-100">View Details</a>
          </div>
        </div>
      `;
      })
      .join("");
  } catch (err) {
    console.error("Error loading products:", err);
  }
}

loadFeaturedProducts();

const shopContainer = document.getElementById("shopProducts");

async function loadShopProducts() {
  if (!shopContainer) return; // عشان الكود يشتغل بس في shop.html

  try {
    const res = await fetch("data/products.json");
    const products = await res.json();

    shopContainer.innerHTML = products
      .map((p) => {
        return `
        <div class="col-md-4">
          <div class="product-card p-3">
            <img src="${p.image}" class="img-fluid mb-3" alt="${p.name}">
            <h5>${p.name}</h5>
            <p class="price">$${p.price}</p>
            <a href="product.html?id=${p.id}" class="btn btn-gold w-100">View Details</a>
          </div>
        </div>
      `;
      })
      .join("");
  } catch (err) {
    console.error("Error loading shop products:", err);
  }
}

loadShopProducts();
const productDetailsContainer = document.getElementById("productDetails");

async function loadProductDetails() {
  if (!productDetailsContainer) return; // يشتغل بس في product.html

  // 1) نقرأ id من الرابط
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  // لو مفيش id
  if (!productId) {
    productDetailsContainer.innerHTML = `<p class="text-center">Product not found.</p>`;
    return;
  }

  try {
    // 2) نجيب كل المنتجات من JSON
    const res = await fetch("data/products.json");
    const products = await res.json();

    // 3) نجيب المنتج المطلوب بالـ id
    const product = products.find((p) => String(p.id) === String(productId));

    if (!product) {
      productDetailsContainer.innerHTML = `<p class="text-center">Product not found.</p>`;
      return;
    }

    // 4) نعرض تفاصيل المنتج
    productDetailsContainer.innerHTML = `
      <div class="col-md-6">
        <img src="${product.image}" class="img-fluid" alt="${product.name}">
      </div>

      <div class="col-md-6">
        <h2 class="fw-bold">${product.name}</h2>
        <p class="price fs-4">$${product.price}</p>

        <div class="mt-4">
          <label class="form-label">Size</label>
          <select class="form-select mb-3" id="sizeSelect">
            <option value="S">Small (S)</option>
            <option value="M" selected>Medium (M)</option>
            <option value="L">Large (L)</option>
            <option value="XL">X-Large (XL)</option>
          </select>

          <label class="form-label">Color</label>
          <select class="form-select mb-3" id="colorSelect">
            <option value="Black" selected>Black</option>
            <option value="White">White</option>
            <option value="Gold">Gold</option>
          </select>

          <button class="btn btn-gold w-100" id="addToCartBtn">
            Add to Cart
          </button>
        </div>
      </div>
    `;

    const addToCartBtn = document.getElementById("addToCartBtn");

    addToCartBtn.addEventListener("click", () => {
      const size = document.getElementById("sizeSelect").value;
      const color = document.getElementById("colorSelect").value;

      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size,
        color,
        qty: 1,
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // لو نفس المنتج بنفس المقاس واللون موجود زوّد الكمية
      const existingItem = cart.find(
        (item) =>
          item.id === cartItem.id && item.size === size && item.color === color,
      );

      if (existingItem) {
        existingItem.qty += 1;
      } else {
        cart.push(cartItem);
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      alert("Added to cart ✅");
    });
  } catch (err) {
    console.error("Error loading product details:", err);
  }
}

loadProductDetails();

const cartItemsContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

function loadCart() {
  if (!cartItemsContainer) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <p class="text-center text-white">Your cart is empty 🛒</p>
    `;
    cartTotal.innerText = "$0";
    return;
  }

  let total = 0;

  cartItemsContainer.innerHTML = cart
    .map((item) => {
      total += item.price * item.qty;

      return `
  <div class="cart-item">
    <img src="${item.image}" alt="${item.name}">

    <div class="flex-grow-1">
      <h5 class="text-white">${item.name}</h5>
      <p class="price">$${item.price}</p>
      <p class="text-white small">
        Size: ${item.size} | Color: ${item.color}
      </p>

      <div class="d-flex align-items-center gap-2 mt-2">
        <button class="btn btn-sm btn-outline-light"
          onclick="changeQty(${item.id}, '${item.size}', '${item.color}', -1)">
          -
        </button>

        <span class="text-white">Qty: ${item.qty}</span>

        <button class="btn btn-sm btn-outline-light"
          onclick="changeQty(${item.id}, '${item.size}', '${item.color}', 1)">
          +
        </button>

        <button class="btn btn-sm btn-danger ms-auto"
          onclick="removeItem(${item.id}, '${item.size}', '${item.color}')">
          Remove
        </button>
      </div>
    </div>
  </div>
`;
    })
    .join("");

  cartTotal.innerText = `$${total}`;
}

loadCart();

function changeQty(id, size, color, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const item = cart.find(
    (p) => p.id === id && p.size === size && p.color === color,
  );

  if (!item) return;

  item.qty += change;

  // لو الكمية بقت 0 أو أقل احذف المنتج
  if (item.qty <= 0) {
    cart = cart.filter(
      (p) => !(p.id === id && p.size === size && p.color === color),
    );
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function removeItem(id, size, color) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart = cart.filter(
    (p) => !(p.id === id && p.size === size && p.color === color),
  );

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

const checkoutForm = document.getElementById("checkoutForm");

if (checkoutForm) {
  checkoutForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const order = {
      id: Date.now(),
      customer: {
        name: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        phone: document.getElementById("phone").value,
      },
      items: cart,
      date: new Date().toLocaleString(),
    };

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);

    localStorage.setItem("orders", JSON.stringify(orders));

    // تفريغ السلة بعد الطلب
    localStorage.removeItem("cart");

    alert("Order placed successfully ✅");

    window.location.href = "orders.html";
  });
}

const ordersContainer = document.getElementById("ordersContainer");

function loadOrders() {
  if (!ordersContainer) return;

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  if (orders.length === 0) {
    ordersContainer.innerHTML = `
      <p class="text-center text-white">
        No orders yet 📦
      </p>
    `;
    return;
  }

  ordersContainer.innerHTML = orders
    .map((order) => {
      return `
      <div class="order-card text-white">
        <h5>Order ID: ${order.id}</h5>
        <p>Date: ${order.date}</p>
        <p><strong>Customer:</strong> ${order.customer.name}</p>

        <hr style="border-color: gold;">

        <p><strong>Items:</strong></p>
        <ul>
          ${order.items
            .map(
              (item) => `
            <li>
              ${item.name} (x${item.qty}) - $${item.price}
            </li>
          `,
            )
            .join("")}
        </ul>
      </div>
    `;
    })
    .join("");
}

loadOrders();
