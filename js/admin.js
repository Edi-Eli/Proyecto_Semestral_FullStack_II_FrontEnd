const CLAVE_PRODUCTOS = "productosAdmin";
const CLAVE_USUARIOS = "usuariosAdmin";

function obtenerProductos() {
    const guardados = localStorage.getItem(CLAVE_PRODUCTOS);
    if (guardados === null) {
        localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(PRODUCTOS_SEMILLA));
        return [...PRODUCTOS_SEMILLA];
    }
    return JSON.parse(guardados);
}

function guardarProductos(lista) {
    localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(lista));
}

function obtenerUsuarios() {
    const guardados = localStorage.getItem(CLAVE_USUARIOS);
    if (guardados === null) {
        localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(USUARIOS_SEMILLA));
        return [...USUARIOS_SEMILLA];
    }
    return JSON.parse(guardados);
}

function guardarUsuarios(lista) {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(lista));
}

function formatearPrecioCLP(precio) {
    return "$" + Number(precio).toLocaleString("es-CL");
}

function renderTablaProductos() {
    const tabla = document.getElementById("cuerpo-tabla-productos");
    if (!tabla) {
        return;
    }
    const productos = obtenerProductos();
    if (productos.length === 0) {
        tabla.innerHTML = '<tr><td colspan="7">No hay productos registrados.</td></tr>';
        return;
    }
    tabla.innerHTML = "";
    productos.forEach((producto, indice) => {
        const claseStock = producto.stock <= producto.stockCritico ? "stock-bajo" : "";
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${producto.codigo}</td>
            <td>${producto.nombre}</td>
            <td>${producto.categoria}</td>
            <td>${formatearPrecioCLP(producto.precio)}</td>
            <td class="${claseStock}">${producto.stock}</td>
            <td>${producto.stockCritico}</td>
            <td>
                <button type="button" class="btn-admin btn-editar" onclick="editarProducto(${indice})">Editar</button>
                <button type="button" class="btn-admin btn-eliminar" onclick="eliminarProducto(${indice})">Eliminar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });
}

function renderTablaUsuarios() {
    const tabla = document.getElementById("cuerpo-tabla-usuarios");
    if (!tabla) {
        return;
    }
    const usuarios = obtenerUsuarios();
    if (usuarios.length === 0) {
        tabla.innerHTML = '<tr><td colspan="6">No hay usuarios registrados.</td></tr>';
        return;
    }
    tabla.innerHTML = "";
    usuarios.forEach((usuario, indice) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${usuario.run}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.apellidos}</td>
            <td>${usuario.correo}</td>
            <td>${usuario.tipoUsuario}</td>
            <td>
                <button type="button" class="btn-admin btn-editar" onclick="editarUsuario(${indice})">Editar</button>
                <button type="button" class="btn-admin btn-eliminar" onclick="eliminarUsuario(${indice})">Eliminar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });
}