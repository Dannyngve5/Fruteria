document.addEventListener('DOMContentLoaded', function () {
const hamburguerIcon = document.querySelector('.hamburguer-icon');
const navElements = document.querySelector('.nav-elements');
const navLinks = document.querySelectorAll('.nav-elements a');

const cartElement = document.querySelector('.cart-container a');
const cartMenu = document.querySelector('.cart-slideout-menu');
const overlayCart = document.querySelector('.overlay-cart');
const closeCartButton = document.querySelector('.close-cart');

const cartCountElement = document.querySelector('.cart-count');
const cartTotalElement = document.querySelector('.cart-total');

const products = document.querySelectorAll('.product');
const contactForm = document.querySelector('#contact-form');

let cart = [];

function openCart() {
    cartMenu.classList.add('show');
    overlayCart.style.display = 'block';
    document.body.style.overflow = 'hidden';

    setTimeout(function () {
        overlayCart.style.opacity = '1';
    }, 10);
}

function closeCart() {
    cartMenu.classList.remove('show');
    overlayCart.style.opacity = '0';
    document.body.style.overflow = '';

    setTimeout(function () {
        if (!cartMenu.classList.contains('show')) {
            overlayCart.style.display = 'none';
        }
    }, 300);
}

if (hamburguerIcon && navElements) {
    hamburguerIcon.addEventListener('click', function (event) {
        event.stopPropagation();
        navElements.classList.toggle('active');
    });
}

navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        navElements.classList.remove('active');
    });
});

document.addEventListener('click', function () {
    if (navElements) {
        navElements.classList.remove('active');
    }
});

if (navElements) {
    navElements.addEventListener('click', function (event) {
        event.stopPropagation();
    });
}

if (cartElement) {
    cartElement.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        openCart();
    });
}

if (closeCartButton) {
    closeCartButton.addEventListener('click', function () {
        closeCart();
    });
}

if (overlayCart) {
    overlayCart.addEventListener('click', function () {
        closeCart();
    });
}

if (cartMenu) {
    cartMenu.addEventListener('click', function (event) {
        event.stopPropagation();
    });
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeCart();

        if (navElements) {
            navElements.classList.remove('active');
        }
    }
});

products.forEach(function (product) {
    const plus = product.querySelector('.plus');
    const minus = product.querySelector('.minus');
    const num = product.querySelector('.num');

    if (!plus || !minus || !num) {
        return;
    }

    plus.addEventListener('click', function () {
        let quantity = parseInt(num.textContent, 10);

        if (isNaN(quantity)) {
            quantity = 0;
        }

        quantity++;
        num.textContent = quantity;
    });

    minus.addEventListener('click', function () {
        let quantity = parseInt(num.textContent, 10);

        if (isNaN(quantity)) {
            quantity = 0;
        }

        if (quantity > 0) {
            quantity--;
            num.textContent = quantity;
        }
    });
});

products.forEach(function (product) {
    const addButton = product.querySelector('button');
    const quantityElement = product.querySelector('.num');
    const nameElement = product.querySelector('.fruit-name');
    const priceElement = product.querySelector('.cost');

    if (!addButton || !quantityElement || !nameElement || !priceElement) {
        return;
    }

    addButton.addEventListener('click', function () {
        const name = nameElement.textContent.trim();
        const priceText = priceElement.textContent.trim();
        const quantity = parseInt(quantityElement.textContent, 10);

        const price = parseFloat(
            priceText
                .replace('$', '')
                .replace(/\./g, '')
                .replace(',', '.')
        );

        if (isNaN(quantity) || quantity <= 0) {
            alert('Selecciona una cantidad antes de añadir el producto.');
            return;
        }

        if (isNaN(price)) {
            alert('No se pudo obtener el precio del producto.');
            return;
        }

        const existingProduct = cart.find(function (item) {
            return item.name === name;
        });

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: quantity
            });
        }

        quantityElement.textContent = '0';

        updateCart();
        openCart();
    });
});

function updateCart() {
    const cartContent = cartMenu.querySelector('.cart-content');

    if (!cartContent) {
        return;
    }

    const totalQuantity = cart.reduce(function (total, item) {
        return total + item.quantity;
    }, 0);

    const totalPrice = cart.reduce(function (total, item) {
        return total + (item.price * item.quantity);
    }, 0);

    cartCountElement.textContent = totalQuantity;
    cartTotalElement.textContent = '$' + totalPrice.toLocaleString('es-CO');

    if (cart.length === 0) {
        cartContent.innerHTML = `
            <p class="empty-cart">No hay items en el carrito</p>
        `;

        return;
    }

    cartContent.innerHTML = '';

    cart.forEach(function (item, index) {
        const subtotal = item.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toLocaleString('es-CO')} × ${item.quantity}</p>
                <strong>$${subtotal.toLocaleString('es-CO')}</strong>
            </div>

            <button
                class="remove-item"
                type="button"
                data-index="${index}"
            >
                Eliminar
            </button>
        `;

        cartContent.appendChild(cartItem);
    });

    const totalElement = document.createElement('div');
    totalElement.classList.add('cart-final-total');

    totalElement.innerHTML = `
        <strong>Total: $${totalPrice.toLocaleString('es-CO')}</strong>
    `;

    cartContent.appendChild(totalElement);

    const clearButton = document.createElement('button');
    clearButton.classList.add('clear-cart');
    clearButton.type = 'button';
    clearButton.textContent = 'Vaciar carrito';

    cartContent.appendChild(clearButton);

    const removeButtons = cartContent.querySelectorAll('.remove-item');

    removeButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const index = parseInt(button.dataset.index, 10);

            if (!isNaN(index)) {
                cart.splice(index, 1);
                updateCart();
            }
        });
    });

    clearButton.addEventListener('click', function () {
        cart = [];
        updateCart();
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.querySelector('#name');
        const email = document.querySelector('#email');
        const subject = document.querySelector('#subject');
        const message = document.querySelector('#message');

        const nameValue = name.value.trim();
        const emailValue = email.value.trim();
        const subjectValue = subject.value.trim();
        const messageValue = message.value.trim();

        if (
            nameValue === '' ||
            emailValue === '' ||
            subjectValue === '' ||
            messageValue === ''
        ) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        if (!email.checkValidity()) {
            alert('Introduce un correo electrónico válido.');
            email.focus();
            return;
        }

        alert(
            'Gracias, ' +
            nameValue +
            '. Tu mensaje ha sido enviado correctamente.'
        );

        contactForm.reset();
    });
}

const whatsappButton = document.querySelector('.btn-whatsapp');

if (whatsappButton) {
    whatsappButton.addEventListener('click', function () {
        const message = encodeURIComponent(
            'Hola, quiero comprar fruta'
        );

        whatsappButton.href =
            'https://api.whatsapp.com/send?phone=5217321196546&text=' +
            message;
    });
}

updateCart();

});
