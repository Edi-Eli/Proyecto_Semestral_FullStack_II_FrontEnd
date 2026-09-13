const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));
const producto = PRODUCTOS.find(p => p.id === id);
const contenedor = document.getElementById("detalle-producto");

if (!producto) {
    contenedor.innerHTML = "<p>Producto no encontrado</p>";
} else {
    const imagen = producto.imagen || "assets/imagenes/image.png";

    const caracteristicas = Array.isArray(producto.caracteristicas)
        ? producto.caracteristicas
        : [producto.caracteristicas];

    contenedor.innerHTML = `
        <div><img src="${imagen}" alt="${producto.nombre}"></div>
        <div>
            <h2 class="det-tit">${producto.nombre}</h2>
            <p class="det-cat">${producto.categoria}</p>
            <p class="det-precio">$${producto.precio.toLocaleString("es-CL")}</p>
            <p class="det-stock">Stock: ${producto.stock}</p>
            <hr>
            <h3>Descripción</h3>
            <p>${producto.descripcion}</p>
            <h3>Características</h3>
            <ul>${caracteristicas.map(c => `<li>${c}</li>`).join("")}</ul>
            <h3>Material</h3><p>${producto.material}</p>
            <button class="btn-pro2" onclick="agregarAlCarrito('${producto.nombre}',${producto.precio},'${imagen}')">Agregar al Carro</button>
            <button class="btn-pro2" onclick="window.location.href='productos.html'">Volver a Productos</button>
        </div>`;
}