document.addEventListener('DOMContentLoaded', function() {
    const hamburguerIcon = document.querySelector('.hamburguer-icon');
    const navElements = document.querySelector('.nav-elements');
    const navLinks = document.querySelectorAll('.nav-elements a'); // Selección de todos los enlaces dentro del menú

    // Función para toggle del menú
    hamburguerIcon.addEventListener('click', function() {
        navElements.classList.toggle('active');
    });

    // Función para cerrar el menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navElements.classList.contains('active')) {
                navElements.classList.remove('active');
            }
        });
    });

    // Función para cerrar el menú si el clic es fuera
    document.addEventListener('click', function(event) {
        if (!navElements.contains(event.target) && !hamburguerIcon.contains(event.target)) {
            if (navElements.classList.contains('active')) {
                navElements.classList.remove('active');
            }
        }
    });
});
