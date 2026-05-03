# NYX Luxury

<p align="center">
  <strong>A modern luxury fashion e-commerce front-end with a premium dark aesthetic.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-Markup-orange?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5 Badge" />
  <img src="https://img.shields.io/badge/CSS3-Styling-blue?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3 Badge" />
  <img src="https://img.shields.io/badge/JavaScript-Logic-yellow?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript Badge" />
  <img src="https://img.shields.io/badge/Bootstrap_5-UI-purple?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap Badge" />
  <img src="https://img.shields.io/badge/Responsive-Design-success?style=for-the-badge" alt="Responsive Badge" />
  <img src="https://img.shields.io/badge/LocalStorage-Enabled-black?style=for-the-badge" alt="LocalStorage Badge" />
</p>

---

## About The Project

**NYX Luxury** is a stylish front-end e-commerce project designed for a luxury fashion brand.  
It combines elegant visual presentation with practical shopping functionality using **HTML**, **CSS**, **JavaScript**, and **Bootstrap 5**.

The project provides a smooth shopping experience through dynamic product rendering, product detail pages, cart management, checkout flow, and local order tracking, all without requiring a backend.

---

## Key Features

- Premium dark-themed luxury UI
- Responsive landing page and shop layout
- Dynamic product loading from JSON
- Featured products section
- Product details with size and color options
- Add to cart with quantity handling
- Cart total calculation
- Checkout form with local order creation
- Order history page using `localStorage`

---

## Tech Stack

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla JS)**
- **Bootstrap 5**
- **JSON**
- **localStorage**

---

## Project Structure

```bash
NYX-Luxury/
├── index.html
├── shop.html
├── product.html
├── cart.html
├── checkout.html
├── orders.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── data/
│   └── products.json
└── assets/
    └── images/
```

---

## Pages Overview

### Home
A luxury-inspired landing page with a bold hero section, category highlights, and featured products.

### Shop
Displays all products dynamically from the JSON data source.

### Product Details
Shows a selected product with customization options like size and color before adding it to the cart.

### Cart
Lets users review selected items, adjust quantities, remove products, and view the total price.

### Checkout
Captures customer information and creates an order using the current cart items.

### Orders
Displays previously placed orders stored locally in the browser.

---

## How It Works

- Products are stored in `data/products.json`
- JavaScript fetches and renders products dynamically
- Cart items are saved in `localStorage`
- Checkout converts cart data into an order object
- Orders are stored and displayed from `localStorage`

---

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/NYX-Luxury.git
   ```

2. Open the project folder.

3. Run the project using a local server such as **Live Server**.

> `fetch()` is used to load local JSON data, so running the project through a local server is recommended.

---

## Future Enhancements

- Product search and filtering
- Category-based browsing
- Wishlist system
- Improved form validation
- Backend integration
- Authentication system
- Payment gateway support

---

## Author

**Mina**

---

## License

This project is available for **learning**, **practice**, and **portfolio** purposes.
