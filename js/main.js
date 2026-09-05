function agregarAlCarrito (nombre,precio,imagen){
    let carrito = JSON.parse(localStorage.getItem("carritoFerreteria")) || [];

    carrito.push({
        nombre: nombre,
        precio: precio,
        imagen: imagen
    });

    localStorage.setItem("carritoFerreteria", JSON.stringify(carrito));

    alert(`¡"${nombre}" se agrego al carrito!`); 

    console.log("Contenido del Carrito:", carrito);

}