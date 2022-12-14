const chewyAnim = document.createElement("template");
chewyAnim.innerHTML = `
<div id="chewy" class="chewy">
`;

class ChewyAnim extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(chewyAnim.content.cloneNode(true));

        const style = document.createElement("style");
        style.textContent = `
        .chewy {
            z-index: -1;
            position: fixed;
            width: 150px;
            height: 200px;
            bottom: 0.6%;
            left: 0.5%;
            opacity: 0.6;
            background-image: url(../img/chewy.png);
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
        }
            .chewy:hover {
                filter: contrast(3);
            }
            @media only screen and (max-width: 1024px){
           .chewy{
            height: 130px;
           }
        }
        @media only screen and (max-width: 426px){
            .chewy{
                display: none;
            }
        }
            
        `;

        this.shadowRoot.appendChild(style);
    }
    mode() {
        const mode = document.querySelector("#theme").getAttribute("state");
        const chewy = this.shadowRoot.querySelector(".chewy");
        if (mode === "solid") {
            chewy.style.display = "none";
        } else {
            chewy.style.display = "block";
        }
    }
    connectedCallback() {
        const mode = localStorage.getItem("mode");
        const theme = this.shadowRoot.querySelector(".chewy");
        if (mode !== "star-wars") theme.style.display = "none";

        document.querySelector("#theme").addEventListener("click", () => this.mode());
    }
    disconnectedCallback() {
        document.querySelector("#theme").removeEventListener();
    }
}

window.customElements.define("chewy-anim", ChewyAnim);
