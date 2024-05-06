document.addEventListener('DOMContentLoaded', function() {
    const hamburguerIcon = document.querySelector('.hamburguer-icon');
    const navElements = document.querySelector('.nav-elements');
    const navLinks = document.querySelectorAll('.nav-elements a'); // Selección de todos los enlaces dentro del menú

    // Toggle del menú
    hamburguerIcon.addEventListener('click', function() {
        navElements.classList.toggle('active');
    });

    // Cerrar el menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navElements.classList.contains('active')) {
                navElements.classList.remove('active');
            }
        });
    });

    // Cerrar el menú si el clic es fuera
    document.addEventListener('click', function(event) {
        if (!navElements.contains(event.target) && !hamburguerIcon.contains(event.target)) {
            if (navElements.classList.contains('active')) {
                navElements.classList.remove('active');
            }
        }
    });

    // Controladores para los botones de cantidad
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
