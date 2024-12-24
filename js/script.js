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
        <div class="profile-container">
            <button class="profile-button" onclick="toggleDropdown()">Profile</button>
            <div class="dropdown-menu" id="dropdownMenu">
                <span class="user-name">${userName}</span>
                <a href="orders.html" class="dropdown-item">Orders</a>
                <a href="settings.html" class="dropdown-item">Profile Settings</a>
                <a href="address.html" class="dropdown-item">My Address</a>
                <a onclick="handleLogout()" class="dropdown-item">Logout</a>
            </div>
        </div>
        `
        : `
          <div class="login-btn">
            <a href="login.html">Login/Register</a>
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
            <!-- <div class="search-container">
                <span class="search-icon" onclick="toggleSearch()">
                    <img src="images/search-icon.png" alt="Search Icon" />
                </span>
                <div class="search-bar">
                    <input type="text" placeholder="Search..." id="searchInput">
                    <button onclick="performSearch()">Search</button>
                </div>
            </div> -->

            <!--Cart button-->
            <!-- <button class="cart-btn">
                <a href="cart.html"><img src="images/cart-icon.png" alt="Cart Icon"></a>
                
                <span id="cart-count">0</span> <!-- This will dynamically show the number of items -->
            <!-- </button> -->

            <!-- Filter Section -->
            <section class="filter-section1" id="filter-section1">
                <div class="filter-container1">
                    <form id="filterForm" onsubmit="applyFilters(); return false;">
                        <!-- Property Type Dropdown -->
                        <label for="type" class="filter-label"></label>
                        <select id="type" onchange="applyFilters()" class="filter-dropdown-select">
                            <option value="All">Property</option>
                            <option value="All">All</option>
                            <option value="Residential">Residential</option>
                            <option value="Commercial">Commercial</option>
                            <option value="Land">Land</option>
                        </select>

                        <!-- Location Dropdown -->
                        <label for="location" class="filter-label"></label>
                        <select id="location" onchange="applyFilters()" class="filter-dropdown-select">
                            <option value="all">Location</option>
                            <option value="Surat">Surat</option>
                            <!-- Additional location options can be added here -->
                        </select>
                    </form>
                    <!-- Search Button -->
                        <div class="search-btn-container">
                        <input type="text" placeholder="Search..." id="searchInput">
                            <button type="submit" class="search-btn">🔍</button>
                        </div>
                </div>
            </section>


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
            <a href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSGMSqmSktsRmhMnPrGtFLKkCNxCxCJWJJQmlzxSldvvxGnsVSmKtqkWRWLtLXjhZfzRcTMQ">Email: allenareworksheet@gmail.com</a>
            <p>Phone: +91 1234567890</p>
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


// Toggle the visibility of the dropdown menu
function toggleDropdown() {
    const dropdown = document.getElementById('dropdownMenu');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Close the dropdown if the user clicks outside of it
window.addEventListener('click', function (event) {
    const dropdown = document.getElementById('dropdownMenu');
    const profileButton = document.querySelector('.profile-button');
    if (!profileButton.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});

// Get DOM elements
const editSaveButton = document.getElementById("edit-save-button");
const profilePicture = document.getElementById("profile-picture");
const uploadPicture = document.getElementById("upload-picture");
const fullNameDisplay = document.getElementById("full-name-display");
const fullNameEdit = document.getElementById("full-name-edit");
const emailDisplay = document.getElementById("email-display");
const emailEdit = document.getElementById("email-edit");
const addressDisplay = document.getElementById("address-display");
const addressEdit = document.getElementById("address-edit");

let isEditing = false;

// Toggle edit mode
editSaveButton.addEventListener("click", () => {
    if (isEditing) {
        // Save changes
        fullNameDisplay.textContent = fullNameEdit.value;
        emailDisplay.textContent = emailEdit.value;
        addressDisplay.textContent = addressEdit.value;

        // Switch to view mode
        toggleEditMode(false);
        editSaveButton.textContent = "Edit Profile";
    } else {
        // Switch to edit mode
        toggleEditMode(true);
        editSaveButton.textContent = "Save Changes";
    }

    isEditing = !isEditing;
});

// Switch between edit and view modes
function toggleEditMode(editMode) {
    fullNameDisplay.style.display = editMode ? "none" : "block";
    fullNameEdit.style.display = editMode ? "block" : "none";

    emailDisplay.style.display = editMode ? "none" : "inline";
    emailEdit.style.display = editMode ? "inline" : "none";

    addressDisplay.style.display = editMode ? "none" : "inline";
    addressEdit.style.display = editMode ? "inline" : "none";
}

// Handle profile picture click
profilePicture.addEventListener("click", () => {
    uploadPicture.click();
});

// Update profile picture preview
uploadPicture.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        profilePicture.src = URL.createObjectURL(file);
    }
});


let addressList = [
    "1234 Elm Street, Springfield",
    "4567 Maple Avenue, Lincoln",
    "8901 Oak Drive, Fairview"
];

// Render address list dynamically
function renderAddressList() {
    const addressListContainer = document.getElementById("address-list");
    addressListContainer.innerHTML = ""; // Clear the list before rendering
    addressList.forEach((address, index) => {
        const li = document.createElement("li");
        li.classList.add("address-item");
        li.innerHTML = `${address} 
            <button class="edit-btn" onclick="editAddress(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteAddress(${index})">Delete</button>`;
        addressListContainer.appendChild(li);
    });
}

// Edit Address
function editAddress(index) {
    const newAddress = prompt("Edit Address:", addressList[index]);
    if (newAddress) {
        addressList[index] = newAddress;
        renderAddressList();
    }
}

// Delete Address
function deleteAddress(index) {
    if (confirm("Are you sure you want to delete this address?")) {
        addressList.splice(index, 1);
        renderAddressList();
    }
}

// Show popup to add new address
document.getElementById("add-address-btn").addEventListener("click", function () {
    const popup = document.getElementById("address-form-popup");
    popup.style.display = "block";
});

// Cancel button hides popup
document.getElementById("cancel-btn").addEventListener("click", function () {
    const popup = document.getElementById("address-form-popup");
    popup.style.display = "none";
});

// Save new address logic
document.getElementById("save-address-btn").addEventListener("click", function () {
    const newAddress = document.getElementById("address-input").value.trim();
    if (newAddress) {
        addressList.push(newAddress);
        renderAddressList();
        document.getElementById("address-form-popup").style.display = "none";
        document.getElementById("address-input").value = "";
    } else {
        alert("Please enter a valid address.");
    }
});

// Initial rendering of the address list
renderAddressList();


//Filter function
function applyFilters() {
    const typeFilter = document.getElementById('type').value;
    const locationFilter = document.getElementById('location').value;
    const sizeFilter = document.getElementById('size').value;
    const costFilter = document.getElementById('cost').value;

    const properties = document.querySelectorAll('.bouquet-card');
    
    // Loop through all properties and show/hide based on filters
    properties.forEach(property => {
        const type = property.getAttribute('data-type');
        const location = property.getAttribute('data-location');
        const size = property.getAttribute('data-size');
        const cost = property.getAttribute('data-cost');

        let showProperty = true;

        // Check if the current page is index.html
        if (window.location.pathname === "/index.html" || window.location.pathname === "/") {
            // Show the filter section only on index.html
            document.getElementById("filter-section1").style.display = "block";
        } else {
            // Hide the filter section on other pages
            document.getElementById("filter-section1").style.display = "none";
        }

        // Apply type filter
        if (typeFilter !== 'All' && type !== typeFilter) {
            showProperty = false;
        }

        // Apply location filter
        if (locationFilter !== 'all' && location !== locationFilter) {
            showProperty = false;
        }

        // Apply size filter
        if (sizeFilter !== 'all' && size !== sizeFilter) {
            showProperty = false;
        }

        // Apply cost filter
        if (costFilter !== 'All' && cost !== costFilter) {
            showProperty = false;
        }

        // Show/hide property based on criteria
        if (showProperty) {
            property.style.display = 'block';
        } else {
            property.style.display = 'none';
        }
    });
}

// function applyFilters() {
//     const typeFilter = document.getElementById('type').value;
//     const locationFilter = document.getElementById('location').value;
//     const sizeFilter = document.getElementById('size').value;
//     const costFilter = document.getElementById('cost').value;
//     const sortFilter = document.getElementById('sort').value;

//     const properties = Array.from(document.querySelectorAll('.bouquet-card')); // Convert NodeList to Array

//     // Filter properties based on the selected filters
//     const filteredProperties = properties.filter(property => {
//         const type = property.getAttribute('data-type');
//         const location = property.getAttribute('data-location');
//         const size = property.getAttribute('data-size');
//         const cost = parseFloat(property.getAttribute('data-cost'));

//         let showProperty = true;

//         // Apply type filter
//         if (typeFilter !== 'All' && type !== typeFilter) {
//             showProperty = false;
//         }

//         // Apply location filter
//         if (locationFilter !== 'all' && location !== locationFilter) {
//             showProperty = false;
//         }

//         // Apply size filter
//         if (sizeFilter !== 'all' && size !== sizeFilter) {
//             showProperty = false;
//         }

//         // Apply cost filter
//         if (costFilter !== 'All') {
//             const costRange = costFilter.split('-').map(Number); // Parse range like '50-100'
//             if (cost < costRange[0] || cost > costRange[1]) {
//                 showProperty = false;
//             }
//         }

//         return showProperty;
//     });

//     // Sort the filtered properties based on the sort filter
//     if (sortFilter === 'low-to-high') {
//         filteredProperties.sort((a, b) => parseFloat(a.getAttribute('data-cost')) - parseFloat(b.getAttribute('data-cost')));
//     } else if (sortFilter === 'high-to-low') {
//         filteredProperties.sort((a, b) => parseFloat(b.getAttribute('data-cost')) - parseFloat(a.getAttribute('data-cost')));
//     }

//     // Clear current property display and re-render sorted/filtered properties
//     const propertyContainer = document.querySelector('.properties-container'); // Replace with your container class
//     propertyContainer.innerHTML = ''; // Clear current properties

//     filteredProperties.forEach(property => {
//         property.style.display = 'block'; // Ensure property is visible
//         propertyContainer.appendChild(property); // Add to container
//     });
// }

// Conversion factors for different units based on 1 sqft


// Conversion factors for different units based on 1 sqft


// Conversion factors for different units based on 1 sqft


const conversionFactors = {
    sqft: 1,
    sqm: 0.092903,  // square meters
    sqyd: 0.111111, // square yards
    acre: 2.2957e-5, // acres
    ares: 0.0247105 // ares
};

// Function to update area based on the selected unit
function updateArea(apartment) {
    const areaElement = document.getElementById(`area-${apartment}`);
    const unitSelect = document.getElementById(`unit-${apartment}`);
    const selectedUnit = unitSelect.value;
    let areaInFeet = 0;

    // Define the initial area in sqft
    if (apartment === '4bhk') {
        areaInFeet = 1963.66; // 4 BHK initial value in sqft
    } else if (apartment === '5bhk') {
        areaInFeet = 3204.41; // 5 BHK initial value in sqft
    }

    // Convert the area based on the selected unit
    let convertedArea = areaInFeet * conversionFactors[selectedUnit];

    // Update the input field value
    areaElement.value = convertedArea.toFixed(2);
    // Update the unit text
    document.getElementById(`unit-text-${apartment}`).textContent = selectedUnit;
}

document.getElementById("toggleButton").addEventListener("change", function() {
    var currentImage = document.getElementById("floorPlanImage");
  
    if (this.checked) {
      currentImage.src = "floor-plan-large.jpg";  // Path to the larger floor plan
    } else {
      currentImage.src = "floor-plan-small.jpg";  // Path to the smaller floor plan
    }
  });
  

  document.addEventListener("DOMContentLoaded", function () {
    const readMoreBtn = document.getElementById("read-more-btn");
    const hiddenContent = document.getElementById("hidden-content");
  
    readMoreBtn.addEventListener("click", function () {
      if (hiddenContent.style.display === "none") {
        hiddenContent.style.display = "block";
        readMoreBtn.textContent = "Read Less"; // Change button text
      } else {
        hiddenContent.style.display = "none";
        readMoreBtn.textContent = "Read More"; // Revert button text
      }
    });
  });
  