const falconAnim = document.createElement("template");
falconAnim.innerHTML = `
<img
                    src="./img/milennium-falcon.webp"
                    class="falcon"
                    id="falcon"
                />
`;

class FalconAnim extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(falconAnim.content.cloneNode(true));

        const style = document.createElement("style");
        style.textContent = `
    .falcon {
        z-index: 0;
        width: 11%;
        transform: rotateY(180deg);
        position: relative;
        animation-name: milennium;
        animation-duration: 9s;
        animation-iteration-count: forwards;
        transition: ease-out;
        visibility: visible;
        opacity: 0;
    }
        @keyframes milennium {
            0% {
                left: -50%;
            }
            90% {
                box-shadow: 0px 0px 0px -33px rgb(0, 255, 0);
            }
            95% {
                left: 23%;
                opacity: inherit;
                box-shadow: 110px 0px 22px -22px rgb(0, 255, 0);
            }
            100% {
                opacity: 0.6%;
                left: 103%;
            }
        }
     
        @media only screen and (min-width: 2560px){
            .falcon {
                width: 12.2%;
            }
            @keyframes milennium {
                0% {
                    left: -50%;
                }
                90% {
                    box-shadow: 0px 0px 0px -33px rgb(0, 255, 0);
                }
                95% {
                    left: 20%;
                    opacity: inherit;
                    box-shadow: 110px 0px 22px -22px rgb(0, 255, 0);
                }
                100% {
                    opacity: 0.6%;
                    left: 103%;
                }
            }
        }
        @media only screen and (max-width: 1024px){
            .falcon {
                width: 9%;
            }
            @keyframes milennium {
                0% {
                    left: -50%;
                }
                90% {
                    box-shadow: 0px 0px 0px -33px rgb(0, 255, 0);
                }
                95% {
                    left: 28%;
                    opacity: inherit;
                    box-shadow: 110px 0px 22px -22px rgb(0, 255, 0);
                }
                100% {
                    opacity: 0.6%;
                    left: 95%;
                }
            }
        }
        @media only screen and (max-width: 426px){
            .falcon{
               display: none;
            }
        }
    `;
        this.shadowRoot.appendChild(style);
    }
    mode() {
        const mode = document.querySelector("#theme").getAttribute("state");
        const falcon = this.shadowRoot.querySelector(".falcon");
        if (mode === "solid") {
            falcon.style.display = "none";
        } else {
            falcon.style.display = "block";
        }
    }
    connectedCallback() {
        const mode = localStorage.getItem("mode");
        const theme = this.shadowRoot.querySelector(".falcon");
        if (mode !== "star-wars") theme.style.display = "none";

        document.querySelector("#theme").addEventListener("click", () => this.mode());
    }
    disconnectedCallback() {
        document.querySelector("#theme").removeEventListener();
    }
}
window.customElements.define("falcon-anim", FalconAnim);
