const wishesTemplate = document.createElement("template")
wishesTemplate.innerHTML = `
<div class="wishes-wrapper">
<div id="stampy" class="wishes"></div>
</div>
`

class GalaxyWishes extends HTMLElement {
    static get observedAttributes() {
        return ["state"]
    }
    constructor() {
        super()

        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(wishesTemplate.content.cloneNode(true))

        const style = document.createElement("style")
        style.textContent = `
        .wishes-wrapper {
            display: none;
            align-items: center;
            justify-content: center;
            z-index: -3;
        }
            .wishes {
                position: fixed;
                font-size: 3.3rem;
                color: rgb(255,255,0);
                justify-items: center;
            }
        
                @keyframes bestIntroEver {
                    0% {
                        top: 150%;
                        left: 50%;
                        transform: translate(-50%, -50%) scale(3) rotateX(45deg);
                        opacity: 0.6;
                    }
                    20% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.8;
                    }
                    70% {
                        top: 40%;
                        left: 50%;
                        transform: translate(-50%, -50%) scale(0.1) rotateX(60deg);
                        opacity: 0;
                    }
                    100%{
                        top: 40%;
                        left: 50%;
                        opacity: 0;
                        display:none;
                    }
                }
                @media only screen and (min-width: 2560px){
                    .wishes{
                        font-size: 6rem;
                    }
                }
                @media only screen and (max-width: 1024px){
                    .wishes{
                        font-size: 2.6rem;
                    }
                }
                @media only screen and (max-width: 768px){
                    @keyframes bestIntroEver {
                        0% {
                            top: 180%;
                            left: 50%;
                            transform: translate(-50%, -50%) scale(3) rotateX(45deg);
                            opacity: 0.6;
                        }
                        20% {
                            opacity: 1;
                        }
                        50% {
                            opacity: 0.8;
                        }
                        70% {
                            top: 40%;
                            left: 50%;
                            transform: translate(-50%, -50%) scale(0.1) rotateX(60deg);
                            opacity: 0;
                        }
                        100%{
                            top: 40%;
                            left: 50%;
                            opacity: 0;
                            display:none;
                        }
                    }
                }
                @media only screen and (max-width: 426px){
                    @keyframes bestIntroEver {
                        0% {
                            top: 210%;
                            left: 50%;
                            transform: translate(-50%, -50%) scale(3) rotateX(45deg);
                            opacity: 0.6;
                        }
                        20% {
                            opacity: 1;
                        }
                        50% {
                            opacity: 0.8;
                        }
                        70% {
                            top: 40%;
                            left: 50%;
                            transform: translate(-50%, -50%) scale(0.1) rotateX(60deg);
                            opacity: 0;
                        }
                        100%{
                            top: 40%;
                            left: 50%;
                            opacity: 0;
                            display:none;
                        }
                    }
                }
                
        `

        this.shadowRoot.appendChild(style)
    }
    get state() {
        return this.getAttribute("state")
    }
    set state(value) {
        this.setAttribute("state", value)
    }

    attributeChangedCallback(prop, oldVal, newVal) {
        if (this.state === "mtfbwy") {
            this.thanksFolk()
        }
    }

    thanksFolk() {
        const storageSkills = []
        const georgeLucas = this.shadowRoot.querySelector("#stampy")
        const wishesWrapper = this.shadowRoot.querySelector(".wishes-wrapper")

        if (wishesWrapper) {
            georgeLucas.style.animation = "bestIntroEver 15s ease-out forwards"

            this.shadowRoot.querySelector(".wishes-wrapper").style.display = "flex"

            if (localStorage.getItem("divs")) {
                const json = JSON.parse(localStorage.getItem("divs"))
                json.forEach((wish) => {
                    storageSkills.push(wish)
                })

                this.shadowRoot.querySelector("#stampy").innerHTML = `
             ${storageSkills
                 .map(({ _wish }) => {
                     return `
            
                    <div>
                        ${_wish}
                    </div>
                        `
                 })
                 .join(" ")}
                             `
            }

            setTimeout(() => {
                wishesWrapper.parentNode.removeChild(wishesWrapper)
            }, 20500)
        }
    }
}

customElements.define("wishes-sender", GalaxyWishes)
