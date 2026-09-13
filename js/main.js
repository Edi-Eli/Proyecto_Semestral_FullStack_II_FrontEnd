function agregarAlCarrito (nombre,precio){
    let carrito = JSON.parse(localStorage.getItem("carritoFerreteria")) || [];

    carrito.push({
        nombre: nombre,
        precio: precio
    });

    localStorage.setItem("carritoFerreteria", JSON.stringify(carrito));

    alert(`¡"${nombre}" se agrego al carrito!`);

    console.log("Contenido del Carrito:", carrito);

}