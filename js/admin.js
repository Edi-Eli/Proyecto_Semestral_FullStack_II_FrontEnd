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

const PRODUCTOS_SEMILLA = [
    { codigo: "FER001", nombre: "Caja De Herramientas", descripcion: "Caja de herramientas con 20 piezas", precio: 8990, stock: 15, stockCritico: 4, categoria: "Herramientas Manuales", imagen: "../assets/imagenes/images.jpeg" },
    { codigo: "FER002", nombre: "Esmeril Angular Electrico", descripcion: "Esmeril angular para metal y concreto", precio: 50000, stock: 9, stockCritico: 3, categoria: "Herramientas Electricas", imagen: "../assets/imagenes/8739196_01.jpg" },
    { codigo: "FER003", nombre: "Pack Taladro Inalambrico", descripcion: "Taladro inalambrico con bateria y cargador", precio: 95000, stock: 3, stockCritico: 5, categoria: "Herramientas Electricas", imagen: "../assets/imagenes/w=1500,h=1500,fit=cover.png" },
    { codigo: "FER004", nombre: "Cepillo Electrico", descripcion: "Cepillo electrico multiuso", precio: 117290, stock: 6, stockCritico: 2, categoria: "Herramientas Electricas", imagen: "../assets/imagenes/images (1).jpeg" },
    { codigo: "FER005", nombre: "13 En 1 Destornillador", descripcion: "Set destornillador 13 en 1", precio: 23900, stock: 20, stockCritico: 5, categoria: "Herramientas Manuales", imagen: "../assets/imagenes/images (3).jpeg" },
    { codigo: "FER006", nombre: "Mazo 16", descripcion: "Mazo de 16 onzas", precio: 20000, stock: 12, stockCritico: 4, categoria: "Herramientas Manuales", imagen: "../assets/imagenes/images (2).jpeg" },
    { codigo: "FER007", nombre: "Martillo Carpintero Madera", descripcion: "Martillo de carpintero con mango de madera", precio: 14500, stock: 2, stockCritico: 3, categoria: "Herramientas Manuales", imagen: "../assets/imagenes/descargar.jpeg" },
    { codigo: "FER008", nombre: "Set de Alicates Universal", descripcion: "Set de alicates universales", precio: 30000, stock: 10, stockCritico: 3, categoria: "Herramientas Manuales", imagen: "../assets/imagenes/alicate.png" }
];

const USUARIOS_SEMILLA = [
    { run: "195436789", nombre: "Sebastian", apellidos: "Perez Gonzalez", correo: "sebas@duoc.cl", fechaNacimiento: "2000-05-15", tipoUsuario: "Administrador", region: "Región Metropolitana de Santiago", comuna: "Santiago", direccion: "Av. Siempre Viva 123" },
    { run: "123456785", nombre: "Eduardo", apellidos: "Lopez Muñoz", correo: "edi@profesor.duoc.cl", fechaNacimiento: "1995-03-20", tipoUsuario: "Vendedor", region: "Región de Valparaíso", comuna: "Viña del Mar", direccion: "Calle Los Pinos 45" },
    { run: "204567891", nombre: "Maria", apellidos: "Torres Silva", correo: "maria.torres@gmail.com", fechaNacimiento: "1998-11-02", tipoUsuario: "Cliente", region: "Región Metropolitana de Santiago", comuna: "Providencia", direccion: "Pasaje Las Flores 8" },
    { run: "167895433", nombre: "Carlos", apellidos: "Rojas Diaz", correo: "carlos.rojas@duoc.cl", fechaNacimiento: "1990-07-12", tipoUsuario: "Cliente", region: "Región del Biobío", comuna: "Concepción", direccion: "Av. Collao 1550" },
    { run: "111111111", nombre: "Jose", apellidos: "Fernandez Soto", correo: "jose.fernandez@gmail.com", fechaNacimiento: "1987-01-30", tipoUsuario: "Vendedor", region: "Región Metropolitana de Santiago", comuna: "Maipú", direccion: "Villa Los Volcanes 210" }
];

function minLength(valor, minimo) {
    return String(valor).trim().length >= minimo;
}

function soloEnteros(valor) {
    return /^\d+$/.test(valor);
}

function soloDecimales(valor) {
    return /^\d+(\.\d{1,2})?$/.test(valor.replace(",", "."));
}

function minimo(valor, minimoAceptado) {
    return Number(valor.replace(",", ".")) >= minimoAceptado;
}