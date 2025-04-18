// Array para almacenar los productos del carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Actualiza el contador de productos
function actualizarContador() {
    const contador = document.getElementById('contador-productos');
    if (contador) {
        contador.textContent = carrito.length;
    }
}

// Agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
}

// Ir a la página de carrito
function irAPagar() {
    window.location.href = 'carrito.html';
}

// Eliminar un producto del carrito
function eliminarDelCarrito(indice) {
    carrito.splice(indice, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito(); // Actualiza la lista en carrito.html
}

// Mostrar los productos en carrito.html
function mostrarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const total = document.getElementById('total');
    if (listaCarrito && total) {
        listaCarrito.innerHTML = '';
        let sumaTotal = 0;
        carrito.forEach((producto, index) => {
            const li = document.createElement('li');
            li.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.onclick = () => eliminarDelCarrito(index);
            li.appendChild(botonEliminar);
            listaCarrito.appendChild(li);
            sumaTotal += producto.precio;
        });
        total.textContent = sumaTotal.toFixed(2);
    }
}

// Inicializa el carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarContador();
    mostrarCarrito();
    const toggleLinks = document.querySelectorAll('.toggle-link');

    toggleLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Evita que el enlace recargue la página
            const contenido = link.nextElementSibling; // Selecciona el contenido asociado
            contenido.classList.toggle('mostrar'); // Alterna la clase "mostrar"
        });
    });
});
