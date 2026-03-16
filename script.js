
const lazyImages = document.querySelectorAll(".lazy-image");

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove("lazy-image");
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
});


/*document.addEventListener("DOMContentLoaded", function () {

    const video = document.getElementById("lazyVideo");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                const source = video.querySelector("source");
                source.src = source.dataset.src;

                video.load();
                observer.unobserve(video);
            }
        });
    });

    observer.observe(video);
});*/



// CART DATA
let cart = [];

// ADD TO CART
function addToCart(productName, productPrice) {
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    updateCart();

    
    document.querySelector('.cart-icon').style.transform = 'scale(1.2)';
setTimeout(() => {
    document.querySelector('.cart-icon').style.transform = 'scale(1)';
}, 200);

}

// UPDATE CART UI
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalEl = document.getElementById('total');

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');

        li.innerHTML = `
            ${item.name} - ₦${item.price} 
            <button onclick="changeQuantity(${index}, -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="changeQuantity(${index}, 1)">+</button>
            <button onclick="removeItem(${index})">Remove</button>
        `;

        cartItems.appendChild(li);

        total += item.price * item.quantity;
    });

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    totalEl.textContent = total;
}

// CHANGE QUANTITY
function changeQuantity(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCart();
}

// REMOVE ITEM
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// TOGGLE CART SIDEBAR
function toggleCart() {
    const cart = document.getElementById('cart');
    const overlay = document.getElementById('cart-overlay');

    cart.classList.toggle('active');
    overlay.classList.toggle('active');
}



// CHECKOUT FUNCTION VIA WHATSAPP
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    let total = 0;
    let message = 'Hello, I want to place an order:\n\n';
    cart.forEach(item => {
        message += `${item.name} x${item.quantity} - ₦${item.price * item.quantity}\n`;
        total += item.price * item.quantity;
    });
    message += `\nTotal: ₦${total}\nPlease let me know how to pay.`;

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '2349039375422'; // Replace with your number
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp link in a new tab
    window.open(whatsappLink, '_blank');

    // Clear cart
    cart = [];
    updateCart();
    toggleCart();
}

document.addEventListener("DOMContentLoaded", function () {

    const video = document.getElementById("lazyVideo");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                const source = video.querySelector("source");
                source.src = source.dataset.src;

                video.load();
                observer.unobserve(video);
            }
        });
    });

    observer.observe(video);
});

 