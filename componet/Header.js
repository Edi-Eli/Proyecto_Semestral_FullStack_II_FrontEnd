class HeaderCus extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header>
        <div>
            <img id="imagen-logo" src = "assets/imagenes/image.png" alt = "Logo"> 
        </div>
            <nav>
                <ul id="nav-list">
                    <li><a class="menu" href="index.html">Home</a></li>
                    <li><a class="menu" href="productos.html">Productos</a></li>
                    <li><a class="menu" href="nosotros.html">Nosotros</a></li>
                    <li><a class="menu" href="blogs.html">Blogs</a></li>
                    <li><a class="menu" href="nosotros.html">Contacto</a></li>
                </ul>
            </nav>
        </header>
        `
    }
}

customElements.define('nav-no', HeaderCus)