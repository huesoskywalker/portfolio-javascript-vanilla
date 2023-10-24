const yodaAnim = document.createElement("template")
yodaAnim.innerHTML = `
            <div id="yoda" class="yoda"></div>
`

class YodaAnim extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(yodaAnim.content.cloneNode(true))

        const style = document.createElement("style")
        style.textContent = `
            .yoda {
                z-index: 0;
                width: 133px;
                height: 133px;
                position: fixed;
                top: 18.5%;
                right: 35%;
                background-image: url(../img/yoda.webp);
                background-size: contain;
                background-position: center;
                background-repeat: no-repeat;
                opacity: 0.4;
            } 
                
                .yoda:hover {
                    cursor: grabbing;
                }
                    .yoda:hover::before {
                        content: "";
                        position: absolute;
                        right: 36px;
                        top: -43px;
                        width: 4.5px;
                        height: 90px;
                        border-radius: 10px;
                        background-color: rgb(0, 0, 0);
                        background-image: linear-gradient(
                            rgba(255, 255, 255, 0.6),
                            rgb(0, 255, 0)
                        );
                        box-shadow: 0px -11px 10px 1px rgba(0, 255, 0);
                        filter: brightness(350%);
                    }

                    .yoda:hover::after {
                        content: "";
                        position: absolute;
                        right: 36px;
                        top: 28px;
                        width: 4.5px;
                        height: 20px;
                        border-radius: 10px;
                        background-color: rgba(0, 0, 0, 0.33);
                        background-image: linear-gradient(
                            rgb(128, 128, 128),
                            rgb(0, 0, 0)
                        );
                        filter: contrast(250%);
                    }
               
            @media screen and (min-width: 2560px) {
                .yoda {
                    top: 29.5%;
                    right: 40%;
                } 
            }

            @media screen and (max-width: 1024px){
                .yoda {
                    height: 80px;
                    width: 80px;
                    top: 13%;
                    right: 33%;
                } 
                .yoda:hover::before {
                    right: 20px;
                    top: -43px;
                    height: 70px;
                }

                .yoda:hover::after {
                    right: 20px;
                    top: 15px;
                }
            }
            @media only screen and (max-width: 426px){
                .yoda{
                    display: none;
                }
            }
            
        `
        this.shadowRoot.appendChild(style)
    }
    mode() {
        const mode = document.querySelector("#theme").getAttribute("state")
        const yoda = this.shadowRoot.querySelector(".yoda")
        if (mode === "solid") {
            yoda.style.display = "none"
        } else {
            yoda.style.display = "block"
        }
    }
    connectedCallback() {
        // const mode = localStorage.getItem("mode");
        // const theme = this.shadowRoot.querySelector(".yoda");
        // if (mode !== "star-wars") theme.style.display = "none";
        // document.querySelector("#theme").addEventListener("click", () => this.mode());
    }
    disconnectedCallback() {
        document.querySelector("#theme").removeEventListener()
    }
}

window.customElements.define("yoda-anim", YodaAnim)
