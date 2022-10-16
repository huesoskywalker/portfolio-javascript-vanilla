const themeTemplate = document.createElement("template");
themeTemplate.innerHTML = `
<div class="theme-btn" id="dark-button">
<div class="theme-icon"></div>
</div>

`;

class ThemeButton extends HTMLElement {
    static get observedAttributes() {
        return ["state"];
    }
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(themeTemplate.content.cloneNode(true));

        const style = document.createElement("style");
        style.textContent = `
        .theme-btn {
            z-index: 1;
            position: fixed;
            display: flex;
            top: 4%;
            left: 2.5%;
            width: 55px;
            height: 55px;
            background-color: var(--color-hover-portfolio);
            border-radius: 50%;
            border: solid 3px var(--color-secondary);
            justify-content: center;
            align-items: center;
            box-shadow: 0 3px 15px rgba(0, 0, 0, 0.3);
        }
        .theme-btn:hover {
                cursor: pointer;
                box-shadow: 1px 4px 15px var(--color-about-life);
                transform: translateY(3px);
        }
            .theme-icon {
                transform: rotateY(180deg);
                background-image:url(./img/deathstar-icon.png);
                background-size: cover;
                background-repeat: no-repeat;
                background-position:center;
                width: 33px;
                height: 33px;
                pointer-events: none;
            }

            @media only screen and (min-width: 2560px){
                .theme-btn {
                    width: 95px;
                    height: 95px;
                    border: solid 4px var(--color-secondary);
                }
                .theme-icon{
                    width: 60px;
                    height: 60px;
                }
            }
            @media only screen and (max-width: 1040px){
                .theme-btn{
                    width: 40px;
                    height: 40px;
                }
                .theme-icon{
                    width: 25.5px;
                    height: 25.5px;
                }
            }
        
        
        `;
        this.shadowRoot.appendChild(style);
    }
    get state() {
        return this.getAttribute("state");
    }
    set state(value) {
        this.setAttribute("state", value);
    }

    toggleDark(e) {
        e.preventDefault();
        if (document.body.classList.contains("dark-mode")) {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("theme", "dark");
            document.querySelector("#theme").setAttribute("state", "star-wars");
        } else {
            document.body.classList.add("dark-mode");
            localStorage.setItem("theme", "light");
            document.querySelector("#theme").setAttribute("state", "solid");
        }
    }

    connectedCallback() {
        this.shadowRoot
            .querySelector("#dark-button")
            .addEventListener("mouseenter", (e) => this.toggleDark(e));
        if (localStorage.getItem("theme") === "light") {
            document.body.classList.add("dark-mode");
        }
    }
    disconnectedCallback() {
        this.shadowRoot.querySelector("#dark-button").removeEventListener();
    }
}

customElements.define("theme-button", ThemeButton);
