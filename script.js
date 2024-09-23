// Wait for the document to fully load
document.addEventListener('DOMContentLoaded', function () {
    let cartItems = [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.shop-item-button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            const itemCard = event.target.closest('.card');
            const title = itemCard.querySelector('.shop-item-title').innerText;
            const price = parseFloat(itemCard.querySelector('.shop-item-price').innerText.replace('Rs ', ''));
            const imageSrc = itemCard.querySelector('.shop-item-image').src;

            addItemToCart(title, price, imageSrc);
            updateCartTotal();
        });
    });

    // Add an item to the cart
    function addItemToCart(title, price, imageSrc) {
        const existingItem = cartItems.find(item => item.title === title);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ title, price, imageSrc, quantity: 1 });
        }
        renderCartItems();
    }

    // Render cart items dynamically
    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        cartItems.forEach(item => {
            const cartRow = document.createElement('li');
            cartRow.classList.add('list-group-item');
            cartRow.innerHTML = `
                <div class="cart-item">
                    <img src="${item.imageSrc}" alt="${item.title}" width="50" height="50">
                    <span class="cart-item-title">${item.title}</span>
                    <div class="cart-item-quantity">
                        <button class="decrement btn btn-sm btn-outline-primary">-</button>
                        <span>${item.quantity}</span>
                        <button class="increment btn btn-sm btn-outline-primary">+</button>
                    </div>
                    <span class="cart-item-price">Rs ${item.price.toFixed(2)}</span>
                    <button class="remove-btn btn btn-sm btn-outline-danger">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartRow);

            // Add event listeners for increment, decrement, and remove buttons
            cartRow.querySelector('.increment').addEventListener('click', () => {
                incrementQuantity(item.title);
            });

            cartRow.querySelector('.decrement').addEventListener('click', () => {
                decrementQuantity(item.title);
            });

            cartRow.querySelector('.remove-btn').addEventListener('click', () => {
                removeItemFromCart(item.title);
            });
        });

        cartCountElement.innerText = cartItems.reduce((total, item) => total + item.quantity, 0);
    }

    // Increment item quantity
    function incrementQuantity(title) {
        const item = cartItems.find(item => item.title === title);
        if (item) {
            item.quantity += 1;
            renderCartItems();
            updateCartTotal();
        }
    }

    // Decrement item quantity
    function decrementQuantity(title) {
        const item = cartItems.find(item => item.title === title);
        if (item && item.quantity > 1) {
            item.quantity -= 1;
            renderCartItems();
            updateCartTotal();
        }
    }

    // Remove item from cart
    function removeItemFromCart(title) {
        cartItems = cartItems.filter(item => item.title !== title);
        renderCartItems();
        updateCartTotal();
    }

    // Update total price
    function updateCartTotal() {
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalElement.innerText = `Rs ${total.toFixed(2)}`;
    }
});
