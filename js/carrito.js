const contenedorLista = document.getElementById("lista-carrito");
const elementoTotal = document.getElementById("total-precio");

let carrito = JSON.parse(localStorage.getItem("carritoFerreteria")) || [];

function mostrarCarrito() {
    if (carrito.length === 0) {
        contenedorLista.innerHTML = "<p>El carrito esta vacio.</p>";
        elementoTotal.textContent = "$0";
        return
    }

    contenedorLista.innerHTML = "";
    let totalAcumulado = 0;

    carrito.forEach((producto, indice) => {
        totalAcumulado += producto.precio;

        const item = document.createElement("div");
        item.classList.add("item-carrito");

        item.innerHTML = `
            <span><strong>${producto.nombre}</strong></span>
            <span>$${producto.precio.toLocaleString("es-CL")}</span>
            <button class="btn-eliminar" onlick="eliminarProducto(${indice})">X</button>
        `;
    })

    elementoTotal.textContent = `$${totalAcumulado.toLocaleString("es-CL")}`;

}

function eliminarProducto(indice) {
    carrito.splice(indice,1);
    localStorage.setItem("carritoFerretaria", JSON.stringify(carrito));
    mostrarCarrito();
}

function vaciarCarrito() {
    localStorage.removeItem("carritoFerreteria");
    carrito = [];
    mostrarCarrito();
}

mostrarCarrito();