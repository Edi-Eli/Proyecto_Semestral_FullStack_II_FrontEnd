class HeaderCus extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header>
            <div>
                <img id="imagen-logo" src = "assets/imagenes/image.png" alt = "Logo"> 
            </div>
            <nav class = "nav-menu1">
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="productos.html">Productos</a></li>
                    <li><a href="nosotros.html">Nosotros</a></li>
                    <li><a href="blogs.html">Blogs</a></li>
                    <li><a href="nosotros.html">Contacto</a></li>
                </ul>
            </nav>

            <nav class="nav-menu2">
                <ul>
                    <li><a href="inicio-sesion.html">Iniciar Sesion</a></li>
                    <li><a href="registrar-usuario.html">Registrase</a></li>
                    <a href="carrito.html">
                        <img src="https://images.sodimac.com/v3/assets/blt6a203fe6c6a9b6dd/blt8fd0d12178576eae/662021e0ad926eb02da4aa9c/Union.svg"
                        alt="cart-icon" class="img-car">
                    </a>
                </ul>
            </nav>
        </header>
        `
    }

}

customElements.define('nav-no', HeaderCus)
