const TIPOS_USUARIO = ["Administrador", "Cliente", "Vendedor"];

const CAMPOS_USUARIO = [
    "run-usuario",
    "nombre-usuario",
    "apellidos-usuario",
    "correo-usuario",
    "fecha-nacimiento-usuario",
    "tipo-usuario",
    "region-usuario",
    "comuna-usuario",
    "direccion-usuario"
];

function llenarSelectTipoUsuario() {
    const select = document.getElementById("tipo-usuario");
    const opciones = TIPOS_USUARIO.map((tipo) => `<option value="${tipo}">${tipo}</option>`).join("");
    select.innerHTML = '<option value="">Seleccione un tipo de usuario</option>' + opciones;
}

function llenarSelectRegion() {
    const select = document.getElementById("region-usuario");
    if (typeof REGIONES === "undefined") {
        select.innerHTML = '<option value="">Pendiente: regiones.js</option>';
        return;
    }
    const opciones = REGIONES.map((region) => `<option value="${region.nombre}">${region.nombre}</option>`).join("");
    select.innerHTML = '<option value="">Seleccione una region</option>' + opciones;
}

function llenarSelectComuna() {
    const selectComuna = document.getElementById("comuna-usuario");
    const region = document.getElementById("region-usuario").value;
    if (typeof REGIONES === "undefined" || region === "") {
        selectComuna.innerHTML = '<option value="">Seleccione una region primero</option>';
        return;
    }
    const regionSeleccionada = REGIONES.find((r) => r.nombre === region);
    const opciones = regionSeleccionada ? regionSeleccionada.comunas.map((comuna) => `<option value="${comuna}">${comuna}</option>`).join("") : "";
    selectComuna.innerHTML = '<option value="">Seleccione una comuna</option>' + opciones;
}

function obtenerMensajeErrorUsuario(campo) {
    const valor = document.getElementById(campo).value.trim();
    switch (campo) {
        case "run-usuario":
            if (!requerido(valor)) {
                return "El run es requerido.";
            }
            if (!minLength(valor, 7) || !maxCaracteres(valor, 9)) {
                return "El run debe tener entre 7 y 9 caracteres.";
            }
            if (!validarRun(valor)) {
                return "El run no es valido, revise el digito verificador.";
            }
            return "";
        case "nombre-usuario":
            if (!requerido(valor)) {
                return "El nombre es requerido.";
            }
            if (!maxCaracteres(valor, 50)) {
                return "El nombre no puede superar los 50 caracteres.";
            }
            return "";
        case "apellidos-usuario":
            if (!requerido(valor)) {
                return "Los apellidos son requeridos.";
            }
            if (!maxCaracteres(valor, 100)) {
                return "Los apellidos no pueden superar los 100 caracteres.";
            }
            return "";
        case "correo-usuario":
            if (!requerido(valor)) {
                return "El correo es requerido.";
            }
            if (!maxCaracteres(valor, 100)) {
                return "El correo no puede superar los 100 caracteres.";
            }
            if (!esCorreoValido(valor)) {
                return "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
            }
            return "";
        case "fecha-nacimiento-usuario":
            return "";
        case "tipo-usuario":
            if (!requerido(valor)) {
                return "Debe seleccionar un tipo de usuario.";
            }
            return "";
        case "region-usuario":
            if (!requerido(valor)) {
                return "Debe seleccionar una region.";
            }
            return "";
        case "comuna-usuario":
            if (!requerido(valor)) {
                return "Debe seleccionar una comuna.";
            }
            return "";
        case "direccion-usuario":
            if (!requerido(valor)) {
                return "La direccion es requerida.";
            }
            if (!maxCaracteres(valor, 300)) {
                return "La direccion no puede superar los 300 caracteres.";
            }
            return "";
        default:
            return "";
    }
}

function validarCampoUsuario(campo) {
    const elemento = document.getElementById(campo);
    const mensaje = obtenerMensajeErrorUsuario(campo);
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

function validarFormularioUsuario() {
    let valido = true;
    const camposObligatorios = [
        "run-usuario",
        "nombre-usuario",
        "apellidos-usuario",
        "correo-usuario",
        "fecha-nacimiento-usuario",
        "tipo-usuario",
        "direccion-usuario"
    ];
    camposObligatorios.forEach((campo) => {
        if (!validarCampoUsuario(campo)) {
            valido = false;
        }
    });
    if (typeof REGIONES !== "undefined") {
        ["region-usuario", "comuna-usuario"].forEach((campo) => {
            if (!validarCampoUsuario(campo)) {
                valido = false;
            }
        });
    }
    return valido;
}

function conectarValidacionUsuario(campo) {
    const elemento = document.getElementById(campo);
    if (!elemento) {
        return;
    }
    elemento.addEventListener("input", () => validarCampoUsuario(campo));
    elemento.addEventListener("blur", () => validarCampoUsuario(campo));
    elemento.addEventListener("change", () => validarCampoUsuario(campo));
}

function limpiarFormularioUsuario() {
    document.getElementById("form-usuario").reset();
    document.getElementById("indice-usuario").value = "";
    document.getElementById("titulo-form-usuario").textContent = "Nuevo usuario";
    llenarSelectTipoUsuario();
    llenarSelectRegion();
    llenarSelectComuna();
    CAMPOS_USUARIO.forEach((campo) => validarCampoUsuario(campo));
}

function editarUsuario(indice) {
    const usuario = obtenerUsuarios()[indice];
    document.getElementById("indice-usuario").value = String(indice);
    document.getElementById("titulo-form-usuario").textContent = "Editar usuario";
    document.getElementById("run-usuario").value = usuario.run;
    document.getElementById("nombre-usuario").value = usuario.nombre;
    document.getElementById("apellidos-usuario").value = usuario.apellidos;
    document.getElementById("correo-usuario").value = usuario.correo;
    document.getElementById("fecha-nacimiento-usuario").value = usuario.fechaNacimiento;
    document.getElementById("tipo-usuario").value = usuario.tipoUsuario;
    document.getElementById("direccion-usuario").value = usuario.direccion;
    if (typeof REGIONES !== "undefined") {
        document.getElementById("region-usuario").value = usuario.region;
        llenarSelectComuna();
        document.getElementById("comuna-usuario").value = usuario.comuna;
    }
    CAMPOS_USUARIO.forEach((campo) => validarCampoUsuario(campo));
}

function eliminarUsuario(indice) {
    const usuarios = obtenerUsuarios();
    const usuario = usuarios[indice];
    if (!confirm(`Desea eliminar al usuario ${usuario.nombre} ${usuario.apellidos}?`)) {
        return;
    }
    usuarios.splice(indice, 1);
    guardarUsuarios(usuarios);
    renderTablaUsuarios();
}

function guardarUsuario(evento) {
    evento.preventDefault();
    if (!validarFormularioUsuario()) {
        return;
    }
    const indiceEditar = document.getElementById("indice-usuario").value;
    const region = typeof REGIONES !== "undefined" ? document.getElementById("region-usuario").value : "";
    const comuna = typeof REGIONES !== "undefined" ? document.getElementById("comuna-usuario").value : "";
    const usuario = {
        run: document.getElementById("run-usuario").value.trim(),
        nombre: document.getElementById("nombre-usuario").value.trim(),
        apellidos: document.getElementById("apellidos-usuario").value.trim(),
        correo: document.getElementById("correo-usuario").value.trim(),
        fechaNacimiento: document.getElementById("fecha-nacimiento-usuario").value,
        tipoUsuario: document.getElementById("tipo-usuario").value,
        region: region,
        comuna: comuna,
        direccion: document.getElementById("direccion-usuario").value.trim()
    };
    const usuarios = obtenerUsuarios();
    if (indiceEditar !== "") {
        usuarios[Number(indiceEditar)] = usuario;
    } else {
        usuarios.push(usuario);
    }
    guardarUsuarios(usuarios);
    renderTablaUsuarios();
    limpiarFormularioUsuario();
}

llenarSelectTipoUsuario();
llenarSelectRegion();
llenarSelectComuna();
CAMPOS_USUARIO.forEach(conectarValidacionUsuario);
document.getElementById("form-usuario").addEventListener("submit", guardarUsuario);
document.getElementById("region-usuario").addEventListener("change", llenarSelectComuna);
renderTablaUsuarios();