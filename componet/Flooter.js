class Flooter extends HTMLElement {

    connectedCallback() {
        this.innerHTML = `
        <footer>
            <div class="footer-col">
                <h4>Ferreteria Los Maestros</h4>
                <p>Tu ferretería de confianza para todos tus proyectos.</p>
            </div>

            <div class="footer-col">
                <h4>Enlaces</h4>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="productos.html">Productos</a></li>
                    <li><a href="nosotros.html">Nosotros</a></li>
                    <li><a href="contacto.html">Contacto</a></li>
                </ul>
            </div>

            <div class="footer-col">
                <h4>Contacto</h4>
                <p>Email: contacto@losmaestros.cl</p>
                <p>Teléfono: +56 9 1234 5678</p>
            </div>

            <div class="footer-bottom">
                &copy; 2026 Ferreteria Los Maestros. Todos los derechos reservados.
            </div>

        </footer>
        `
    }

}

customElements.define('flo-to', Flooter)