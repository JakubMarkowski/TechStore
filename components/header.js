class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <header>
        <nav>
            <div class="navbarTop">
                <div class="navbar-item">
                    <a href="./redirect/index.html">
                        <h1>Strona główna</h1>
                    </a>
                </div>
                <div class="navbar-item">
                    <div class="search">
                        <input type="text" class="searchInput" placeholder="Search">
                        <img src="./img/search.png" width="20px" height="20px" alt="" class="searchIcon">
                    </div>
                </div>
            </div>
            <div class="navbarBottom">
                <div class="left-side">
                    <div class="menu-item dropdown">
                        <span style="padding: 5px 10px"><h3>Produkty</h3></span>
                        <div class="dropdown-content">
                            <a href="./redirect/mb.html">
                                <h4>Płyty Główne</h4>
                            </a>
                            <a href="./redirect/cpu.html">
                                <h4>Procesory</h4>
                            </a>
                            <a href="./redirect/gpu.html">
                                <h4>Karty Graficzne</h4>
                            </a>
                            <a href="./redirect/ram.html">
                                <h4>Pamięć RAM</h4>
                            </a>
                            <a href="./redirect/storage.html">
                                <h4>Dyski Twarde</h4>
                            </a>
                            <a href="./redirect/psu.html">
                                <h4>Zasilacze</h4>
                            </a>
                            <a href="redirect/case.html">
                                <h4>Obudowy</h4>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="right-side">
                    <a href="./basket.html" class="menu-item">
                        <h3>Koszyk</h3>
                    </a>
                    <a class="menu-item" href="./redirect/register.html">
                        <h3>Zarejestruj</h3>
                    </a>
                    <a class="menu-item" href="./redirect/login.html">
                        <h3>Zaloguj</h3>
                    </a>
                </div>


            </div>
        </nav>
    </header>`;
    }
}
customElements.define('header-component', Header)