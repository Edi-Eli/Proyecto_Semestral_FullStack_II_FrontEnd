class AdminNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <aside class="admin-sidebar">
            <div class="admin-logo">
                <img src="../assets/imagenes/image.png" alt="Logo">
                <p>Ferreteria Los Maestros</p>
            </div>
            <nav class="admin-menu">
                <ul>
                    <li><a href="admin-home.html">Inicio</a></li>
                    <li><a href="admin-productos.html">Productos</a></li>
                    <li><a href="admin-usuario.html">Usuarios</a></li>
                </ul>
            </nav>
            <a class="admin-volver" href="../index.html">Volver a la tienda</a>
        </aside>
        `;
    }
}

customElements.define("admin-nav", AdminNav);