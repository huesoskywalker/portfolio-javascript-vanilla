const portfolioTemplate = document.createElement("template")
portfolioTemplate.innerHTML = `
<div class="portfolio-title">
<h2>Wor
<slot name="working"></slot>
</h2>
</div>
<span class="bg-text">portfolio</span>
`

class PortfolioTittle extends HTMLElement {
    constructor(txtElement, words, wait = 3000) {
        super()

        this.txtElement = txtElement
        this.words = words
        this.txt = ""
        this.wordIndex = 0
        this.wait = parseInt(wait, 10)
        this.isDeleting = false
        if (this.words) {
            this.type()
        }

        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(portfolioTemplate.content.cloneNode(true))

        const style = document.createElement("style")
        style.textContent = `
        .bg-text {
            z-index: -1;
            position: absolute;
            justify-content: center;
            display: flex;
            margin-top: 10px;
            top: 0%;
            left: 50%;
            color: var(--color-bg-text);
            font-weight: 500;
            font-size: 8.5rem;
            text-transform: uppercase;
            transform: translateX(-50%);
        }
        .portfolio-title {
            z-index: 1;
            display:flex;
            justify-content:center;
            margin-bottom: 100px;
        }
            h2 {
                position: fixed;
                top: 0%;
                left: 37.85%;
                text-transform: uppercase;
                font-size: 4rem;
                font-weight: 50;
                color: var(--color-contact);
            }
                ::slotted(span) {                    
                    color: var(--color-secondary);
                }

            @media only screen and (min-width: 2560px){
                .bg-text {
                    font-size: 10.5rem;
                }
                h2 {
                    font-size: 6rem;
                    left: 41%;
                    top: -1%;
                }
            }
            @media only screen and (max-width: 1024px){
                .bg-text {
                    font-size: 7rem;
                }
                h2 {
                    left: 35%;
                    top: -1%;
                }
            }
            @media only screen and (max-width: 768px){
                .bg-text{
                    font-size: 5rem;
                }
                h2{
                    font-size: 3rem;
                    left: 35%;
                    top: -0.5%;
                }
            }
            @media only screen and (max-width: 426px){
                .bg-text{
                    top: 0.5%;
                    font-size: 2.4rem;
                }
                h2{
                    font-size: 1.6rem;
                    top: 0%;
                }
            }
        `
        this.shadowRoot.appendChild(style)
    }

    type() {
        const current = this.wordIndex % this.words.length
        const fullTxt = this.words[current]
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1)
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1)
        }
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

        let typeSpeed = 300

        if (this.isDeleting) {
            typeSpeed /= 2
        }
        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait
            this.isDeleting = true
        } else if (this.isDeleting && this.txt === "") {
            this.isDeleting = false
            typeSpeed = 500
        }
        setTimeout(() => this.type(), typeSpeed)
    }
    init() {
        const txtElement = document.querySelector(".txt-type")
        const words = JSON.parse(txtElement.getAttribute("data-words"))
        const wait = txtElement.getAttribute("data-wait")
        new PortfolioTittle(txtElement, words, wait)
    }

    connectedCallback() {
        this.shadowRoot.addEventListener("DOMContentLoaded", this.init())
    }
    disconnectedCallback() {
        this.shadowRoot.removeEventListener()
    }
}

customElements.define("portfolio-tittle", PortfolioTittle)
