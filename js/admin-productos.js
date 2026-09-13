const CATEGORIAS_PRODUCTO = ["Herramientas Manuales", "Herramientas Electricas", "Jardineria", "Accesorios", "Seguridad"];

const CAMPOS_PRODUCTO = [
    "codigo-producto",
    "nombre-producto",
    "descripcion-producto",
    "precio-producto",
    "stock-producto",
    "stock-critico-producto",
    "categoria-producto"
];

function obtenerMensajeErrorProducto(campo) {
    const valor = document.getElementById(campo).value.trim();
    switch (campo) {
        case "codigo-producto":
            if (!requerido(valor)) {
                return "El codigo es requerido.";
            }
            if (!minLength(valor, 3)) {
                return "El codigo debe tener al menos 3 caracteres.";
            }
            return "";
        case "nombre-producto":
            if (!requerido(valor)) {
                return "El nombre es requerido.";
            }
            if (!maxCaracteres(valor, 100)) {
                return "El nombre no puede superar los 100 caracteres.";
            }
            return "";
        case "descripcion-producto":
            if (valor !== "" && !maxCaracteres(valor, 500)) {
                return "La descripcion no puede superar los 500 caracteres.";
            }
            return "";
        case "precio-producto":
            if (!requerido(valor)) {
                return "El precio es requerido.";
            }
            if (!soloDecimales(valor)) {
                return "El precio debe ser un numero valido.";
            }
            if (!minimo(valor, 0)) {
                return "El precio minimo es 0 (producto FREE).";
            }
            return "";
        case "stock-producto":
            if (!requerido(valor)) {
                return "El stock es requerido.";
            }
            if (!soloEnteros(valor)) {
                return "El stock debe ser un numero entero.";
            }
            if (!minimo(valor, 0)) {
                return "El stock minimo es 0.";
            }
            return "";
        case "stock-critico-producto":
            if (valor !== "" && !soloEnteros(valor)) {
                return "El stock critico debe ser un numero entero.";
            }
            if (valor !== "" && !minimo(valor, 0)) {
                return "El stock critico minimo es 0.";
            }
            return "";
        case "categoria-producto":
            if (!requerido(valor)) {
                return "Debe seleccionar una categoria.";
            }
            return "";
        default:
            return "";
    }
}

function validarCampoProducto(campo) {
    const elemento = document.getElementById(campo);
    const mensaje = obtenerMensajeErrorProducto(campo);
    const contenedorError = document.getElementById("error-" + campo);
    if (mensaje !== "") {
        elemento.classList.add("input-error");
        contenedorError.textContent = mensaje;
        return false;
    }
    elemento.classList.remove("input-error");
    contenedorError.textContent = "";
    return true;
}

function validarFormularioProducto() {
    let valido = true;
    CAMPOS_PRODUCTO.forEach((campo) => {
        if (!validarCampoProducto(campo)) {
            valido = false;
        }
    });
    return valido;
}

function conectarValidacionProducto(campo) {
    const elemento = document.getElementById(campo);
    elemento.addEventListener("input", () => validarCampoProducto(campo));
    elemento.addEventListener("blur", () => validarCampoProducto(campo));
}

function llenarSelectCategoria() {
    const select = document.getElementById("categoria-producto");
    const opciones = CATEGORIAS_PRODUCTO.map((categoria) => `<option value="${categoria}">${categoria}</option>`).join("");
    select.innerHTML = '<option value="">Seleccione una categoria</option>' + opciones;
}

function limpiarFormularioProducto() {
    document.getElementById("form-producto").reset();
    document.getElementById("indice-producto").value = "";
    document.getElementById("titulo-form-producto").textContent = "Nuevo producto";
    CAMPOS_PRODUCTO.forEach((campo) => validarCampoProducto(campo));
}

function editarProducto(indice) {
    const producto = obtenerProductos()[indice];
    document.getElementById("indice-producto").value = String(indice);
    document.getElementById("titulo-form-producto").textContent = "Editar producto";
    document.getElementById("codigo-producto").value = producto.codigo;
    document.getElementById("nombre-producto").value = producto.nombre;
    document.getElementById("descripcion-producto").value = producto.descripcion;
    document.getElementById("precio-producto").value = producto.precio;
    document.getElementById("stock-producto").value = producto.stock;
    document.getElementById("stock-critico-producto").value = producto.stockCritico;
    document.getElementById("categoria-producto").value = producto.categoria;
    document.getElementById("imagen-producto").value = producto.imagen;
    CAMPOS_PRODUCTO.forEach((campo) => validarCampoProducto(campo));
}

function eliminarProducto(indice) {
    const productos = obtenerProductos();
    const producto = productos[indice];
    if (!confirm(`Desea eliminar el producto ${producto.nombre}?`)) {
        return;
    }
    productos.splice(indice, 1);
    guardarProductos(productos);
    renderTablaProductos();
}

function guardarProducto(evento) {
    evento.preventDefault();
    if (!validarFormularioProducto()) {
        return;
    }
    const indiceEditar = document.getElementById("indice-producto").value;
    const producto = {
        codigo: document.getElementById("codigo-producto").value.trim(),
        nombre: document.getElementById("nombre-producto").value.trim(),
        descripcion: document.getElementById("descripcion-producto").value.trim(),
        precio: Number(document.getElementById("precio-producto").value.replace(",", ".")),
        stock: Number(document.getElementById("stock-producto").value),
        stockCritico: document.getElementById("stock-critico-producto").value.trim() === "" ? 0 : Number(document.getElementById("stock-critico-producto").value),
        categoria: document.getElementById("categoria-producto").value,
        imagen: document.getElementById("imagen-producto").value.trim()
    };
    const productos = obtenerProductos();
    if (indiceEditar !== "") {
        productos[Number(indiceEditar)] = producto;
    } else {
        productos.push(producto);
    }
    guardarProductos(productos);
    if (producto.stock <= producto.stockCritico) {
        alert(`El producto ${producto.nombre} tiene stock bajo o critico (${producto.stock} unidades).`);
    }
    renderTablaProductos();
    limpiarFormularioProducto();
}

llenarSelectCategoria();
CAMPOS_PRODUCTO.forEach(conectarValidacionProducto);
document.getElementById("form-producto").addEventListener("submit", guardarProducto);
renderTablaProductos();