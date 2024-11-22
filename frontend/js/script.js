// Slider functionality
let currentSlideIndex = 0;
showSlide(currentSlideIndex);

function showSlide(index) {
  const slides = document.getElementsByClassName("slide");
  if (index >= slides.length) {
    currentSlideIndex = 0;
  }
  if (index < 0) {
    currentSlideIndex = slides.length - 1;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[currentSlideIndex].style.display = "block";
}

function moveSlide(step) {
  currentSlideIndex += step;
  showSlide(currentSlideIndex);
}

// Auto-slide feature
setInterval(() => {
  moveSlide(1);
}, 5000);

function handleLoginResponse(response) {
  const { token, role, userName } = response;

  // Store token, role, and userName in localStorage
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  localStorage.setItem("userName", userName);

  // Redirect to the homepage after login
  window.location.href = "index.html";
}

// Authentication functions
function handleLogout() {
  // Clear all authentication data
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("userName");

  // Redirect to login page
  window.location.href = "login.html";
}
// Check authentication status
function isAuthenticated() {
  return !!localStorage.getItem("token");
}

// Get user name
function getUserName() {
  return localStorage.getItem("userName") || "User";
}

// Header Component
class myHeader extends HTMLElement {
  connectedCallback() {
    const isLoggedIn = isAuthenticated();
    const userName = getUserName();

    // Create the login/user section HTML based on login status
    const loginSection = isLoggedIn
      ? `
<div class="user-section">
            <span class="user-name">Welcome</span>
          <button onclick="handleLogout()" class="logout-btn">Logout</button>
        </div>
      `
      : `
        <div class="login-btn">
          <a href="login.html">Login/SignUp</a>
        </div>
      `;

    this.innerHTML = `
      <header>
        <div class="header-container">
            <!-- Logo -->
            <div class="logo">
                <a href="index.html"><img src="/images/logo.png" alt="Flower Bouquets Store Logo"></a>
            </div>

            <!-- Navigation links -->
            <nav>
                <ul>
                    <!--Adding the category list to a dropdown menu-->
                    
                    <li class="dropdown">
                        <a href="#" class="dropbtn">Buy</a>
                        <div class="dropdown-content">
                            <a href="residential.html">Residential</a>
                            <a href="commercial.html">Commercial</a>
                            <a href="land.html">Land</a>
                        </div>
                    </li>

                    <li class="dropdown">
                        <a href="#" class="dropbtn">Lease</a>
                        <div class="dropdown-content">
                            <a href="single.html">Residential</a>
                            <a href="multi.html">Commercial</a>
                            <a href="condos.html">Land</a>
                        </div>
                    </li>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="contact.html">Contact Us</a></li>
                </ul>
            </nav>

            <!-- Search Icon and Search Bar -->
            <div class="search-container">
                <span class="search-icon" onclick="toggleSearch()">
                    <img src="images/search-icon.png" alt="Search Icon" />
                </span>
                <div class="search-bar">
                    <input type="text" placeholder="Search..." id="searchInput">
                    <button onclick="performSearch()">Search</button>
                </div>
            </div>

            <!--Cart button-->
            <button class="cart-btn">
                <a href="cart.html"><img src="images/cart-icon.png" alt="Cart Icon"></a>
                
                <span id="cart-count">0</span> <!-- This will dynamically show the number of items -->
            </button>

            ${loginSection}
        </div>
    </header>
    `;
  }
}

customElements.define("my-header", myHeader);

class myFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <footer class="site-footer">
        <div class="logo2">
            <a href="index.html"><img src="images/logo.png" alt="Flower Bouquets Store Logo"></a>
        </div>
    <div class="footer-content">
        <div class="footer-links">
            
            <h3>Quick Links</h3>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="residential-blog.html">Residential Property</a></li>
                <!-- <li class="dropdown">
                    <a href="#" class="dropbtn">Residential Property</a>
                    <div class="dropdown-content">
                        <a href="residential.html">Buy</a>
                        <a href="commercial.html">Rent</a>
                    </div>
                </li> -->
                <li><a href="/commercial-blog.html">Commercial Property</a></li>
                <li><a href="/land-blog.html">Land</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="contact.html">Contact Us</a></li>
            </ul>
        </div>
        
        <div class="footer-terms">
            <h3>Terms & Policies</h3>
            <ul>
                <li><a href="privacy-policy.html">Privacy Policy</a></li>
                <li><a href="terms-and-conditions.html">Terms & Conditions</a></li>
                <li><a href="refund-policy.html">Refund Policy</a></li>
                <li><a href="shipping-policy.html">Shipping Policy</a></li>
            </ul>
        </div>
        
        <div class="footer-contact">
            <h3>Contact Us</h3>
            <a href="https://mail.google.com/mail/u/0/#inbox?compose=DmwnWsTNGvmGMnQRNgHHfdHQZllXghnjldXWkJlNxVHBMGSGCqhJsxTWPNJxlMZQpmtRdVLqTLHG">Email: support@realestate.com</a>
            <p>Phone: +1 (123) 456-7890</p>
            <a href="https://www.google.com/maps/place/Allenare+Technology+Private+Limited/@22.7668801,88.3748032,17z/data=!3m1!4b1!4m6!3m5!1s0x39f89b1013862b09:0xa4337fb26848e87!8m2!3d22.7668752!4d88.3773781!16s%2Fg%2F11w1rbgfdc?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D">Address: 123 Real Street, Estate City, RE 12345</a>
        </div>
    </div>
    
    <div class="footer-bottom">
        <p>&copy; 2024 Real Estate. All rights reserved.</p>
    </div>
    </footer>
        `;
  }
}

customElements.define("my-footer", myFooter);


// Switch between Login and Register
document.getElementById('switch-to-register').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
});

document.getElementById('switch-to-login').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
});

// cart.js or products.js

// Function to get cart from localStorage or initialize a new one
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Function to save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to add an item to the cart
function addToCart(product) {
    const cart = getCart();
    
    // Check if the item already exists in the cart
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        // If the item exists, increment the quantity
        existingItem.quantity += 1;
    } else {
        // If the item does not exist, add it to the cart
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
    alert(`${product.name} has been added to your cart.`);
}

// Event listener to add products to the cart when "Add to Cart" button is clicked
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.product-card');
        
        const product = {
            id: parseInt(card.getAttribute('data-id')),
            name: card.getAttribute('data-name'),
            price: parseFloat(card.getAttribute('data-price')),
            image: card.getAttribute('data-image')
        };

        addToCart(product);
    });
});


// Scroll-to-top button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
}

document.getElementById("scrollTopBtn").addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Contact form submission handler
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission to refresh page

    // Collect form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Validate form (you can add more detailed validation as needed)
    if (name === "" || email === "" || message === "") {
        alert("Please fill out all fields.");
        return;
    }

    // Simple success alert (you can replace this with an AJAX request to submit the form data)
    alert(`Thank you, ${name}! Your message has been sent.`);
    
    // Clear the form
    document.getElementById("contact-form").reset();
});

// Handle "Add to Cart" button clicks on combo items
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const comboName = this.parentElement.querySelector('h3').innerText;
        const comboPrice = this.parentElement.querySelector('.price').innerText;

        // Log combo added to the cart (you can replace this with cart logic)
        console.log(`Added to cart: ${comboName} - ${comboPrice}`);

        // Visual feedback (optional)
        alert(`${comboName} has been added to your cart!`);
    });
});

// Toggle the search bar visibility
function toggleSearch() {
    const searchBar = document.querySelector('.search-bar');
    searchBar.style.display = searchBar.style.display === 'flex' ? 'none' : 'flex';
}

// Perform search action (placeholder function)
function performSearch() {
    const query = document.getElementById('searchInput').value;
    alert(`Searching for: ${query}`);
    // You can add code here to process the search query, such as redirecting to a search results page
}

function applyFilters() {
    // Retrieve selected filter values
    const location = document.getElementById('location').value;
    const size = document.getElementById('size').value;
    const cost = document.getElementById('cost').value;

    // Retrieve all product cards
    const products = document.querySelectorAll('.product-card');

    // Filter products
    products.forEach(product => {
        const productLocation = product.getAttribute('data-location');
        const productSize = product.getAttribute('data-size');
        const productCost = parseInt(product.getAttribute('data-cost'));

        let showProduct = true;

        // Filter by location
        if (location !== 'all' && location !== productLocation) {
            showProduct = false;
        }

        // Filter by size
        if (size !== 'all' && size !== productSize) {
            showProduct = false;
        }

        // Apply the final display state based on filters
        product.style.display = showProduct ? 'block' : 'none';
    });

    // Sort products by cost
    if (cost !== 'all') {
        const sortedProducts = [...products].sort((a, b) => {
            const costA = parseInt(a.getAttribute('data-cost'));
            const costB = parseInt(b.getAttribute('data-cost'));
            return cost === 'low-high' ? costA - costB : costB - costA;
        });
        
        // Append sorted products to the grid
        const productGrid = document.querySelector('.product-grid');
        productGrid.innerHTML = '';
        sortedProducts.forEach(product => productGrid.appendChild(product));
    }
}
