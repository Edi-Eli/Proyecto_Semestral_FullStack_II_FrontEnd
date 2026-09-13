function requerido(valor) {
    return valor !== undefined && valor !== null && String(valor).trim() !== "";
}

function maxCaracteres(valor, max) {
    if (valor === undefined || valor === null) return true;
    return String(valor).trim().length <= max;
}

function esCorreoValido(correo) {
    if (!requerido(correo)) return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(correo.trim())) return false;
    const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
    return dominiosPermitidos.some(dominio => correo.trim().toLowerCase().endsWith(dominio));
}

function validarRun(run) {
    if (!requerido(run)) return false;

    // Sin puntos ni guiones, todo en mayúsculas
    run = String(run).trim().toUpperCase().replace(/[.\-]/g, "");

    // Mínimo 7, máximo 9 caracteres (7 u 8 dígitos + dígito verificador)
    if (run.length < 7 || run.length > 9) return false;
    if (!/^\d{7,8}[0-9K]$/.test(run)) return false;

    // Cálculo del dígito verificador (módulo 11)
    const cuerpo = run.slice(0, -1);
    const dvIngresado = run.slice(-1);

    let suma = 0;
    let multiplicador = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const resto = suma % 11;
    const dvCalculado = 11 - resto;

    let dvEsperado;
    if (dvCalculado === 11) dvEsperado = "0";
    else if (dvCalculado === 10) dvEsperado = "K";
    else dvEsperado = String(dvCalculado);

    return dvIngresado === dvEsperado;
}

function validarRango(valor, min, max) {
    if (valor === "" || valor === null || valor === undefined) return false;
    const numero = Number(valor);
    if (isNaN(numero)) return false;
    return numero >= min && numero <= max;
}

function agregarError(inputId, mensaje) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.classList.add("input-invalid");
    input.classList.remove("input-valid");

    const contenedor = input.closest(".form-group") || input.parentElement;
    const spanError = contenedor.querySelector(".error-msg");
    if (spanError) spanError.textContent = mensaje;
}

function limpiarError(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.classList.remove("input-invalid");
    input.classList.add("input-valid");

    const contenedor = input.closest(".form-group") || input.parentElement;
    const spanError = contenedor.querySelector(".error-msg");
    if (spanError) spanError.textContent = "";
}