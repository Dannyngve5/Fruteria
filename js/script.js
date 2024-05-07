document.addEventListener('DOMContentLoaded', function() {
    const hamburguerIcon = document.querySelector('.hamburguer-icon');
    const navElements = document.querySelector('.nav-elements');
    const navLinks = document.querySelectorAll('.nav-elements a');
    const cartElement = document.querySelector('.cart-container a');
    const cartMenu = document.querySelector('.cart-slideout-menu');
    const overlayCart = document.querySelector('.overlay-cart');
    const body = document.querySelector('body');

    // Función para abrir el menú del carrito
    cartElement.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        cartMenu.classList.add("show"); 
        overlayCart.style.display = "block";
        cartMenu.style.right = "0";
        setTimeout(() => overlayCart.style.opacity = '1', 0.1);
    });

    // Función para cerrar el menú del carrito al hacer clic fuera
    overlayCart.addEventListener('click', function() {
        cartMenu.classList.remove("show");
        overlayCart.style.opacity = '0';
        setTimeout(() => overlayCart.style.display = 'none', 300);
    });

    // Manejo del menú hamburguesa y el carrito en el mismo clic
    body.addEventListener('click', function() {
        if (navElements.classList.contains('active')) {
            navElements.classList.remove('active');
        }
    }, true); // True para que se ejecute en la fase de captura y antes del bubbling

    // Prevenir la propagación al hacer clic en el menú del carrito
    cartMenu.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // Toggle del menú de hamburguesa
    hamburguerIcon.addEventListener('click', function(event) {
        event.stopPropagation();
        navElements.classList.toggle('active');
    });

    // Cierra el menú y el overlay cuando se hace clic en los enlaces del menú de hamburguesa
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navElements.classList.contains('active')) {
                navElements.classList.remove('active');
            }
            if (cartMenu.style.right === "0") {
                cartMenu.style.right = "-100%";
                overlayCart.style.opacity = '0';
                setTimeout(() => overlayCart.style.display = 'none', 300);
            }
        });
    });

    // Controladores para los botones de cantidad de los productos
    document.querySelectorAll('.plus').forEach((plus, index) => {
        plus.addEventListener('click', () => {
            const num = document.querySelectorAll('.num')[index];
            let value = parseInt(num.innerText, 10);
            value++;
            num.innerText = value;
        });
    });

    document.querySelectorAll('.minus').forEach((minus, index) => {
        minus.addEventListener('click', () => {
            const num = document.querySelectorAll('.num')[index];
            let value = parseInt(num.innerText, 10);
            if (value > 0) value--;
            num.innerText = value;
        });
    });
});
