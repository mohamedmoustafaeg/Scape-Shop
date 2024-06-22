function register() {
    // Get form elements
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value.trim();
    var confirmPassword = document.getElementById('confirmPassword').value.trim();

    // Error elements
    var nameError = document.getElementById('nameError');
    var emailError = document.getElementById('emailError');
    var passwordError = document.getElementById('passwordError');
    var confirmPasswordError = document.getElementById('confirmPasswordError');

    // Reset errors
    nameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    confirmPasswordError.textContent = '';

    // Validation flags
    var valid = true;

    // Validate name
    if (!/^[A-Za-z\s]+$/.test(name)) {
        nameError.textContent = 'Name should contain only letters and spaces';
        valid = false;
    }

    // Validate email
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        emailError.textContent = 'Invalid email address';
        valid = false;
    }

    // Validate password
    if (password.length < 8) {
        passwordError.textContent = 'Password should be at least 8 characters long';
        valid = false;
    }

    // Validate confirm password
    if (password !== confirmPassword) {
        confirmPasswordError.textContent = 'Passwords do not match';
        valid = false;
    }

    // If all validations pass
    if (valid) {
        // Display welcome message and navbar
        document.getElementById('userName').textContent = name;
        document.getElementById('loginFormContainer').style.display = 'none';
        document.getElementById('navbar').style.display = 'block';
        document.getElementById('slideshowContainer').style.display = 'block';
        startSlideshow();
        document.getElementById('productPage').style.display = 'flex';
        filterProducts('all'); // Show all products by default
        document.getElementById('navbar').scrollIntoView({ behavior: 'smooth' });

    }
}

function logout() {
    // Hide navbar and show registration form
    document.getElementById('loginFormContainer').style.display = 'block';
    document.getElementById('navbar').style.display = 'none';
    document.getElementById('slideshowContainer').style.display = 'none';
    stopSlideshow();
    document.getElementById('productPage').style.display = 'none';
    document.getElementById('cartPage').style.display = 'none';
}



var slideshowInterval;
var currentImageIndex = 0;

function startSlideshow() {
    var images = document.querySelectorAll('.slideshow-container img');
    if (images.length > 0) {
        slideshowInterval = setInterval(() => {
            changeSlide(1);
        }, 2000);
    }
}

function stopSlideshow() {
    clearInterval(slideshowInterval);
}

function changeSlide(direction) {
    var images = document.querySelectorAll('.slideshow-container img');
    images[currentImageIndex].classList.remove('active');
    currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
    images[currentImageIndex].classList.add('active');
}
function filterProducts(category) {
    var products = document.querySelectorAll('.product');
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}


// --------------
var cartCount = 0;

function addToCart() {
    cartCount++;
    document.getElementById('cartCount').textContent = cartCount;
}

function viewProduct(name, image, price) {
    // Hide all products
    var products = document.querySelectorAll('.product');
    products.forEach(product => {
        product.style.display = 'none';
    });

    // Get the product details div and update its content
    var productDetails = document.getElementById('productDetails');
    productDetails.innerHTML = `
        <img src="${image}" alt="${name}" style="width: 30%;">
        <h2>${name}</h2>
        <p>Price:${price}</p>
        <button onclick="addToCart()">Add to Cart</button>
        <button onclick="showAllProducts()">Back to Products</button>
    `;
    productDetails.style.display = 'block';
}

function showAllProducts() {
    // Show all products
    var products = document.querySelectorAll('.product');
    products.forEach(product => {
        product.style.display = 'block';
    });

    // Hide product details div
    var productDetails = document.getElementById('productDetails');
    productDetails.style.display = 'none';
}


// -------------------------------

// Array to store cart items
var cart = [];

// Function to add item to cart
function addToCart(productName, price) {
    var found = false;
    // Check if the product is already in the cart
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name === productName) {
            cart[i].quantity++;
            found = true;
            break;
        }
    }
    // If not found, add it to the cart
    if (!found) {
        cart.push({ name: productName, price: price, quantity: 1 });
    }

    // Update cart count in navbar
    updateCartCount();
}

// Function to remove item from cart
function removeFromCart(productName) {
    // Find the item in cart and decrease quantity or remove completely if quantity is 0
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name === productName) {
            if (cart[i].quantity > 1) {
                cart[i].quantity--;
            } else {
                cart.splice(i, 1);
            }
            break;
        }
    }

    // Update cart count in navbar
    updateCartCount();

    // Update cart display
    updateCartDisplay();
}

// Function to update cart count in navbar
function updateCartCount() {
    var cartCountElement = document.getElementById('cartCount');
    var totalCount = 0;
    for (var i = 0; i < cart.length; i++) {
        totalCount += cart[i].quantity;
    }
    cartCountElement.textContent = totalCount;
}

// Function to update cart display on cart page
function updateCartDisplay() {
    var cartItemsElement = document.getElementById('cartItems');
    cartItemsElement.innerHTML = ''; // Clear previous content

    var totalPrice = 0;
    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        var itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <p>${item.name} - $${item.price} each</p>
            <p>Quantity: ${item.quantity}</p>
            <button onclick="addToCart('${item.name}', ${item.price})">Add More</button>
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartItemsElement.appendChild(itemDiv);
        totalPrice += item.price * item.quantity;
    }

    // Update total price
    var totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

// Function to show cart page
function showCart() {
    updateCartDisplay();
    // Show the cart section
    document.getElementById('cartPage').style.display = 'block';
    // Scroll to the cart section
    document.getElementById('cartPage').scrollIntoView({ behavior: 'smooth' });
}

// Function to handle buy now button click
function buyNow() {
    alert('Successful Purchase');
}

// // Function to show products page
// function showProducts() {
//     // Hide other sections
//     document.getElementById('slideshowContainer').style.display = 'none';
//     document.getElementById('cartPage').style.display = 'none';

//     // Show the products section
//     document.getElementById('productPage').style.display = 'block';

//     // Scroll to the products section
//     document.getElementById('productPage').scrollIntoView({ behavior: 'smooth' });
// }

// // Function to show home page
// function showHome() {
//     // Hide other sections
//     document.getElementById('productPage').style.display = 'none';
//     document.getElementById('cartPage').style.display = 'none';

//     // Show the homepage section
//     document.getElementById('slideshowContainer').style.display = 'block';

//     // Scroll to the homepage section
//     document.getElementById('slideshowContainer').scrollIntoView({ behavior: 'smooth' });
// }

// Example function to initialize cart count
updateCartCount();
// -------------------------------------------
function showHome() {
    document.getElementById('slideshowContainer').scrollIntoView({ behavior: 'smooth' });
}
function showProducts() {
    // Scroll to the products section
    document.getElementById('productPage').scrollIntoView({ behavior: 'smooth' });
}
// Function to scroll to the top of the page
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show the scroll-to-top button when the user scrolls down
window.onscroll = function() {
    let scrollTopBtn = document.getElementById('scrollTopBtn');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
};